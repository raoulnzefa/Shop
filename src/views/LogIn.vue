<template>
    <div style="height:auto;max-width:500px" class="w-full">
        <div class="w-full p-3 shadow mx-auto rounded border border-gray-200">
            <h1 class="mb-6 text-center uppercase pb-2">
            Log in
            </h1>
        
            <form @submit.prevent="submit">
                <div class="border border-red-400 text-red-500 rounded p-1 text-center my-7"  v-show="error">
                    <p class="py-1">
                        {{error}}
                    </p>
                </div>
                <!-- {{ errors }} -->
            

                <!-- <div class="flex flex-col sm:flex-row mb-5"> -->
                    <in-put type="text" class_label="sr-only" 
                    open_class="border-yellow-500" input_id="email"
                    input_name="Email" v-model="username" 
                    main_class="mb-6" />

                    <in-put type="password" class_label="sr-only" 
                    input_id="password" open_class="border-yellow-500"
                    input_name="Password" v-model="password" 
                    main_class="mb-3" />
                <!-- </div> -->

                <button :disabled="loading" :style="loading?'cursor:not-allowed':''" 
                :class="loading?'bg-yellow-200':'bg-yellow-400 hover:bg-yellow-500'" 
                type="submit" id="submitBtn" class="rounded uppercase py-1 w-full mt-6">
                    <template v-if="!loading">
                        Log in
                    </template>
                    <template v-else>
                        Loading...
                    </template>
                </button>
            </form>


            
            
            <!-- <hr class="my-4 border border-gray-200"/> -->

            <!-- <div>
                <p class="text-center uppercase text-gray-400 font-bold">log in with</p>
                <div class="flex justify-between items-center">
                <g-login class="mr-1"></g-login>
                <fb-login class="ml-1"></fb-login> -->
                <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -125px;background-size:cover`"></a> -->
                <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -309px;background-size:cover`"></a> -->
                <!-- </div>
            </div> -->
        </div>

        <div class="flex justify-between items-center text-gray-400 mt-3 font-bold">
            <router-link class="hover:text-gray-500" :to="{name:'home'}">
                Go home
            </router-link>

            <router-link class="hover:text-gray-500" :to="{name:'f-password'}">
                Forgot password?
            </router-link>
        </div>
        
    </div>
</template>
<script>
// import FbLogin from '@/components/auth/socials/FacebookLogin.vue'
// import GLogin from '@/components/auth/socials/GoogleLogin.vue'
import InPut from '@/components/Input.vue'
export default {
    name: 'LogIn',
    data(){
        return {
            username : '',
            password : '',
            error : '',
            t_pass: 'password',
            loading: false
        }
    },

    mounted(){
        var vm = this
        document.title = `Log In | ${this.$appName}`

        document.getElementsByTagName('input').forEach(el => {
            el.onfocus = ()=>{
                vm.error = ''
                el.classList.remove('border', 'border-red-500')
            }
        });
    },

    methods:{
        submit(){
            var vm = this
            if(this.username && this.password){
                vm.loading = true
                window.$http.post(`${window.$elektro}login`, 
                { username: this.username, password: this.password }).then(({data}) => {
                    vm.loading = false
                    if(data.code != 'invalid_detail'){
                        // vm.$flash('Login successful!', 'success');
                        this.$store.commit('user/SET_USER', data.data)
                        this.$router.replace(this.$route.query.redirect || { name : 'user-home' })
                    } else {
                        vm.error = data.message
                    }  
                }).catch(error => {
                        vm.error = error.toString()
                })
            } else {
                if(!this.username){
                    document.getElementById('username').classList.add('border', 'border-red-500')
                    document.getElementById('open_user').classList.add('border', 'border-red-500')
                }
                if(!this.password){
                    document.getElementById('password').classList.add('border', 'border-red-500')  
                    document.getElementById('open_pass').classList.add('border', 'border-red-500')  
                }
            }
        },

        toggle_pass(){
            if(this.t_pass == 'password')
                this.t_pass = 'text'
            else
                this.t_pass = 'password'
        },
       
        focus(){
            document.getElementById('username').classList.remove('border', 'border-red-500')
            document.getElementById('password').classList.remove('border', 'border-red-500')
            this.errors = ''
        },
    },

    components:{
        // GLogin,
        // FbLogin,
        InPut
    }
}
</script>

<style>
    hr {
        margin-top: auto;
        margin-bottom: auto;
        border: 2px solid #6c757d;
        border-top: none;
        width: 100%;
        border-radius: 2000px !important
    }
    #submitBtn:active {
        background-color: rgb(224, 178, 26);
    }
</style>
