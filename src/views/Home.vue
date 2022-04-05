<template>
  <div>
    <div class="image-box" style="--image-url('/img/logo.png')">
      <h1 class="font-bold mb-3 ">This is {{$appName}}&reg;</h1>
      <p>Online clothing store</p>
    </div>

    <!-- product area -->
    <!-- <div class="flex flex-col sm:px-10 px-3 py-5 sm:flex-row flex-nowrap sm:flex-wrap">
      <div class="w-full lg:w-1/5 md:w-3/12 sm:w-4/12 p-1 pb-3" 
        v-for="product in $store.state.products.all" :key="product.id">
        <product-data :product="product"/>
      </div>
    </div> -->
    <div class="col-md-9">
      <div class="mb-5 pb-3" 
            v-for="category in $store.getters['products/getParentCategories']" :key="category.id">
            <!-- #0062bd, -->
            <!-- style="background-image: linear-gradient(to right, #ffc107, #fff);" -->

            <h2 style="background-image: linear-gradient(to right, #343a40, #fff);"
            class="mb-1 px-2 mx-0 py-1 w-100 flex justify-between">
              <span class="text-white" v-html="category.name"></span>

              <router-link class="text-gray-500 my-auto pb-0 text-decoration-none"
                style="font-size: 16px"
                :to="{ name: 'category', params: { slug: category.slug }}">
                View all...
              </router-link>
            </h2>
            <latest-products :limit="6" :category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import latestProducts from '@/components/LatestProduct'

export default {
  name: 'Home',
  components:{
    latestProducts
  },

  mounted(){
    document.title = this.$appName
  }
}
</script>

<style scoped>
.image-box {

  /* Here's the trick */
  background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)) , url(/img/logo.png) no-repeat center center;
  background-size: contain;


  /* Here's the same styles we applied to our content-div earlier */
  color: white;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media (max-width:600px) {
  .image-box{
    min-height: 30vh;
  }
}
</style>
