<template>
    <div class="w-full px-3 sm:px-10 my-auto">
        <div class="px-3 mb-5 text-center py-2 rounded  text-gray-500 p-2
          uppercase font-bold border-b shadow border-gray-300">        
        
            <h1 class="text-center">
              <span class="fas fa-heart"></span> Your favorites <span class="fas fa-heart"></span>
            </h1>
          </div>
            
        <div v-if="list.length" class="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap">
            <div class="w-full sm:w-1/5 p-1" 
                v-for="product in list" :key="product.id">
                <product-data :product="product"/>
            </div>
        </div>
                  
        <p v-if="!list.length" 
            class="p-2 w-75 mx-auto px-3 text-center 
            rounded bg-warning text-dark"> 
            Your have not added any favorite item to list
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Wishlist',
    mounted(){
      document.title = `Wish lists | ${this.$appName}`
      // console.log(this.$route.name)
    },
  
    computed:{
      ...mapGetters('wishlist', {
        list: 'listProducts'
      })
    }
}
</script>