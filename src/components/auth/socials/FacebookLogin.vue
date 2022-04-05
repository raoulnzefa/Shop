<template>
    <button @click="checkLoginState" 
    class="flex justify-center items-center borde-2 rounded border-blue-500 
        w-full block mt-0 p-0">
        <p :style="`width:40px;height:40px;
            background: url(${$publicPath}social-icon.png) no-repeat 0 0;background-size:cover`"
            class="mb-0">
        </p>
        <!-- <p class="my-0">Facebook</p> -->
        <!-- <span class="fab fa-facebook"></span> Facebook -->
    </button>
    <!-- <a href="#" @click="checkLoginState"> <slot></slot></a> -->
</template>

<script>
    export default{
        name: 'FBLogin',
        data(){
            return{
                user: null,
            }
        },

        mounted(){
            // this.checkLoginState();
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            window.fbAsyncInit = function() {
                window.FB.init({
                    appId   : '233916848692135',
                    cookie  : true,
                    xfbml   : true,
                    version : 'v7.0'
                })
            };
        },

        methods:{
            statusChangeCallback(response) {
                var vm = this
                if (response.status === 'connected') {
                  vm.getUserData();
                } else {
                //   document.getElementById('status').innerHTML = 'Please log into this webpage.';
                }
            },

            getUserData() {
                var vm = this
                window.FB.api('/me/', 'GET', {"fields":"id, email, first_name, last_name"}, function(response) {
                    var payload = {
                        email: response.email,
                        last_name: response.last_name,
                        first_name: response.first_name
                    }

                    window.$http.post(`${window.$elektro}get_user_by`, { email: response.email })
                    .then(({data}) => {
                        if(data === false){
                            window.$http.post(`${window.$wc}customers`, payload).then(({data}) => {
                                vm.$store.commit('user/FB_SET_USER', data.data)
                                vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                            })
                        } else {
                            vm.$store.commit('user/SET_USER', data.data)
                            vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                        }
                    })
                })
            },

            checkLoginState() {
                var vm = this
                window.FB.login(function(response) {
                    vm.statusChangeCallback(response)
                }, {scope: 'public_profile,email', return_scopes: true})
                return false;
            },
        }
    }
</script>