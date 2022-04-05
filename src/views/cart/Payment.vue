<template>
    <div>
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Order summary</span>
            <span class="badge badge-warning badge-pill">{{ $store.getters['cart/cartQuantity'] }} items</span>
        </h4>
        <ul class="list-group mb-3">
            <li v-for="(cartItem, index) in cart" :key="index" 
            class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">{{ cartItem.name }} <span class="font-weight-bold"> x {{cartItem.quantity}}</span></h6>
                    <!-- <small class="text-muted">Qty: {{cartItem.quantity}}</small> -->
                </div>
                <span class="text-muted"><span v-html="$currency"></span>{{ cartItem.subTotal }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total (NGN)</span>
                <strong><span v-html="$currency"></span>{{ total }}</strong>
            </li>
        </ul>

        <paystack class="btn btn-success btn-lg btn-block round mt-2"
            :amount="$store.getters['cart/cartTotalPrice'] * 100"
            :email="$store.getters['user/getUser'].user_email"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false">
            <i class="fas fa-money-bill-alt"></i>
                Make Payment
        </paystack>  
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import paystack from '@/components/Paystack.vue'
export default {
    name: 'Checkout',
    data(){
        return{
            paystackkey: process.env.VUE_APP_PAYSTACK_PUB_KEY,
        }
    },
    methods:{
        callback(response){
            const user_id = this.$store.getters['user/getUser'].ID
            let line_items = this.$store.getters['cart/cartProducts'].map(item => {
                return {
                    product_id: item.id,
                    variation_id: item.variation_id,
                    quantity: item.quantity
                }
            })
            const data = { 
                customer_id: user_id, 
                line_items: [...line_items],
                billing: JSON.parse(localStorage.getItem('billing')),
            }
            window.$http.post(`${window.$wc}orders`, data).then(({ data }) => {
                console.log(data)
            }).catch(error => {
                console.log(error.toString())
            })
            console.log(response)
            this.$store.commit('cart/DELETE_CART')
            this.$router.replace({ name: 'home' })
        },
        close(){
            console.log("Payment closed")
        },
    },

    computed:{
        ...mapGetters('cart', {
            cart: 'cartProducts',
            total: 'cartTotalPrice'
        }),
        ...mapGetters('user', {
            user: 'getUser'
        }),
        reference(){
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
            for( let i=0; i < 10; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
 
            return text;
        },
        currentTabComponent() {
            return this.currentTab.toLowerCase()
        }
    },
    components:{
        paystack
    }
}
</script>