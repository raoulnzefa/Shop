<template>
    <a @click.prevent="logOut" href="#">
      <!-- Log out -->
      <slot/>
    </a>
</template>
<script>
  export default {
    mounted(){
      switch(this.$store.getters['user/isAuthVia']){
        
        case 'facebook':
           (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            window.fbAsyncInit = function() {
                window.FB.init({
                    appId      : '2672114229720250',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v7.0'
                })
            };
            break;
          case 'google':
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://apis.google.com/js/platform.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'google-jssdk'));

            document.getElementById('google-jssdk').onload = () => {
                window.gapi.load('auth2', function() {
                    window.gapi.auth2.init({
                        client_id: '334198792867-7egvu0v3i5f80pl32d0eqafn37vjebaq.apps.googleusercontent.com'
                    })
                })
            }
            break;    

      }
    },

    methods:{
      logOut(){
        switch(this.$store.getters['user/isAuthVia']){
          case 'facebook':
            this.fbLogout()
            break;
          case 'google':
            this.gLogout()
            break;
          case 'me':
            this.mLogout()
            break;  
        }
      },

      fbLogout(){
        var vm = this
        window.FB.logout(()=>{
          vm.$store.commit('user/UNSET_USER')
          vm.$router.replace({ name : 'home' })
        })
      }, 
      gLogout(){
        var vm = this, auth2 = window.gapi.auth2.getAuthInstance();

        auth2.signOut().then(() => {
          vm.$store.commit('user/UNSET_USER')
          vm.$router.replace({ name : 'home' })
        });
      }, 
      mLogout(){
        this.$store.commit('user/UNSET_USER')
        this.$router.replace({ name : 'home' })
      }
    }
  }
</script>
