<template>
    <div class="mx-auto my-auto shadow rounded-br rounded-bl py-1 px-2">
       
                <h1 class="text-center mx-3 
                sm:mx-0 py-2 uppercase border- border-gra">Shopping Cart</h1>
                <form name="cart" 
                class="mx-auto px-1 sm:px-0 mt-3 w-full">
                        <table class="w-full text-center shadow bg-gray-00 
                        rounded">
                            <thead class="text-gray-500 pb-8 mb-6 font-normal">
                                <tr>
                                    <th>
                                        <span class="fas fa-image"></span>
                                    </th>
                                    <th class="border-l p-1 border-gray-200">Title</th>
                                    <th class="border-l border-gray-200">Price</th>
                                    <th class="border-l border-gray-200">Qty</th>
                                    <th class="border-l border-gray-200">Subtotal</th>
                                    <th class="border-l border-gray-200">&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody class="py-3 font-medium">
                            <tr v-for="(cartItem, index) in cart" :key="index" 
                                class="border-t border-gray-300">
                                <td class="p-1 flex flex-col text-center m-auto items-center">
                                    <img width="25" height="25" class="m-auto rounded" 
                                    :src="cartItem.image" :alt="cartItem.name">
                                </td>

                                <td style="line-height:1" class="border-l text-left border-gray-200 
                                text-xs sm:text-sm lg:text-l">
                                    {{ cartItem.name }}
                                </td>
                                <td class="border-l border-gray-200 text-xs sm:text-sm lg:text-l">
                                    <span v-html="$currency"></span>{{cartItem.price}}
                                </td>
                                <td class="border-l border-gray-200">
                                    <input type="number" min="1" @change="updateCart"
                                    class="rounded w-12 shadow border mx-1 border-gray-200 py-0 p-1" 
                                    :value="cartItem.quantity">
                                </td>
                                <td class="border-l border-gray-200 text-xs sm:text-sm lg:text-l">
                                    <span v-html="$currency"></span>{{cartItem.subTotal.toFixed(2)}}
                                </td>
                                <td class="border-l border-gray-200 px-1">
                                    <a href="javascript:void(0)" class="text-red-500" 
                                    @click.prevent="deleteItem(cartItem)"><span 
                                    class="fas fa-times-circle"></span>
                                    </a>
                                </td>
                            </tr>
                            <tr class="border-t  border-gray-300">
                                <td></td>
                                <td></td>
                                <td class="border-l border-gray-200 p-1">Total</td>
                                <td class="border-l border-gray-200 p-1">
                                    <!-- {{$total}} -->
                                </td>
                                <td class="border-l border-gray-200 text-xs sm:text-sm">
                                    <span v-html="$currency"></span>{{ totalPrice.toFixed(2) }}
                                </td>
                                <td class="border-l border-gray-200 text-red-500"></td>
                                <!-- <td></td> -->
                            </tr>
                            </tbody>
                        </table>

                    <div class="flex justify-between mt-2">
                        <button type="button"
                        @click="deleteCart"
                        class="text-xs sm:text-sm md:text-md
                        rounded py-1 border bg-white border-red-500 
                        text-red-500 font-bold overflow-hidden
                        px-2 sm:py-2 md:py-2 hover:text-white hover:bg-red-500">
                        DELETE CART</button>

                        <button type="button" 
                        @click="updateCart"
                        class="text-xs sm:text-sm md:text-md rounded font-bold
                        py-1 border bg-white border-yellow-500 hover:text-white
                        px-2 sm:py-2 md:py-2 text-yellow-500 hover:bg-yellow-500">UPDATE CART</button>

                        <button 
                        class="text-xs sm:text-sm uppercase rounded py-1 border bg-white 
                        border-green-500 text-green-500 font-bold
                        px-2 sm:py-2 md:py-2 hover:text-white 
                        hover:bg-green-500" @click.prevent="delivery">
                        Delivery
                        </button>
                    
                    </div>
                </form>

                <!-- <form name="cart-sm" class="mx-auto px-2 mt-6 w-full block 
                sm:hidden md:hidden lg:hidden xl:hidden" style="max-width:650px">
                    
                    <ul class="w-full text-center p-1 rounded overflow-hidden">
                        
                        <li v-for="(cartItem, index) in cart" :key="index"  
                        class="flex flex-col text-gray-600 mb-4 bg-gray-00 
                        border-2 shadow p-1 rounded">
                                    <div class="flex items-center">
                                        <img class="mx-auto h-28 w-28 "
                                        :src="cartItem.image" 
                                        alt="{{cartItem.name}}">

                                        <div class="border-l border-gray-300 pl-2 flex-grow w-full ml-2">
                                            <p>{{cartItem.name}}</p>
                                            <p class="my-2 rounded py-1 shadow border border-gray-300">
                                                Qty:
                                                <input type="number" min="1" @change="updateCartSm"
                                                class="rounded w-12 border-0 p-1" 
                                                :value="cartItem.quantity">
                                            </p>
                                            <p>Unit price: <span v-html="$currency"></span>{{cartItem.price}}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex w-full text-center border-t border-gray-300 mt-2">
                                        <p class="w-1/2 border-r border-gray-300">
                                            <a class="text-red-500" 
                                                href="#">
                                                REMOVE
                                            </a>
                                        </p>
                                        <p class="text-center w-1/2">
                                            <span class="text-gray-500">Subtotal:</span> <span v-html="$currency"></span>{{cartItem.subTotal.toFixed(2)}}
                                        </p>
                                    </div>
                                    
                                </li>
                            <li class="flex h-full text-gray-600 justify-between 
                            items-center bg-gray-00 border shadow p-2">
                                <span>Total</span>
                                <span><span v-html="$currency"></span>{{ totalPrice.toFixed(2) }}</span>
                            </li> 
                    </ul>

                    <div class="flex justify-between my-4">
                        <button @click="deleteCart" type="button"
                        class="text-xs sm:text-sm md:text-md
                        rounded py-2 border bg-white border-red-500 
                        text-red-500 font-bold overflow-hidden
                        px-2 sm:py-2 md:py-2 hover:text-white hover:bg-red-500">
                            DELETE CART
                        </button>

                        <button @click="updateCartSm" type="button"
                        class="text-xs sm:text-sm md:text-md rounded font-bold
                        py-2 border bg-white border-yellow-500 hover:text-white
                        px-2 sm:py-2 md:py-2 text-yellow-500 hover:bg-yellow-500">
                            UPDATE CART
                        </button>

                        <button class="text-xs sm:text-sm rounded py-2 border bg-white 
                        border-green-500 text-green-500 font-bold
                        px-2 sm:py-2 md:py-2 hover:text-white hover:bg-green-500" 
                        @click="$eBus.emit('shopping', 'delivery')">DELIVERY</button>
                    
                    </div>
                </form> -->
    </div>
</template>

<script>
// import Shopping from './Shopping'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Cart',

    mounted(){
        document.title = `Cart | ${this.$appName}`
    },
    
    computed:{
        ...mapGetters('cart', {
            cart: 'cartProducts',
            totalPrice: 'cartTotalPrice',
            totalquantity: 'cartTotalQuantity'
        }),
    },
    methods:{
        updateCart(){
            let data = document.forms['cart'].getElementsByTagName('input')
            // if(!data)
            //     data = document.forms['cart-sm'].getElementsByTagName('input')

            this.$store.commit('cart/UPDATE_CART', data)
        },

        updateCartSm(){
            let data = document.forms['cart-sm'].getElementsByTagName('input')
            this.$store.commit('cart/UPDATE_CART', data)
        },

        decrementItem(item){
            item.quantity--
        },

        ...mapMutations('cart', {
            deleteCart: 'DELETE_CART',
            deleteItem: 'DELETE_ITEM',
            decrement: 'DECREMENT_ITEM_QUANTITY',
            increment: 'INCREMENT_ITEM_QUANTITY'
        }),

        delivery(){
            if(this.$store.getters['user/isLoggedIn'])
                this.$eBus.emit('shopping', 'delivery')
            else
                this.$router.push({ name : 'login', query: { redirect: this.$route.fullPath }})
        }
    },
    components:{
        // Shopping
    }
}
</script>

<style>
    @media (max-width: 320px) {
        .text-xm{
            font-size: 12px;
        }
    }
</style>