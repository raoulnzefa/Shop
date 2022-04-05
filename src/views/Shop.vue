<template>
    <div id="mains" class="sm:px-10 px-3 w-full py-2 m-auto">
      <loader :loading="loading"/>
      <div v-if="products.length">
        
        <div class="px-3 py-2 my-4 rounded 
          text-center text-gray-500 p-2 uppercase 
          font-bold border-b shadow border-gray-300">     

          <h1 class="text-center">
            All products in Shop
          </h1>
        </div>
        <div  
          class="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap">
            <div class="w-full lg:w-1/6 md:w-3/12 sm:w-4/12 p-1 pb-3" 
              v-for="product in products" :key="product">
              <product-data :product="product"/>
            </div>
        </div>

        <paginate v-if="total_pages > 1" class="my-4"
          :current_page="page" 
          :max_visible_btn="4" 
          :total_pages="total_pages"/>
      </div>

      <p v-if="!loading && !products.length" 
        class="p-2 w-75 mx-auto px-3 mt-5 text-center rounded bg-danger text-white"> 
        No products yets
      </p>
    </div>
</template>

<script>
import paginate from '@/components/Paginate.vue'
// import AdvSearch from '@/components/AdvSearch'

export default {
    name: 'Products',
    data(){
      return {
        products:[],
        page:1,
        total_pages:'',
        loading:false,
        error: '',
        hidden:true
      }
    },

    // watch:{
    //   products(newProducts){
    //     // oldProducts = newProducts
    //     // console.log(oldProducts)
    //     console.log(newProducts)
    //   }
    // },

    mounted(){
      var vm = this
      document.title = `Shop | ${this.$appName}`
      
      this.fetchData()

      this.$eBus.on('pagechanged', payload => {
        this.page = payload
        this.fetchData()
      }),

      // this.$eBus.on('searchData', (payload) => {
      //   this.fetchData(payload),
      //   console.log(this.products)
      // })

      document.addEventListener('mouseup', (e) => {
        var advSearch = document.getElementById('advsearch')
        if(advSearch != null){
          if(!advSearch.contains(e.target)) {
            vm.hidden = true
          }
        }
      }, false)
    },
    
    methods:{
      // fetchData(data={}){
      //   var vm = this
      //   vm.loading = true
      //   window.$http.get(`${window.$elektro}search?per_page=${this.$per_page}&page=${this.page}`,
      //   { params: data }).then(resp => {
      //     // vm.total_results = resp.headers['x-wp-total']
      //     vm.total_pages = resp.headers['x-wp-totalpages']
      //     // console.log(vm.total_products)
      //     vm.loading = false
      //     vm.products = resp.data
      //     console.log(vm.products)
      //    }).catch(error => {
      //     vm.loading = false
      //     vm.error = error.toString()
      //   })
      // },

      fetchData(){
        var vm = this
        vm.loading = true
        window.$http.get(`${window.$wc}products?per_page=${this.$per_page}&page=${this.page}&status=publish`)
        .then(({headers, data}) => {
          // vm.total_results = resp.headers['x-wp-total']
          vm.total_pages = headers['x-wp-totalpages']
          // console.log(vm.total_products)
          vm.loading = false
          vm.products = data
         }).catch(error => {
          vm.loading = false
          vm.error = error.toString()
        })
      },
    },

    components:{
      paginate,
      // AdvSearch 
    }
}
</script>