<template>

    <div class="m-auto mb-20 shadow">
            <h1 class="text-center my-5 mx-3 
                sm:mx-0 py-5 uppercase border-b border-gray">Check out</h1>

            <div class="p-3 mt-8 mx-3 sm:mx-0">
            
                <h4 class="flex justify-between uppercase items-center my-2">
                    <span class="text-muted">Order summary</span>
                    <span class="bg-yellow-400 p-2 rounded py-1">{{ $store.getters['cart/cartQuantity'] }} items</span>
                </h4>
                <ul class="mx-auto mb-5">
                    <li v-for="(cartItem, index) in cart" :key="index" 
                    class="flex justify-between">
                        <div>
                            <h6 class="my-0">{{ cartItem.name }} <span class="font-weight-bold"> x {{cartItem.quantity}}</span></h6>
                            <!-- <small class="text-muted">Qty: {{cartItem.quantity}}</small> -->
                        </div>
                        <span class="text-muted"><span v-html="$currency "></span>{{ cartItem.subTotal }}</span>
                    </li>
                    <li class="flex justify-between mt-3 py-2 border-b border-t border-gray-400">
                        <span>Total (NGN)</span>
                        <strong><span v-html="$currency "></span>{{ total }}</strong>
                    </li>
                </ul>

                <paystack 
                class="bg-green-500 text-white w-full rounded py-2 mt-2"
                    :amount="Math.ceil($store.getters['cart/cartTotalPrice']) * 100"
                    :email="$store.getters['user/getUser'].user_email"
                    :paystackkey="paystackkey"
                    :reference="reference"
                    :callback="callback" :close="close"
                    :embed="false" id="payment"
                    >
                    <i class="fas fa-money-bill-alt"></i>
                        Make Payment
                </paystack>
            </div>   
       
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
    mounted(){
        setTimeout(() => {
            document.getElementById('payment').click()
        }, 3000)
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
            const billing = JSON.parse(localStorage.getItem('billing'))
            const area = localStorage.getItem('area')
            const data = { 
                customer_id: user_id, 
                line_items: [...line_items],
                billing: billing,
                meta_data:[
                    {
                        key: 'area',
                        value: area
                    }
                ]
            }
            console.log(billing)
            window.$http.post(`${window.$wc}orders`, data).then(({data}) => {
                console.log(data)
            }).then(() => {
                console.log(response)
                this.$store.commit('cart/DELETE_CART')
                localStorage.removeItem('billing')
                localStorage.removeItem('area')
                this.$router.replace({ name: 'home' })
            }).catch(error => {
                console.log(error.toString())
            })
            
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
    },
    components:{
        paystack,
    }
}
</script>