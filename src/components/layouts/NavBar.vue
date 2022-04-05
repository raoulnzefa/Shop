<template>
  <div id="navbar-menu" style="z-index:300" class="position-relative w-full shadow">
    <div style="line-height:1" class="flex justify-between 
      items-center sm:px-10 px-3 py-2 bg-gray-100">

        <div class="relative">
          <a v-show="!show" id="menu-trigger" @click.prevent="open"
          class="text-decoration-none flex-col sm:flex-row
            flex items-center" href="#">
            <div style="font-size:25px">
              <span class="fas fa-bars"></span>
            </div>
            <!-- <span class="font-bold sm:font-normal 
            text-xs sm:text-lg block sm:hidden">Menu</span> -->
          </a>

          <a v-show="show" @click.prevent="close"
          class="text-decoration-none flex-col sm:flex-row
            flex items-center" href="#">
            <div class="text-red-500" style="font-size:25px">
              <span class="fas fa-times-circle"></span>
            </div>
            <!-- <span class="font-bold sm:font-normal 
            text-xs sm:text-lg block sm:hidden">Menu</span> -->
          </a>

          <ul id="menu" v-show="show" style="z-index:200;left:0;width:270px;top:52px !important" 
            class="nav-cat rounded p-3 shadow w-full bg-gray-100 absolute">
            <li v-for="(category, index) in $store.state.products.categories" :key="index">
              <router-link :to="{name: 'category', params:{slug: category.slug}}" 
              class="text-black text-lg flex items-center
              hover:text-gray-500">
                {{ category.name }}   
              </router-link>
            </li>
          </ul>
        </div>

        <router-link class="mx-8 text-decoration-none" :to="{ name: 'home' }">
          <!-- {{ $appName }} -->
          <img :src="`${$publicPath}img/logo.png`" style="height:20px;width:60px" alt="logo">
        </router-link>

        <router-link 
        class="hidden hover:text-gray-400 sm:block mx-4 
        text-decoration-none sm:flex items-center" :to="{name: 'shop'}">
          <div class="sm:mr-1" style="font-size:25px !important">
            <span class="fas fa-store"></span>
          </div>
          <!-- <span class="text-xs sm:text-lg">Shop</span> -->
        </router-link>

        <!-- <form class="hidden sm:hidden md:block flex-grow" action="">
          <input type="text" :placeholder="`Search ${$appName}...`" 
          class="rounded-full border border-gray-300 w-full">
        </form> -->

        <div class="hidden sm:hidden md:hidden lg:block flex-grow mx-5">
          <search/>
        </div>  

        <!-- <router-link  class="hidden sm:hidden md:block md:flex ml-4 text-decoration-none 
          items-center uppercase" :to="{ name: 'viewed-items' }">
          <div class="sm:mr-1" style="font-size:25px !important">
           <span class="fas fa-eye"></span>
          </div>
          <span>Viewed Items</span>
        </router-link> -->

        <router-link 
        class="hidden sm:hidden hover:text-gray-400 
        md:block md:flex ml-4 text-decoration-none 
          items-center" :to="{ name: 'wish-list' }">
          <div class="sm:mr-1" style="font-size:25px !important">
           <span class="fas fa-heart"></span>
          </div>
          <!-- <span>Wishlist</span> -->
        </router-link>

        <router-link 
        class="relative hidden sm:block hover:text-gray-400 sm:flex mx-10 
          text-decoration-none items-center" :to="{ name: 'cart' }">
          <div class="sm:mr-1" style="font-size:25px">
           <span class="fas fa-shopping-cart"></span>
          </div>
          <!-- <span>Cart</span> -->
          <span style="z-index:500;left:15px;top:-8px;
          height:21px;width:21px;border-radius:50%" 
          :class="$route.name == 'cart'?'bg-black':'bg-red-400'"
          class="shadow text-white absolute flex 
          items-center justify-center p-3">
            {{$store.getters['cart/cartQuantity']}}
          </span>
        </router-link>

        <div class="relative">
          <a v-show="!account" @click.prevent="account = true"
          class="text-decoration-none hover:text-gray-400  flex-col sm:flex-row
            flex items-center" href="#">
            <div class="sm:mr-1" style="font-size:25px">
              <span class="fas fa-user"></span>
            </div>
            <!-- <span class="font-bold sm:font-normal 
            text-xs sm:text-lg">Account</span> -->
          </a>

          <a v-show="account" @click.prevent="account = false"
          class="text-decoration-none flex-col sm:flex-row hover:text-gray-400 
            flex items-center " href="#">
            <div class="sm:mr-1" style="font-size:25px">
              <span class="fas fa-user"></span>
            </div>
            <!-- <span class="font-bold sm:font-normal 
            text-xs sm:text-lg">Account</span> -->
          </a>

          <ul id="account" 
            v-show="account"
            style="z-index:200;right:0;width:270px" 
            class="nav-cat rounded py-2 px-3 shadow w-full bg-gray-100 absolute">
            <template v-if="!$store.getters['user/isLoggedIn']">
            <li>
              <router-link class="text-black text-lg flex items-center
              hover:text-gray-500" :to="{name:'login'}">
                Log in     
              </router-link>
            </li>
            <li  class="border-t border-b border-gray-200">
              <router-link class="text-black text-lg flex items-center
              hover:text-gray-500" :to="{name:'register'}">
                Register    
              </router-link>
            </li>

            <li>
              <router-link class="text-black text-lg flex items-center
              hover:text-gray-500" :to="{name: 'f-password'}">
                Forgot password?    
              </router-link>
            </li>
            </template>
            <template v-else>
              <li>
                <router-link class="text-black text-lg flex items-center
                hover:text-gray-500 font-bol uppercase" :to="{ name: 'orders' }">
                  Dashboard    
                </router-link>
              </li>
              <li>
                <log-out class="text-black text-lg flex items-center
                hover:text-gray-500 font-bol uppercase">Log out</log-out>
              </li>
            </template>
          </ul>
        </div>
    </div>
    <div class="block lg:hidden flex border-t border-gray-200 items-center 
    flex-grow sm:px-10 px-3 bg-gray-100 py-1">
       <search/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue' 
import LogOut from '@/components/auth/LogOut.vue' 
export default{
  data(){
    return {
      show: false,
      account: false,
      categories:[]
    }
  },

  watch:{
    $route(){
      this.show = false
      this.account = false
    }
  },

  methods:{
    toggle(){
      this.show = !this.show
    },

    open(){
      this.show =  true
    },

    close(){
      this.show =  false
    },

    isOpen(){
      const menu = document.getElementById('menu')
      return menu.style.display == 'none'
    },
  },

  mounted(){
    window.addEventListener('scroll', () => {
      var navbar = document.getElementById('navbar-menu')
      var footer = document.getElementById('footer')
      // var main = document.getElementById('mains')

      var oheight = navbar.offsetHeight
      if (document.body.scrollTop > oheight || document.documentElement.scrollTop > oheight) {
        navbar.classList.add('fixed', 'top-0', 'shadow');
        footer.classList.add('fixed', 'bottom-0', 'shadow');
        // main.style.marginBottom="83px";
        footer.previousElementSibling.classList.add('pb-20')
      } else {
        navbar.classList.remove('fixed', 'top-0', 'shadow');
        footer.classList.remove('fixed', 'bottom-0', 'shadow');
        footer.previousElementSibling.classList.remove('pb-30')
        // main.style.marginBottom="83px";s
      }
    }, true)
    
    const vm = this
    const menu = document.getElementById('menu')
    const account = document.getElementById('account')


    // const menu_trigger = document.getElementById('menu-trigger')

    // window.addEventListener('click', (e) => {
    //   if(vm.show){
    //     if(e.target == menu){
    //       vm.show = false
    //     }
    //   } else {
    //     console.log(vm.show)
    //   }
    // })

    // const menu_trigger = document.getElementById('menu-trigger')
    document.addEventListener('mouseup', (e) => {
      if(!menu.contains(e.target))
        vm.show = false
      
      if(!account.contains(e.target))
        vm.account = false
    })
  },

  components:{
    Search,LogOut
  }
}
</script>