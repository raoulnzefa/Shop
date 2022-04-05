export default {
    namespaced: true,

    state: {
        items:[]
    },
  
    mutations: {
        ADD_ITEM(state, item){
            item['quantity'] = 1

            state.items.push(item)
        },

        INCREMENT_ITEM_QUANTITY(state, item){
            let cartItem
            if('variation_id' in item)
                cartItem = state.items.find(cartItem => cartItem.variation_id === item.variation_id)
            else 
                cartItem = state.items.find(cartItem => cartItem.id === item.id)
            cartItem.quantity++            
        },

        DECREMENT_ITEM_QUANTITY(state, cItem){
            let cartItem;

            if('variation_id' in cItem){
                cartItem = state.items.find(item => item.variation_id === cItem.variation_id)
            } else { 
                cartItem = state.items.find(item => item.id === cItem.id)
            }
            cartItem.quantity--
            if(cartItem.quantity < 1){
                cartItem.quantity = 1
            }
        },

        DELETE_ITEM(state, cItem){
            let cartItemIndex;
            if('variation_id' in cItem){
                cartItemIndex = state.items.findIndex(item => item.variation_id === cItem.variation_id)
            } else { 
                cartItemIndex = state.items.findIndex(item => item.id === cItem.id)
            }
            state.items.splice(cartItemIndex, 1)
        },

        DELETE_CART(state){
            state.items = []
        },

        UPDATE_CART(state, data){
            state.items.forEach((item, index) => {
                if(data[index].value < 1){ //value is form value
                    state.items.splice(index, 1)
                }
                item.quantity = Number(data[index].value)
            })
        },
    },

    actions: {
        addItem({ state, commit }, item){
            let cartItem
            if('variation_id' in item)
                cartItem = state.items.find(cartItem => cartItem.variation_id === item.variation_id)
            else 
                cartItem = state.items.find(cartItem => cartItem.id === item.id)

            if(!cartItem)
                commit('ADD_ITEM', item)
            else
                commit('INCREMENT_ITEM_QUANTITY', cartItem)
        },
    },

    getters: {
        inCart: state => ({id}) => {
            return state.items.find(item => item.id === id)
        },
        
        cartProducts: state => {
            state.items.forEach(item => {
                item['subTotal'] = Number(item.quantity) * Number(item.price).toFixed(2)
            })
            return state.items
        },

        cartQuantity: (state, getters) => {
            return getters.cartProducts.reduce((quantity, product) => {
                return quantity + Number(product.quantity)
            }, 0)
        },
        
        cartTotalPrice: (state, getters) => {
            return getters.cartProducts.reduce((total, product) => {
                return total + Number(product.subTotal)
            }, 0)
        }
    }
}
