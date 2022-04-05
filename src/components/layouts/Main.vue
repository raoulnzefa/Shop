<template>
    <div class="flex flex-col w-full h-full">

      <nav-bar />

      <slot />
      
      <footer id="footer" style="z-index:500" class="bg-gray-100 w-full shadow">
        <div style="line-height:1" 
          class="block sm:hidden flex justify-between px-3 pt-2 border-b border-gray-300">
          <router-link class="text-decoration-none flex-col flex uppercase" :to="{name:'shop'}">
            <div  style="font-size:25px !important">
              <span class="fas fa-store"></span>
            </div>
            <span class="font-bold text-xs sm:text-lg">Shop</span>
          </router-link>

          <router-link class="text-decoration-none text-center flex-col flex uppercase" 
            :to="{name:'wish-list'}">
            <div  style="font-size:25px !important">
              <span class="fas fa-heart"></span>
            </div>
            <span class="font-bold text-xs sm:text-lg">Wishlist</span>
          </router-link>

          <router-link class="relative flex flex-col
            text-decoration-none uppercase" :to="{ name: 'cart' }">
            <div style="font-size:25px">
              <span class="fas fa-shopping-cart"></span>
            </div>
            <span class="font-bold text-xs sm:text-lg">Cart</span>
            <span style="z-index:500;right:15px;top:-8px; height:21px;width:21px;border-radius:50%" 
              class="shadow text-white absolute flex items-center justify-center bg-red-400 p-3">
              {{$store.getters['cart/cartQuantity']}}
            </span>
          </router-link>
        </div>
        <p class="text-center py-1">&copy; {{(new Date()).getFullYear()}} | {{$appName}}&reg;</p>
      </footer>  
    </div>
</template>

<script>
import NavBar from '@/components/layouts/NavBar'
// import { mapState } from 'vuex'
export default {
  components:{
    NavBar,
  }
}
</script>

<style>
  .off-canvas-navigation {
    /* background-color: #333; */
    position: fixed;
    top: 0;
    left: -270px;
    width: 270px;
    height: 100vh;
    transition: all .4s;
    border-right: 10px solid #6c757d ;
    z-index: 40000;
    overflow: hidden;
    overflow-y: auto;
  }
  .off-canvas-navigation .nav-link:hover, .off-canvas-navigation .nav-link:focus{
    color:#9ba1a6 !important
  }
   .off-canvas-navigation .router-link-exact-active{
     color:#9ba1a6 !important
  }
  .open-nav{
    left: 0 !important
  }

  /* .search-board{
    position: fixed;
    width: 100%;
    background:#ffc107e3;
    top: 70px;
    height: 100vh;
    z-index: 30000;
  } */

  /* .open-nav + main{
    margin-left: 250px;
  } */
</style>