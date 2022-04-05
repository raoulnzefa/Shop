export default {
    namespaced: true,
    state: {
        items:[],
        views:[]
    },
    mutations: {
        ADD_ITEM(state, item){
            state.items.push(item)
        },

        ADD_VIEWED_ITEM(state, item){
            state.views.push(item)
        },

        DELETE_ITEM(state, { id }){
            const listItemIndex = state.items.find(item => item.id === id)
            state.items.splice(listItemIndex, 1)
        },

        DELETE_LIST(state){
            state.items = []
        },
    },

    actions: {
        addItem({ state, commit },  item ){
            const listItem = state.items.find(lItem => lItem.id === item.id)
            if(!listItem){
                commit('ADD_ITEM', item)
            }
            // console.log(item)
        },

        addViewedItem({ state, commit },  item ){
            const listItem = state.views.find(lItem => lItem.id === item.id)
            if(!listItem){
                commit('ADD_VIEWED_ITEM', item)
            }
            console.log(item)
        }
    },

    getters: {
        listProducts: state => state.items,
        viewProducts: state => state.views 
    }
}
