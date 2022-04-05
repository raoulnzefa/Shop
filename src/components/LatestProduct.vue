<template>
    <div>
        <!-- <div v-if="loading" style="height: 50vh" 
            class="d-flex justify-content-center align-items-center text-center mt-5">
            <img :class="{loading: loading}" :src="`${$publicPath}img/logo-gray.png`">
        </div> -->
        <loader :loading="loading"/>

        <!-- <div v-if="loading&&!products.length" class="flex align-center justify-center m-auto">
            loading...
        </div> -->

        <div v-if="products" class="flex flex-col xs:flex-row flex-nowrap xs:flex-wrap">
            <div class="w-full xs:w-1/2 lg:w-1/6 md:w-3/12 sm:w-4/12 p-1 pb-3" 
            v-for="product in products" :key="product.id">
                <product-data :product="product"></product-data>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        // name: 'topProducts',
        props:['category', 'limit'], // category is an object
        data(){
            return{
                products: [],
                loading: false
            }
        },
        mounted(){
            var vm = this
            vm.loading = true
            window.$http.get(`${window.$wc}products?status=publish&per_page=${this.limit}&category=${this.category.id}`)
            .then(({data}) => {
                vm.loading = false
                vm.products = data
            })
        }
    }
</script>


