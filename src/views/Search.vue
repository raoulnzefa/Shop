<template>
    <div class="sm:px-10 px-3 w-full py-2 m-auto">
      <!-- <loader :loading="loading"/> -->
      <div>
        <div 
          class="px-3 flex justify-between py-2 my-4 rounded 
          sm:justify-center  items-center text-gray-500 p-2
          uppercase font-bold border-b shadow border-gray-300">        
          <div v-show="hidden" style="cursor:pointer" @click="hidden=!hidden" class="block sm:hidden border border-gray-200 shadow rounded py-1 px-3">
            <span class="fas fa-filter"></span>
          </div>

          <div v-show="!hidden" style="cursor:pointer" @click="hidden=hidden" class="block sm:hidden border border-gray-200 shadow rounded py-1 px-3">
            <span class="fas fa-filter"></span>
          </div>

          <h1 class="text-center">
            All products in Shop
          </h1>
        </div>
        
        <div class="">
           <!-- <paginate v-if="total_pages > 1" class="py-5"
                  :current_page="page" 
                  :max_visible_btn="4" 
                  :total_pages="total_pages"/>
                <div style="clear:both"></div> -->

          <div :class="{ hidden: hidden }" id="advsearch"
            class="sm:block w-full shadow bg-gray-100 border border-gray-200 
            float-left p-3 rounded lg:w-3/12 sm:w-4/12">
            <adv-search/>
          </div>

          <div v-if="!loading && products.length" class="w-full lg:w-9/12 sm:w-8/12 
          flex flex-col sm:flex-row flex-nowrap sm:flex-wrap sm:pl-3">
            <div class="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 sm:pl-3 mb-3" 
              v-for="product in products" :key="product">
              <product-info :id="product"/>
            </div>
          </div>
          
          <div v-else
            class="ml-auto w-full lg:w-9/12 sm:w-8/12 text-black"> 
            <p class="bg-yellow-300 px-3 sm:ml-8 py-2 mt-5 text-center rounded">No search items</p>
          </div>
        </div>

        <paginate v-if="total_pages > 1" class="my-4"
          :current_page="page" 
          :max_visible_btn="4" 
          :total_pages="total_pages"/>
      </div>

    </div>
</template>

<script>
import paginate from '@/components/Paginate.vue'
// import ProductDataWithId from '@/components/ProductDataWithId.vue'
import AdvSearch from '@/components/AdvSearch'

export default {
    name: 'Search',
    data(){
      return {
        products:[],
        page:1,
        total_pages:'',
        loading:false,
        error: '',
        hidden:true,
        term:''
      }
    },
    mounted(){
      document.title = `Search | ${this.$appName}`
      
      this.fetchData()

      this.$eBus.on('pagechanged', payload => {
        this.page = payload
        this.fetchData()
      })

      this.$eBus.on('searchTerm', payload => {
        this.products = payload
        console.log(this.products)
      })

      this.$eBus.on('searchData', payload => {
        this.fetchData(payload)
      })

    },
    
    methods:{
      // fetchData(){
      //   var vm = this
      //   vm.loading = true
      //   window.$http.get(`wp/v2/search?subtype=product&search=${this.term}`)
      //   // window.$http.get(`${window.$wc}products?per_page=${this.$per_page}&page=${this.page}`)
      //   .then(resp => {
      //     // vm.total_results = resp.headers['x-wp-total']
      //     vm.total_pages = resp.headers['x-wp-totalpages']
      //     // console.log(resp)
      //     vm.loading = false
      //     vm.products = resp.data
      //   }).catch(error => {
      //     vm.loading = false
      //     vm.error = error.toString()
      //   })
      // },

      fetchData(data={}){
        var vm = this
        vm.loading = true
        window.$http.get(`${window.$elektro}search?per_page=${this.$per_page}&page=${this.page}`,
        { params: data }).then(resp => {
          // vm.total_results = resp.headers['x-wp-total']
          vm.total_pages = resp.headers['x-wp-totalpages']
          // console.log(vm.total_products)
          vm.loading = false
          vm.products = resp.data
          console.log(vm.products)
         }).catch(error => {
          vm.loading = false
          vm.error = error.toString()
        })
      },
    },

    components:{
      paginate,
      // ProductDataWithId, 
      AdvSearch 
    }
}
</script>