<template>
    <div style="height:auto;max-width:500px" class="w-full">

        <div  class="py-2 px-3 shadow mx-auto rounded border border-gray-200">
            <h1 class="mb-6 text-center uppercase pb-2">
                Sign up
            </h1>
            
            <form @submit.prevent="submit">   
                <ul v-if="errors.length" 
                class="bg-red-500 p-2 rounded text-white my-4 list-unstyled">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
                
                <div class="flex flex-col sm:flex-row mb-5">
                    <in-put type="text" class_label="sr-only" 
                    open_class="border-yellow-500" input_id="first_name"
                    input_name="First name" v-model="first_name" 
                    main_class="w-full sm:w-1/2 mb-4 mr-0 sm:mr-1" />

                    <in-put type="text" class_label="sr-only" 
                    input_id="last_name" open_class="border-yellow-500"
                    input_name="Last name" v-model="last_name" 
                    main_class="w-full sm:w-1/2 mb-4 ml-0 sm:ml-1" />
                </div>

                <div class="flex flex-col sm:flex-row mb-5">
                    <in-put type="email" class_label="sr-only" 
                    open_class="border-yellow-500" input_id="email"
                    input_name="email" v-model="username" @change="email_exists" 
                    main_class="w-full sm:w-1/2 mb-4 mr-0 sm:mr-1" />

                    <in-put type="text" class_label="sr-only" 
                    input_id="phone" open_class="border-yellow-500"
                    input_name="Phone number" v-model="phone" 
                    main_class="w-full sm:w-1/2 mb-4 ml-0 sm:ml-1" />
                </div>

                <div class="flex flex-col sm:flex-row">
                    <in-put type="password" class_label="sr-only" 
                    open_class="border-yellow-500" input_id="password"
                    input_name="Password" v-model="password" 
                    main_class="w-full sm:w-1/2 mb-4 mr-0 sm:mr-1" />

                    <in-put type="password" class_label="sr-only" 
                    input_id="c_password" open_class="border-yellow-500"
                    input_name="Confirm password" v-model="c_password" 
                    main_class="w-full sm:w-1/2 mb-4 ml-0 sm:ml-1" />
                </div>

                <button :disabled="loading" :style="loading?'cursor:not-allowed':''" 
                    :class="loading?'bg-yellow-200':'bg-yellow-400 hover:bg-yellow-500'" 
                    type="submit" id="submitBtn" class="rounded uppercase py-1 mt-6 w-full">
                        <template v-if="!loading">
                            Sign up
                        </template>
                        <template v-else>
                            Loading...
                        </template>
                    </button>
            </form>
            <!-- <div>
                <p class="text-center my-3">Quick log in with</p>
                <div class="d-flex justify-content-around">
                    <a href="#"  style="width:54px;height:54px;background: url(../../../assets/social-icon.png) no-repeat 0 -61px;background-size:cover"></a>
                    <a href="#"  style="width:54px;height:54px;background: url(../../../assets/social-icon.png) no-repeat 0 0;background-size:cover"></a>
                    <a href="#"  style="width:54px;height:54px;background: url(../../../assets/social-icon.png) no-repeat 0 -125px;background-size:cover"></a>
                    <a href="#"  style="width:54px;height:54px;background: url(../../../assets/social-icon.png) no-repeat 0 -309px;background-size:cover"></a>
                </div>
            </div> -->

            <!-- <hr class="my-4 border border-gray-200"/>

                <div>
                    <p class="text-center uppercase text-gray-400 font-bold">log in with</p>
                    <div class="flex justify-between items-center">
                    <g-login class="mr-1"></g-login>
                    <fb-login class="ml-1"></fb-login> -->
                    <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -125px;background-size:cover`"></a> -->
                    <!-- <a href="#" :style="`width:54px;height:54px;background: url(${$publicPath}img/social-icon.png) no-repeat 0 -309px;background-size:cover`"></a> -->
                    <!-- </div> -->
                <!-- </div> -->

        
        </div>

        <div class="flex justify-between items-center text-gray-400 mt-3 font-bold">
            <router-link class="hover:text-gray-500" :to="{name:'home'}">
                Go home
            </router-link>

            <router-link class="hover:text-gray-500" :to="{name:'login'}">
                Log in
            </router-link>
        </div>
    </div>
</template>

<script>
import InPut from '@/components/Input.vue'
// import GLogin from '@/components/auth/socials/GoogleLogin.vue'
// import FbLogin from '@/components/auth/socials/FacebookLogin.vue'

export default {
    name: 'Register',
    data(){
        return {
            username: '',
            phone: '',
            errors: [],
            password: '',
            last_name: '',
            first_name: '',
            c_password: '',
            loading: false,

        }
    },

    mounted(){
        var vm = this
        document.title = `Sign up | ${this.$appName}`

        document.getElementsByTagName('input').forEach(el => {
            el.onfocus = ()=>{
                vm.errors = []
                el.classList.remove('border', 'border-red-500')
            }
        });
    },

    methods:{
        email_exists(){
            let email = document.getElementById('email')
            window.$http.post(`${window.$elektro}exists`, { email : this.email })
            .then( user => {
                if(user.data === 'email_exists'){
                    this.errors.push('User already exists!')
                    email.classList.add('border', 'border-danger')
                } else {
                    this.errors.pop()
                    email.classList.remove('border', 'border-danger')
                }
            })
        },
        is_a_number(){
            let phone = document.getElementById('phone')
            if(isNaN(this.phone)){
                this.errors.push('Provide a valid phone number')
                phone.classList.add('border', 'border-danger')
            } else {
                this.errors.pop()
                phone.classList.remove('border', 'border-danger')
            }
        },

        password_mismatch(){
            let password = document.getElementById('password')
            if(this.password !== this.c_password){
                this.errors.pop()
                this.errors.push('Password mismatch')
                password.classList.add('border', 'border-danger')
            } else {
                this.errors.pop()
                password.classList.remove('border', 'border-danger')
            }
        },

        submit(){
            var vm = this
            if(!this.errors.length&&this.email&&this.last_name&&this.first_name
                &&this.phone&&this.password&&this.password==this.c_password){
                vm.loading = true
                let cred = {
                    email: this.email,
                    password: this.password,
                    last_name: this.last_name,
                    first_name: this.first_name,
                    meta_data: [{'phone':this.phone}]
                }
                window.$http.post(`${window.$wc}customers`, cred).then(({data}) => {
                    (typeof data == 'object') ? this.$store.commit('user/setUser', data.data) : ''
                }).then(() => {
                    if(this.$store.getters['user/isLoggedIn']){
                        document.getElementById('loading').innerHTML = "Account created successfully!"
                        setTimeout(() => {
                            vm.loading = false
                            vm.$router.push(this.$route.query.redirect || { name : 'home' })
                        }, 2000)
                        vm.phone = ''
                    }
                }).catch(error => {
                    console.log(error.toString())
                })
            } else {
                if(!this.firstname)
                    document.getElementById('first_name').classList.add('border', 'border-red-500')
                if(!this.lastname)
                    document.getElementById('last_name').classList.add('border', 'border-red-500')  
                if(!this.email)
                    document.getElementById('email').classList.add('border', 'border-red-500')
                if(!this.phone)
                    document.getElementById('phone').classList.add('border', 'border-red-500')  
                if(!this.password)
                    document.getElementById('password').classList.add('border', 'border-red-500')
            }
        },

        clear(){
            document.getElementById('first_name').classList.remove('border', 'border-red-500')
            document.getElementById('last_name').classList.remove('border', 'border-red-500')
            document.getElementById('email').classList.remove('border', 'border-red-500')
            document.getElementById('phone').classList.remove('border', 'border-red-500')
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

<style scoped>
#submitBtn:active {
    background-color: rgb(224, 178, 26);
}
</style>
