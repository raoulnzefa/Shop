export default {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        START_LOADING(state){
            state.loading = true
        },
        FINISH_LOADING(state){
            state.loading = false
        },
    },
   
    getters: {
        isLoading: state => state.loading   
    }
}
