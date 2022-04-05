<template>
    <div class="px-3 sm:px-10">
        <h1 class="text-gray-400  text-center uppercase border-b border-gray-400  pb-2 font-bold my-10">
          Your recently viewed items
        </h1>
            
        <div v-if="views.length" class="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap">
            <div class="w-full sm:w-1/5 p-1" 
                v-for="product in views" :key="product.id">
                <product-data :product="product"/>
            </div>
        </div>
                  
        <p v-if="!views.length" 
            class="p-2 w-75 mx-auto px-3 text-center 
            rounded bg-warning text-dark"> 
            No items viewed
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Viewitem',
    mounted(){
      console.log(this.$route.name)
    },
  
    computed:{
      ...mapGetters('wishlist', {
        views: 'viewProducts'
      })
    }
}
</script>