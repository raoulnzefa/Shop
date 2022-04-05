export default {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
        SET_ORDERS(state, data){
            state.orders = data
        },
    },
    actions: {
        setOrders({ commit, rootGetters }){
            const user = rootGetters['user/getUser'].ID
            return new Promise((resolve, reject) => { 
                window.$http.get(`${window.$wc}orders?customer=${user}`).then(({data}) => {
                    //I'm trying to differentiate error and real data from server
                    //json object is real data, array is error 
                    // if(Array.isArray(data)){
                    //     resolve(data)
                    // }else{
                        commit('SET_ORDERS', data)
                        resolve(data)
                    // }       
                }).catch(error => {
                    reject(error)
                })
            })
        },

    },
    getters: {
        getOrders: state => state.orders,
        getOrderById: (state, getters) => id => {
            return getters.getUserOrders.find(order => order.id === id)
        }
    }
}
