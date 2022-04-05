<template>
        <div class="px-3 sm:px-10">
           <header class="flex my-8 mt-4">
            <router-link :to="{name: 'user-home'}">
            <span class="text-yellow-500 fas fa-2x fa-chevron-circle-left"></span>
            </router-link>
            <h2 class="mx-auto uppercase"> Your favorites </h2>
          </header>
       
            
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
      document.title = `WISHLISTS - ${this.$appName}`
      // console.log(this.$route.name)
    },
  
    computed:{
      ...mapGetters('wishlist', {
        list: 'listProducts'
      })
    }
}
</script>