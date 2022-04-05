export default {
    namespaced: true,
    state: {
        lgas: [], 
        states:[]
    },
    mutations: {
        SET_LGAS(state, data){
            state.lgas = data
        },
        SET_STATES(state, data){
            state.states = data
        },
    },
    actions: {
        setLGAS({ commit }){
            window.$http.get(`elektro/v1/lgas`).then(({data}) => {
                commit('SET_LGAS', data)
            }).catch(error => {
                throw new Error(error)
            })
        },

        setStates({ commit }){
            window.$http.get(`elektro/v1/states`).then(({data}) => {
                commit('SET_STATES', data)
            }).catch(error => {
                throw new Error(error)
            })
        },
    },

    getters: {
        getLGAByStateId: (state) => (id) => {
          return state.lgas.filter(lga=> lga.state_id === id)
        },
        getCity: (state) => (id) => {
            return state.lgas.find(lga => lga.id === id)
        },
        getState: (state) => (id) => {
            return state.states.find(state => state.id === id)
        }
    }
}
