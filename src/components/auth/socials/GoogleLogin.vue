<template>
    <button @click="Signin" class="flex 
    justify-center items-center bord-2 border-red-500 rounded
     p-0 w-full block">
        <p :style="`width:40px;height:40px;
            background: url(${$publicPath}social-icon.png) no-repeat 1px -46px;
            background-size:cover`" class="mb-0">
        </p>
        <!-- <p class="my-0">Google</p> -->
    </button>
</template>

<script>
    import jwtDec from 'vue-jwt-decode'
    export default{
        mounted(){
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id; 
                js.src = "https://accounts.google.com/gsi/client";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'google-jssdk'));

            window.onload = function() {
                window.google.accounts.id.initialize({
                    client_id: '982433444691-bbgfs6j55dsafmgrdfb84vq4nag82fa7.apps.googleusercontent.com',
                    callback: function(response){
                        console.log(jwtDec.decode(response.credential));
                    }
                });
                window.google.accounts.id.prompt();
            }
        },

        methods:{
            Signin() {
                var vm = this
                // window.gapi.load('auth2', function() {
                //     window.gapi.auth2.init({
                //         client_id: '982433444691-bbgfs6j55dsafmgrdfb84vq4nag82fa7.apps.googleusercontent.com'
                //     }).signIn().then(googleUser => {
                //         const user = googleUser.getBasicProfile()
                //         const name = user.getName().split(" ")
                //         const payload = {
                //             email: user.getEmail(),
                //             last_name: name[1],
                //             first_name: name[0]
                //         }

                //         window.$http.post('deshopastore/v1/get_user_by', { email: user.getEmail() })
                //         .then(({ data }) => {
                //             if(data === false){
                //                 window.$http.post(`${window.$wc}customers`, payload).then(({data}) => {
                //                     vm.$store.commit('user/GO_SET_USER', data.data)
                //                     vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                //                 })
                //             } else {
                //                 vm.$store.commit('user/SET_USER', data.data)
                //                 vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                //             }
                //         })
                //     });
                // }) 
                
                // document.getElementById('google-jssdk').onload = () => {
                
                    window.google.accounts.id.initialize({
                        client_id: '982433444691-bbgfs6j55dsafmgrdfb84vq4nag82fa7.apps.googleusercontent.com',
                        callback: function(response){
                            console.log(jwtDec.decode(response.credential));
                            const payload = jwtDec.decode(response.credential);
                            window.$http.post(`${window.$elektro}get_user_by`, { email: payload.email })
                            .then(({ data }) => {
                                console.log(data)
                                if(data === false){
                                    const customer = {
                                        email: payload.email,
                                        last_name: payload.family_name,
                                        first_name: payload.given_name
                                    }
                                    window.$http.post(`${window.$wc}customers`, customer).then(({data}) => {
                                        vm.$store.commit('user/GO_SET_USER', data.data)
                                        vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                                    })
                                } else {
                                    vm.$store.commit('user/SET_USER', data.data)
                                    vm.$router.push(vm.$route.query.redirect || { name : 'home' })
                                }
                            })
                        }
                    });
                    window.google.accounts.id.prompt();
                // }
            },
        }
    }
</script>
