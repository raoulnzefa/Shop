<template>
    <div class="border flex flex-row xs:flex-col overflow-hidden shadow 
        rounded p-2 h-full">
        <div class="relative mr-2 xs:mr-0 w-5/12 xs:w-auto h-full">
            <span v-if="product.regular_price&&product.sale_price"
                title="discount"
                style="top:8px;left:8px" 
                class="absolute bg-yellow-500 rounded-full px-1">
                {{discount(product)}}
            </span>

            <button class="absolute text-lg"
             style="top:-1px;right:5px;" 
             @click="addToWishlist" v-if="$route.name !== 'wish-list'">
                <span 
                    title="Add to wishlist"
                    class="fas fa-heart text-gray-500 hover:text-gray-700 cursor-pointer">
                </span>
            </button>
            
            <!-- <span style="top:-12px;right:-2px" 
                class="absolute {{ 'new' == $product->condition ? 'bg-green-400' :''}} 
                {{ 'used' == $product->condition ? 'bg-blue-400' :''}} font-bold text-xs rounded uppercase
                px-1 text-white">
                {{ product.condition }}
            </span> -->

            <router-link :to="{ name: 'product', params:{ slug: product.slug } }">                      
                <img class="w-full h-full rounded" :src="product.images[0].woocommerce_thumbnail"
                alt="{{ product.title }}">
            </router-link>
        </div>

        <div class="flex flex-col w-7/12 xs:w-auto 
            border-l pl-2 sm:pl-0 sm:border-l-0">           
            
            <div class="flex flex-col h-full">
                <p>
                <router-link class="text-gray-700" :to="{name: 'product', params:{slug: product.slug}}">                      
                {{product.name}}
                </router-link>                      
                </p>

                <p v-if="product.regular_price&&product.sale_price" 
                class="border-b border-top border-gray-300 
                mb-1 product-price flex py-1 justify-between">
                    <span class="bg-green-200  px-2 px-1 rounded"><span v-html="$currency"></span>{{ product.sale_price }}</span>
                    <del><span v-html="$currency"></span>{{ product.regular_price }}</del>
                </p>
                <p v-else 
                class="border-bottom border-top border-gray 
                mb-1 product-price py-1">
                    <span style="line-height:1" class="bg-green-200  px-2 rounded">
                        <span v-html="$currency"></span>{{ product.price }}
                    </span>
                </p>
            </div>
                                    
            <!-- <button @click="addToCart"
            class="w-full rounded py-1 border hover:bg-white 
            hover:border-yellow-500 hover:text-yellow-500 
            px-2 sm:py-2 text-black bg-yellow-500">
            ADD TO CART
            </button> -->
            <add-to-cart class="hidden sm:block" :product="product"/>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex'
import addToCart from '@/components/AddToCartBtn.vue'
export default {
    name: 'Product',
    props:['product', 'category', 'tag'],
    methods:{
        discount(product){
            if(product.regular_price && product.sale_price){
                let discount = product.regular_price - product.sale_price
                return '-'+Math.floor((discount / product.regular_price) * 100) + '%'
            }
        },

        addToCart(){
            let data = {};
            data['id'] = this.product.id
            data['price'] = this.product.price
            data['name'] = this.product.name
            data['image'] = this.product.images[0].src
            data['slug'] = this.product.slug
            this.$store.dispatch('cart/addItem', data)
        },

        addToWishlist(){
            this.$store.dispatch('wishlist/addItem', this.product)
        },
        ...mapActions('wishlist', { favAdd: 'addItem'})
    },

    // computed:{
    //   ...mapGetters('cart', ['inCart']),
    // }
    components:{
        addToCart
    }
}
</script>

