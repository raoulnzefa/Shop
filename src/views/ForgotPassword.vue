<template>
    <div style="max-width:500px" class="w-full px-3">
        <form class="px-5 mx-auto shadow border border-gray-200 rounded py-5"  @submit.prevent="submit">
            <h1 
            class="mb-5 text-center uppercase pb-2">
            Forgot password
            </h1>
            
            <div id="loading" class="p-2 mx-auto my-5 round bg-green-400 text-black text-center" 
            v-if="loading">Loading...</div>
            
            <p class="bg-red text-white mt-4 rounded p-2 text-center" v-if="error">{{ error }}</p>
            
            <in-put type="email" class_label="sr-only" 
                    open_class="border-yellow-500" input_id="email"
                    input_name="Email" v-model="email" 
                    main_class="my-6" />
            <button type="submit" id="submitBtn" :disabled="loading"
            class="rounded uppercase hover:bg-yellow-400 bg-yellow-500 w-full py-1">
            
            <template v-if="!loading">
                Send Reset Link
            </template>
            <template v-else>
                Loading...
            </template>
            </button>
        </form>

        <div class="flex justify-between items-center text-gray-400 mt-3 font-bold">
            <router-link :to="{name:'home'}">
                Go home
            </router-link>

            <router-link :to="{name:'login'}">
                Log in
            </router-link>
        </div>
        
    </div>
</template>

<script>
import InPut from '@/components/Input.vue'
export default {
    name: 'FP',
    data(){
        return {
            loading: false,
            email : '',
            error: ''
        }
    },

    components:{
        InPut
    },

    mounted(){
        document.title = `Forgot Password | ${this.$appName}`
    },
    methods:{
        submit(){
            if(this.username){            
                var vm = this
                vm.loading = true
                window.$http.post(`elektro/v1/fp`, { user_login: this.username })
                .then(({ data }) => {
                    vm.loading = false

                    console.log(data)
                    document.getElementById('loading').classList.remove('bg-green-500') 
                    document.getElementById('loading').classList.add('bg-yellow-500') 
                    document.getElementById('loading').innerHTML = JSON.parse(data).message
                }).catch(error => {
                    console.log(error.toString())
                })
            } else {
                if(!this.username)
                    document.getElementById('username').classList.add('border', 'border-red-500')
            }
        },
       
        clear(){
            document.getElementById('username').classList.remove('border', 'border-red-500')
            this.error = ''
        },
    }
}
</script>

<style>
    #submitBtn:active {
        background-color: rgb(224, 178, 26);
    }
</style>
