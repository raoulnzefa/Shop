import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
// import orders from './modules/orders'
import wishlist from './modules/wishlist'
import products from './modules/products'
import location from './modules/location'
// import brands from './modules/brands'
// import loading from './modules/loading'

const store = createStore({
  state: {
  },
  mutations:{
    INIT_STORE(state) {
      if(localStorage.getItem('store') !== null) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  },
  actions: {
  },
  modules:{
    products,
    cart,
    user,
    // brands,
    // orders,
    wishlist,
    location,
    // loading,
  },
})

store.subscribe((mutation,state) => {
  // console.log(mutation.type)
  console.log(mutation)
  localStorage.setItem('store', JSON.stringify(state));
})

export default store