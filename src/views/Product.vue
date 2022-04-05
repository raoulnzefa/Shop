<template>
    <div class="w-full py-2 m-auto">
        <loader :loading="loading"/>

        <div class="mb-24" v-if="!loading && product">
            <div class="flex flex-col items-center sm:flex-row mb-3 sm:px-10 px-3">
                <div class="w-full sm:w-4/12 sm:border-r-2 sm:pr-10 border-gray-300 sm:mr-10">
                    <h1 style="color:#0062bd" 
                        class="flex block sm:hidden text-capitalize text-center product-title my-3">
                        <router-link class="font-size:25px" :to="{ name: 'shop' }">
                            <span class="text-yellow-500 fas fa-chevron-circle-left"></span>
                        </router-link>
                        <span class="mx-auto">{{ product.name }}</span>
                    </h1>

                        <div class="relative ">
                            <p v-if="product.regular_price&&product.sale_price" title="discount tag"
                                class="absolute bg-yellow-400 font-bold px-1 pb-0 rounded"
                                style="left:10px;top:10px;">
                                {{discount(product)}}
                            </p>

                            <button v-if="$route.name !== 'wish-list'"
                                    @click="addToWishlist" 
                                    class="absolute cursor-pointer hover:text-red-500 text-red-400"
                                    title="Add to wishlist"
                                    style="right:10px;top:10px;font-size:27px;line-height:.2" >
                                <span class="fas fa-heart"></span>
                            </button>
                        
                    
                    
                    <img :src="image" class="rounded" :alt="product.slug">

                                <!-- <ul v-if="product.images.length" class="mt-1 list-unstyled d-flex justify-content-between">
                                    <li style="cursor:pointer" 
                                    v-for="(image, index) in product.images" 
                                    @click="changeImage(image)" :key="index">
                                        <img class="rounded" style="height:50px;width:50px" :src="image.src" :alt="product.slug">
                                    </li>
                                </ul> -->
                    </div>

                </div>

                <div class="border-gray-300 w-full sm:w-5/12 mt-5 sm:mt-0">
                    <!-- <span v-if="product.categories.length" class="product-categories">
                                    <router-link 
                                    :to="{ name : 'category', params:{ slug: product.categories[0].slug }}" 
                                    class="text-capitalize text-decoration-none text-secondary">
                                        <span v-html="product.categories[0].name" />
                                    </router-link>
                    </span> -->
                    <h1 style="color:#0062bd" 
                    class="text-capitalize  hidden sm:block product-title my-3">
                        {{ product.name }}
                    </h1>
                                
                                <!-- <div v-if="product.tags.length" class="mb-2 brand">
                                    <router-link
                                    :to="{ name : 'tag', params:{ slug: product.tags[0].slug }}" 
                                    class="text-capitalize text-decoration-none text-secondary">
                                        {{ product.tags[0].name }}
                                    </router-link>
                                </div> -->
                    <!-- <div class="flex justify-between"> -->
                        <p v-if="product.brands.length">Brand: <router-link  
                        class="bg-yellow-400 rounded p-1 text-white uppercase text-xs font-bold" 
                        :to="{name:'brand', params: { slug: product.brands[0].slug }}">
                            {{product.brands[0].name}}
                        </router-link></p>

                        <p class="mt-3">Categories: 
                            <router-link :to="{name: 'category', params:{slug:category.slug}}" 
                                :key="index" class="text-gray-500"
                                v-for="(category, index) in product.categories">
                                {{category.name}}
                                <template v-if="index != product.categories.length - 1">, </template>
                            </router-link>
                        </p>
                    <!-- </div> -->

                    <div class="mt-4 short-description">
                        <p class="pb-2 " v-html="product.short_description"></p>

                        <!-- <div class="flex justify-between my-4">
                            <p v-if="product.regular_price&&product.sale_price" title="discount tag"
                                class="bg-yellow-400 font-bold px-1 pb-0 rounded">
                                {{discount(product)}}
                            </p>

                            <button v-if="$route.name !== 'wish-list'"
                                @click="addToWishlist" 
                                class="cursor-pointer hover:text-red-500 text-red-400"
                                title="Add to wishlist"
                                style="font-size:27px;line-height:.2" >
                                <span class="fas fa-heart"></span>
                            </button>
                        </div> -->
                        <p v-if="product.regular_price&&product.sale_price" 
                        class="border-b border-t border-gray-300 
                        my-3 flex py-1 justify-between">
                            <span class="font-bold"><span v-html="$currency"></span>{{ product.sale_price }}</span>
                            <del><span v-html="$currency"></span>{{ product.regular_price }}</del>
                        </p>

                        <p v-else class="border-b border-t border-gray-300 
                        my-3 py-1">
                            <span v-html="$currency"></span>{{ product.price }}
                        </p>

                        <!-- <button @click="addToCart" 
                            class="rounded bg-yellow-500 hover:text-gray-500
                            hover:bg-yellow-400 uppercase w-full sm:w-2/3 py-2 shadow px-5" 
                            type="button">
                            <span class="fas fa-cart-arrow-down"></span> 
                            Add to cart
                        </button> -->
                        <add-to-cart :product="product"/>
                    </div>
                </div>

                <!-- <div style="height:400px" class="overflow-scroll 
                sm:border-l-2 sm:pl-10 border-gray-300 
                sm:ml-10 w-full sm:w-5/12 mt-5 sm:mt-0">
                    <h2 style="color:#0062bd" 
                    class="text-capitalize product-title my-3">
                        Description
                    </h2>
                   <div class="table table-responsive" 
                    v-html="product.description">
                </div>
                </div> -->
            </div>
                    

            <div class="">
                <div class="flex justify-between sm:justify-start 
                items-center bg-gray-300  text-black  py-1 sm:px-10 px-3 mb-0">
                    <button style="cursor:pointer" class="font-bold uppercase m-2"
                        v-for="(tab, index) in tabs"
                        v-bind:key="index"
                        v-on:click="currentTab=tab.slug"
                            v-bind:class="['tab-button', { active: currentTab === tab.slug }]">
                        {{tab.name}}
                    </button>
                </div>
                            
                <div v-show="currentTab == 'related_ids'"
                    class="sm:px-10 px-3 flex flex-col sm:flex-row 
                    flex-nowrap sm:flex-wrap">
                    <template v-if="product.related_ids.length">
                        <div class="w-full sm:w-1/5 p-1" 
                            v-for="id in product.related_ids" :key="id">
                            <product-data-with-id :id="id"/>
                        </div>
                    </template>
                    <template v-else>
                        <p class="">No related items for this product</p>
                    </template>

                </div>
                
                <div v-show="currentTab=='description'"
                    class="sm:px-10 px-3 sm:w-7/12 w-full mx-auto">
                        <div v-if="product.json_description">
                            <div class="flex shadow border border-gray-400 py-1 px-2 mt-2 rounded" 
                                v-for="(data, index) in JSON.parse(product.json_description)" 
                                :key="index">
                                
                                <div class="w-4/12 pr-7 border-r border-gray-400">
                                    <b>{{data.key}}</b>
                                </div>
                                <div class="w-8/12 pl-3">
                                    {{data.value}}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'    
import ProductDataWithId from '@/components/ProductDataWithId.vue'
import addToCart from '@/components/AddToCartBtn.vue'

export default {
    data(){
        return {
            image: null,
            show: false,
            related_products:[],
            product: null,
            loading:false,
            currentTab: 'related_ids',
            tabs:[
                {slug:'related_ids', name:'Related'},
                {slug:'description', name:'Description'}
            ]
        }    
    },
    
    mounted(){
        this.fetchData()
    },
    
    methods:{
        // ...mapActions('wishlist', { favAdd: 'addItem'}), 
        discount(product){
            if(product.regular_price && product.sale_price){
                let discount = product.regular_price - product.sale_price
                return '-'+Math.floor((discount / product.regular_price) * 100) + '%'
            }
        },
        fetchData(){
            var vm =  this
            vm.loading = true
            window.$http.get(`${window.$wc}products/?slug=${this.$route.params.slug}`)
            .then(({data}) => {
                vm.loading = false
                vm.product = data[0]
                document.title = `${vm.product.name} | ${this.$appName}`
                vm.$store.dispatch('wishlist/addViewedItem', data[0])
                this.image = vm.product.images[0].src
                // console.log(vm.$store.state.wishlist.views)
            })
        },

        changeImage(image){
            this.image = image.src;
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
            // console.log('clicked')
        },
    },

    components:{
        ProductDataWithId,
        addToCart
    }  
}
</script>

<style scoped>
.active{
    border-bottom: 3px solid rgba(218, 142, 28, 0.966);
}
.product-title{
    font-size: 1.586em;
    line-height: 1.28em;
    margin-bottom: .48em;
    font-weight: 500;
}
.price{
    font-size: 2.5em;
    font-weight: 400;
}
.product-image ul > li{
    width: 20%;
}
.product-image > img{
    display: block;
    max-width: 100%;
    height: auto;
    margin: auto;
}
.product-image > ul > li > img{
    border: 1px solid #eaeaea;
    display: block;
    max-width: 100%;
    height: auto;
    margin: auto;
}
</style>