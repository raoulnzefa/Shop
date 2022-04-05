<template>
    <div class="w-full m-auto">
        <div style="top:0;padding-top:120px"
            class="border- bg-gray-100 w-full h-screen fixed pl-3 p-6 sm:pl-8 sm:w-1/5 md:w-1/5 lg:w-1/5" 
            :class="[$route.name != 'user-home'? 'hidden sm:block' : '']">
                <ul class="list-none">
                    <li>
                        <router-link class="text-black text-lg 
                        hover:text-gray-700 font-bol" 
                        :to="{name: 'orders'}"> Orders</router-link>
                    </li>

                    <li>
                        <router-link class="text-black text-lg 
                        hover:text-gray-700 font-bol"  
                        :to="{name:'account-wishlists'}"> Wishlist</router-link>
                    </li>
                        
                    <li>
                        <router-link 
                        class="text-black text-lg 
                        hover:text-gray-700 font-bod" 
                        :to="{name:'account-view-items'}"> Viewed items</router-link>
                    </li>
                </ul>

                <h2 class="mt-10 border-b border-gray-300">SETTING</h2>
                <ul class="list-none">
                    <li>
                        <router-link class="text-black text-lg 
                        hover:text-gray-700 font-bld"  
                        :to="{name:'profile'}">Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link class="text-black text-lg 
                        hover:text-gray-700 font-bld"  
                        :to="{name:'profile'}">Address
                        </router-link>
                    </li>
                </ul>
        </div>

        <!-- <div class="flex flex-wrap">  -->
        <main class="ml-auto w-full p-3 sm:w-4/5"
                :class="[$route.name != 'account'? '':'hidden sm:block']">
                <router-view></router-view>
        </main>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    name:'account',
    mounted(){
        document.title = `Account | ${this.$appName}`
    }
}
</script>