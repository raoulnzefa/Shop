<template>
    <div v-if="products.length"
            class="sm:px-10 px-3 flex flex-col sm:flex-row 
            flex-nowrap sm:flex-wrap">
        <div class="w-full sm:w-2/12 p-1" 
            v-for="product in products" :key="product.id">
            <product-data :product="product"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RelatedProduct',
    props:['ids'],
    data(){
        return {
            products:[]
        }
    },
    mounted(){
        const vm = this
        const related_products = []
        vm.ids.forEach(id => {
            window.$http.get(`${window.$wc}/products/${id}`).then(({data}) => {
                related_products.push(data)
            })
        })
        vm.products = related_products
        console.log('vm.related_products')
        console.log(vm.products)
    }
}
</script>