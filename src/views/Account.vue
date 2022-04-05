<template>
  <!-- <div> -->
    <!-- <div v-if="$store.getters['user/isLoggedIn']">
      <accounts></accounts>
    </div>  -->
    <div class="account py-2 px-3 shadow mx-auto rounded mt-5 mb-10">
      <div>
        <p class="text-center my-3 uppercase text-gray-400 font-bold">log in with</p>
        <div class="flex justify-between items-center">
          <g-login></g-login>
          <fb-login></fb-login>
          <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -125px;background-size:cover`"></a> -->
          <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -309px;background-size:cover`"></a> -->
        </div>
      </div>

      <div class="flex my-4 text-gray-600 font-bold justify-between items-center">
        <hr>
        <p class="mb-0 mx-2 font-italic">OR</p>
        <hr>
      </div>
      <!-- <hr> -->
      <ul class="flex mt-3 justify-around text-center uppercase font-bold list-unstyled">
        <li v-for="tab in tabs"
          v-bind:key="tab"
          v-on:click="currentTab=tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          class="text-gray-400 w-1/2 pb-2">
          {{ tab }}
        </li>
      </ul>
      <component class="tab my-5" v-bind:is="currentTabComponent"></component>
      <router-link :to="{ name: 'f-password'}" class="mt-3 text-dark text-decoration-none">Forgot Password?</router-link>
    </div> 
  <!-- </div> -->
</template>

<script>
  import FbLogin from '@/components/auth/socials/FacebookLogin.vue'
  import GLogin from '@/components/auth/socials/GoogleLogin.vue'
  import login from '@/components/auth/LogIn.vue'
  import register from '@/components/auth/SignUp.vue'
  // import accounts from '@/components/auth/Account.vue'
  export default{
    name: 'account',
    data(){
      return {
        currentTab: 'login',
        tabs: ['login', 'register']
      }
    },
    computed: {
      currentTabComponent: function () {
        return this.currentTab.toLowerCase()
      }
    },
    components:{
      register, 
      login,  
      FbLogin, 
      GLogin, 
      // accounts
    }
  }
</script>

<style>
  .terms{
    font-size: 12px;
    line-height: 16px;
    text-align: center;
  }
  .account {
    max-width: 450px;
  }
  .tab-button.active {
    border-bottom: 3px solid orange;
  }
  .tab-button{
    cursor: pointer;
  }


/* hdhdhdh */ 
/* .sidebar {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}


.sidebar .nav-link.active {
  color: #007bff;
} */

hr {
    margin-top: auto;
    margin-bottom: auto;
    border: 2px solid #6c757d;
    border-top: none;
    width: 100%;
    border-radius: 2000px !important
}
</style>

