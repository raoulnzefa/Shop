<template>
    <div class="px-3 sm:px-10">
      <loader :loading="loading" />
      <div v-if="brand && products.length" class="container py-3">
          <h1 class="text-gray-500 text-center my-10
          uppercase font-bold border-b border-gray-300 mb-5">
            <span v-html="brand.name"></span>
          </h1>
          <div class="flex flex-col mt-10 sm:flex-row flex-nowrap sm:flex-wrap">
            <div class="w-full sm:w-1/5 p-1" 
              v-for="product in products" 
              :key="product.id">
              <product-data :product="product"/>
            </div>
          </div>
      </div>
      <p v-if="!loading && !products.length" 
        class="p-2 w-full sm:w-1/3 
        mx-auto px-3 mt-5 text-center 
        rounded bg-yellow-400 text-white"> 
        No product for this category
      </p>
    </div>
</template>

<script>
import ProductData from '../components/ProductData.vue'
export default {
  components: { ProductData },
    name: 'Category',
    data(){
      return {
        brand:null,
        products:[],
        loading:false,
        error: false
      }
    },

    created(){
      this.fetchData()
    },
    
    methods:{
      fetchData(){
        var vm = this
        vm.loading = true
        window.$http.get(`${window.$wp}brands/?slug=${this.$route.params.slug}`)
        .then(({data}) => {
          vm.brand = data[0]
          document.title = `${vm.brand.name} | ${this.$appName}`
          window.$http.get(`${window.$wc}products/?brand=${vm.brand.id}`)
          .then(({data}) => {
            vm.loading = false
            vm.products = data
            console.log(data)
          }).catch(error => {
            vm.loading = false
            vm.error = error.toString()
          })
        }).catch(error => {
          vm.loading = false
          vm.error = error.toString()
        })
      }
    }
}
</script>

