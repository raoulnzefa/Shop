<template>
    <div>
        <div  style="max-width:850px; margin: auto" class="my-5 container-fluid">
            <!-- <h2 style="border-width: 2px !important" 
            class="border-bottom border-warning mb-3 pb-3 text-center">Checkout</h2> -->
            <div v-if="$store.getters['cart/cartProducts'].length">
                <ul class="d-flex mt-3 p-2 bg-succes text-secondary 
                        justify-content-between text-uppercase 
                        font-weight-bold border list-unstyled rounded">
                    <li v-for="(tab, index) in tabs" class="text-center"
                        :key="index" :id="tab" :ref="tab">
                        <span :class="['border border-secondary', { active: currentTab === tab }]"
                            class="d-block mx-auto text-center d-flex 
                            justify-content-center
                            align-items-center"
                            style="width:35px;height:35px;border-radius:50%">
                            <span :id="tab+'-text'">{{ index+1 }}</span>
                        </span>
                        <span style="font-size:12px;font-weight:bold" 
                        class="text-secondary d-block mx-auto">{{ tab }}</span>
                        <!-- <img v-if="checked" :src="`${$publicPath}img/checked.png`"/> -->
                    </li>
                </ul>
                <component class="tab mb-2" :is="currentTabComponent"></component>
            </div>
            <p v-else class="bg-warning rounded py-2 text-white text-center">
                No item to checkout <router-link class=" text-decoration-none text-dark" :to="{ name : 'home'}"> continue shopping</router-link>
            </p>
        </div>         
    </div>
</template>

<script>
    import cart from './Cart.vue'
    import delivery from './Delivery.vue'
    import payment from './Payment.vue'
    export default {
        name: 'Checkout',
        data(){
            return{
                currentTab: 'cart',
                checked:false,
                tabs:['cart', 'delivery', 'payment'],
            }
        },

        methods:{
            tabIndicator(tab){
                document.getElementById(tab+'-text').innerHTML = ''
                document.getElementById(tab+'-text').classList.remove('bg-light','text-success')
                document.getElementById(tab+'-text').classList.add('fas', 'fa-check')
                document.getElementById(tab+'-text').classList.add('checkedout')
            }
        },

        mounted(){
            document.title = `Checkout | ${this.$appName}`             
            
            this.$eBus.on('checkout', (payload) => {
                switch(payload){
                    case 'delivery':
                        this.currentTab = 'delivery'
                        this.tabIndicator('cart')
                        window.scrollTo(0,0)
                        break

                    case 'payment':
                        this.currentTab = 'payment'
                        this.tabIndicator('delivery')
                        window.scrollTo(0,0)
                        break

                    default:
                        this.currentTab = 'cart' 
                }
            })
        },

        computed:{
            currentTabComponent() {
                return this.currentTab.toLowerCase()
            }
        },
      
        components:{
            cart, delivery, payment
        }
    }
</script>

<style scoped>
    .active{
        background-color: #ffc107 !important;
        color: #000 !important;
    }
    .checkedout{
        /* color: #0062bd !important; */
        color: #6c757d !important;
        /* width: 15px !important; */
        /* padding-right:  0.2rem !important;
        padding-left: 0.2rem !important; */
        /* padding-top: .8rem; */
        /* background-color: #28a745 !important; */
        /* color: #ffffff !important; */
    }
</style>
