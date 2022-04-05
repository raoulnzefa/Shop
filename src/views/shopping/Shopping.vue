<template>
    <main style="max-width:650px" class="w-full px-2 py-2 m-auto">
        <div v-if="$store.getters['cart/cartProducts'].length">

        <ul  style="background-image: linear-gradient(to bottom,#e8e8e8 0%, #f4f3f3 100%);" 
        class="flex p-2 text-white justify-between uppercase font-bold shadow rounded-tr rounded-tl">
            <li v-for="(tab, index) in tabs" class="text-center" 
                :key="index" :id="tab" :ref="tab">
                <span :class="['border border-gray-500', { active: currentTab === tab }]"
                    class="block mx-auto text-center flex justify-center items-center"
                    style="width:35px;height:35px;border-width:3px;border-radius:50%">
                <span :id="tab+'-text'" class="text-gray-500">{{ index+1 }}</span>
                </span>
                <span style="font-size:12px;font-weight:bold" 
                    class="text-gray-500 block mx-auto">{{ tab }}</span>
            </li>
        </ul>

        <!-- <slot/> -->
        <component class="tab mb-2" :is="currentTabComponent"></component>
        </div>
        <p v-else class="rounded text-black p-2 mx-3
                max-w-xs mx-auto text-center bg-yellow-500">
                    Cart is empty
                <router-link :to="{name:'shop'}" 
                class="text-white hover:text-gray-200">
                    Go shopping
                </router-link>
        </p>
    </main>
</template>

<script>
import cart from './Cart.vue'
import delivery from './Delivery.vue'
import checkout from './Checkout.vue'

export default {
    name: 'Shopping',

    data(){
        return{
            currentTab: 'cart',
            tabs:['cart', 'delivery', 'checkout'],
        }
    },

    methods:{
        tabIndicator(tab){
            document.getElementById(tab+'-text').innerHTML = ''
            document.getElementById(tab+'-text').classList.remove('bg-gray-500','text-green-500')
            document.getElementById(tab+'-text').classList.add('fas', 'fa-check')
            document.getElementById(tab+'-text').classList.add('checkedout')
        }
    },

    mounted(){
        console.log(this.$store.getters['cart/cartTotalPrice'])
        this.$eBus.on('shopping', payload => {
            switch(payload)
            {
                case 'delivery':
                    this.currentTab = 'delivery'
                    this.tabIndicator('cart')
                    window.scrollTo(0,0)
                    break

                case 'checkout':
                    this.currentTab = 'checkout'
                    this.tabIndicator('delivery')
                    this.tabIndicator('checkout')
                    console.log('checkout')
                    window.scrollTo(0,0)
                    break
                
                case 'payment':
                    this.currentTab = 'checkout'
                    this.tabIndicator('delivery')
                    this.tabIndicator('checkout')
                    console.log('checkout')
                    window.scrollTo(0,0)
                    break

                // default:
                //     this.currentTab = 'cart' 
            }
        })
    },

    computed:{
        currentTabComponent() {
            return this.currentTab.toLowerCase()
        }
    },
      
    components:{
        cart, delivery, checkout
    }
}
</script>