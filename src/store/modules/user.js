export default {
    namespaced: true,
    state: {
        data    : null,
        status  : false,
        auth_via: ''
    },
    mutations: {
        SET_USER(state, data){
            state.data = data
            state.status = true
            state.auth_via = 'me'
        },
        FB_SET_USER(state, data){
            state.data = data
            state.status = true
            state.auth_via = 'facebook'
        },

        GO_SET_USER(state, data){ 
            state.data = data
            state.status = true
            state.auth_via = 'google'
        },
        UNSET_USER(state){
            state.data = ''
            state.status = false,
            state.auth_via= ''
        }
    },
    actions: {
        unsetUser({commit}){
            commit('UNSET_USER')
        }
    },
    getters: {
        getUser: state  => state.data,
        isLoggedIn: state => state.status,
        isAuthVia: state => state.auth_via
    }
}
