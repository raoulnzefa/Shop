<template>
    <div>
        <form @submit.prevent="submit">
            <div class="bg-red-400 text-white rounded p-1 text-center"  v-if="errors.length">
                <p class="py-1 my-1" v-for="(error, index) in errors" :key="index">
                    <span v-html="error"></span>
                </p>
            </div>
            <!-- {{ errors }} -->
            <div class="mb-5">
                <label class="block" for="username">Email address</label>
                <input type="text" id="username" @focus="clear" 
                class="w-full rounded py-2" 
                v-model="username" aria-describedby="emailHelp" placeholder="Email address or Username">
            </div>
            <div class="mb-3">
                <label class="block" for="password">Password</label>
                <input type="password" @focus="clear" id="password" 
                class="rounded w-full py-2" v-model="password" placeholder="Password">
            </div>
            <button type="submit" id="submitBtn" class="rounded
            hover:bg-yellow-400 bg-yellow-500 font-bold uppercase py-2 w-full">Log in</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'LogIn',
    data(){
        return {
            username : '',
            password : '',
            errors : '',
        }
    },

    mounted(){
        document.title = `Log In - ${this.$appName}`
    },

    methods:{
        submit(){
            var vm = this
            if(this.username && this.password){
                window.$http.post(`elektro/v1/login`, { username: this.username, password: this.password })
                .then(({ data }) => {
                    console.log(data)
                    if(!data.error){
                        // this.$flash('Login successful!', 'success');
                        this.$store.commit('user/SET_USER', data.data)
                        this.$router.replace(this.$route.query.redirect || { name : 'dashboard' })
                    } else {
                        vm.errors = data.error
                    }
                }).catch(error => {
                    console.log(error.toString())
                })
            } else {
                if(!this.username)
                    document.getElementById('username').classList.add('border', 'border-red-500')
                if(!this.password)
                    document.getElementById('password').classList.add('border', 'border-red-500')  
                
            }
        },
       
        clear(){
            document.getElementById('username').classList.remove('border', 'border-red-500')
            document.getElementById('password').classList.remove('border', 'border-red-500')
            this.errors = ''
        },
    },
}
</script>

<style>
    /* #submitBtn:active {
        background-color: red;
    } */
</style>
