export default {
    namespaced: true,
    state: {
        all: [], //all products
        brands:[],
        models:[],
        types:[],
        categories:[],
    },
    mutations: {
        SET_PRODUCTS(state, products){
            state.all = products
        },
        SET_CATEGORIES(state, data){
            state.categories = data
        },
        SET_BRANDS(state, brands){
            state.brands = brands
        },
        SET_MODELS(state, data){
            state.models = data
        },
        SET_TYPES(state, data){
            state.types = data
        },
    },
    actions: {
        setProducts({ commit }){
            window.$http.get(`${window.$wc}products`).then(({data}) => {
                commit('SET_PRODUCTS', data)
            }).catch(error => {
                throw new Error(error)
            })
        },

        // setTypes({ commit }){
        //     window.$http.get(`${window.$wp}vehicle-types`).then(({data}) => {
        //         commit('SET_TYPES', data)
        //     }).catch(error => {
        //         throw new Error(error)
        //     })
        // },

        setBrands({ commit }){
            window.$http.get(`${window.$wp}brands`).then(({data}) => {
                commit('SET_BRANDS', data)
            }).catch(error => {
                throw new Error(error)
            })
        },

        // setModels({ commit }){
        //     const data = [
        //         {id:1, brand_id: 1, name:'Camry', slug: 'camry'},
        //         {id:2, brand_id: 1, name:'Corolla', slug: 'corolla'},
        //         {id:3, brand_id: 1, name:'Avensis', slug: 'avensis'},
        //         {id:4, brand_id: 1, name:'Hondarlin', slug: 'Accord'},
        //         {id:5, brand_id: 5, name:'Benz', slug: 'benz'},
        //         {id:6, brand_id: 6, name:'Julia', slug: 'julia'}
        //     ]
        //     commit('SET_MODELS', data)
        //     // window.$http.get(`models`).then(({data}) => {
        //     //     commit('SET_MODELS', data)
        //     // }).catch(error => {
        //     //     throw new Error(error)
        //     // })
        // },

        setCategories({ commit }){
            window.$http.get(`${window.$wc}products/categories`).then(({data}) => {
                data.sort((a, b) => a.menu_order - b.menu_order)
                commit('SET_CATEGORIES', data)
                // console.log(data)
            }).catch(error => {
                console.log(error.toString())
            })
        }
    },
    getters: {
        getParentCategories: state => state.categories.filter(category => category.parent == 0 && category.count > 0),
        getBrandsBySearch: state => search => {
            return state.brands.filter(brand => 
                brand.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        },
        getParentBrands: state => {
            return state.brands.filter(brand => brand.parent == 0)
        },
        getModelsByBrandId: (state) => (id) => {
            return state.brands.filter(model=> model.parent === id)
        }
    }
}
