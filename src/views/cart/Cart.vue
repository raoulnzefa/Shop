<template>
    <div class="container p-0">
        <h1 class="text-center my-5 border-bottom border-gray">Shopping Cart</h1>
        <form  v-if="cart.length" name="cart">
            <table class="cart table">
                <thead class="border-bottom border-gray">
                    <th></th>
                    <th colspan="2" class="text-center">Product name</th>
                    <th>Price</th>
                    <th class="text-center">Quantity</th>
                    <th>SubTotal</th>
                </thead>
                <tbody > 
                    <tr v-for="(cartItem, index) in cart" :key="index">
                        <td><a href="javascript:void(0)" class="text-danger" 
                        @click.prevent="deleteItem(cartItem)"><span class="fas fa-times-circle"></span>
                        </a></td>
                        <td><img style="width:10px;height:10px" class="rounded" 
                        :src="cartItem.image" :alt="cartItem.name"></td>
                        <td data-colname="Title">{{ cartItem.name }} </td>
                        <!-- <br> <span class="text-uppercase">SKU: {{ cartItem.sku }}</span> -->
                        <td data-colname="Price"><span v-html="$currency"></span>{{ cartItem.price }}</td>
                        <td data-colname="Quantity">
                            <div style="width: 50%" class="input-group mx-sm-auto ml-auto">
                              <div style="cursor:pointer" @click="decrement(cartItem)" 
                              class="input-group-prepend">
                                  <span class="input-group-text"><b>-</b></span>
                              </div>
                              <input type="text" @change="updateCart" min="1" :value="cartItem.quantity" 
                              class="text-center form-control">
                              <div style="cursor:pointer" @click="increment(cartItem)" class="input-group-append">
                                  <span class="input-group-text"><b>+</b></span>
                              </div>
                            </div>
                        </td>
                        <td data-colname="SubTotal"><span v-html="$currency"></span>{{ cartItem.subTotal }}</td>
                    </tr>
                </tbody>
                <tfoot class="" id="cart-foot">
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>Total</td>
                        <td><span v-html="$currency"></span>{{ total }}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><button type="button" class="btn btn-warning d-block w-100 round" @click="updateCart"><span class="fas fa-cart-plus"></span> Update cart</button></td>
                        <td colspan="2"><button type="button" class="btn btn-danger d-block w-100 round" @click="deleteCart"><span class="fas fa-times-circle"></span> Clear cart</button></td>
                        <td colspan="2"><button type="button" 
                        class="text-white btn btn-success d-block w-100 round" 
                        @click="$eBus.emit('checkout', 'delivery')">Proceed to delivery</button></td>
                    </tr>
                </tfoot>
            </table>

        </form>
        <p v-if="!cart.length" class="py-2 text-center text-white bg-warning round mt-5">
            No item in cart 
            <router-link class="text-dark text-decoration-none" :to="{ name : 'home'}"> 
                continue shopping
                </router-link>
        </p>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'Cart',
    mounted(){
        document.title = `Cart - ${this.$appName}`
    },
    computed:{
        ...mapGetters('cart', {
            cart: 'cartProducts',
            total: 'cartTotalPrice'
        }),
    },
    methods:{
        updateCart(){
            let data = document.forms['cart'].getElementsByTagName('input')
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
    }
}
</script>
<style scoped>
.table > :not(:last-child) > :last-child > * {
    border-bottom-color: #dee3e8 !important;
}
@media (max-width: 991.98px)  {
    .cart table, tr, tbody, thead, td{
        display: block;
        margin: 2px;
    }
    .cart thead{
        display: none;
    }
    input[type="number"]{
        margin: auto;
    }
    .cart tbody tr{
        border-top: 1px solid #cec8c8;
        position: relative;
    }
    .cart tbody tr td:first-child{
        position: absolute;
    }
    .cart tbody tr td{
        display: block;
        text-align: center;
        border: none;
    }
    .cart tfoot tr:first-child{
        display: flex;
        border-top: 1px solid #cec8c8;
        border-bottom: 1px solid #cec8c8;
        justify-content: space-between !important;
    }
    .cart tfoot tr:first-child td:nth-child(-n+4){
        display: none;
    }
    .cart tfoot tr td{
        display: inline;
        border: none;
    }
}

 @media (max-width: 991.92px) {
    #cart-foot{
        /* position: fixed;
        left: 0;
        right: 0;
        bottom:28px; */
        text-align: center;
        padding: 0 1rem !important;
        /* box-shadow:slateblue; */
    }
    #cart-foot button{
        padding-top:0.25rem;
        padding-bottom:0.25rem;
    }
    .cart tr td[data-colname]::before {
        content: attr(data-colname) ": ";
        /* font-weight: 600; */
        float: left;
    }
    .cart tr td {
        text-align: right !important;
        display:block;
        clear: both;
    }
}
</style>
