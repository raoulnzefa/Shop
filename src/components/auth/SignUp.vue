<template>
    <div>
        <form @submit.prevent="submit">   
            <ul v-if="errors.length" class="bg-red-500 
            p-2 rounded text-white my-4 list-unstyled">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
            
            <div class="flex flex-col sm:flex-row mb-3">
                <div class="w-full sm:w-1/2 mr-0 sm:mr-1">
                    <label class="block" for="first_name">First name</label>
                    <input type="text" @focus="clear" class="rounded w-full py-2" id="first_name" 
                    v-model="first_name" autofocus placeholder="Joe">
                </div>
                <div class="w-full sm:w-1/2 ml-0 sm:ml-1">
                    <label class="block" for="last_name">Last name</label>
                    <input type="text" @focus="clear" class="rounded w-full py-2" id="last_name" 
                    v-model="last_name" placeholder="Smith">
                </div>
            </div>

            <div class="flex flex-col sm:flex-row mb-3">
                <div class="w-full sm:w-1/2 mr-0 sm:mr-1">
                    <label for="email">Email address</label>
                    <input type="email" id="email" @focus="clear"
                    @change="email_exists" class="rounded w-full py-2" v-model="email" placeholder="joesmith@gmail.com">
                </div>
                <div class="w-full sm:w-1/2 ml-0 sm:ml-1">
                    <label for="phone">Phone number</label>
                    <input type="text" @change="is_a_number" @focus="clear"
                    class="rounded w-full py-2" id="phone" 
                    v-model="phone" placeholder="07082683086">
                </div>
            </div>
            <div class="flex flex-col sm:flex-row mb-3">
                <div class="w-full sm:w-1/2 mr-0 sm:mr-1">
                    <label for="password">Password</label>
                    <input type="password" @focus="clear" class="rounded w-full py-2" 
                    id="password" v-model="password" placeholder="Password">
                </div>
                <div class="w-full sm:w-1/2 ml-0 sm:ml-1">
                    <label for="c_password">Confirm password</label>
                    <input @focus="clear" type="password" 
                    class="rounded w-full py-2"
                     @keyup="password_mismatch" 
                     v-model="c_password" placeholder="Confirm password">
                </div>
            </div>
            <button type="submit" 
            class="hover:bg-yellow-400 bg-yellow-500 rounded py-2 font-bold w-full uppercase">Create an account</button>
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
    </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return {
            email: '',
            phone: '',
            errors: [],
            password: '',
            last_name: '',
            first_name: '',
            c_password: '',
        }
    },
    mounted(){
        document.title = `Register - ${this.$appName}`
    },
    methods:{
        email_exists(){
            let email = document.getElementById('email')
            this.$http.post('deshopastore/v1/exists', { email : this.email }).then( user => {
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
                window.$http.post(window.$wc+'customers', cred).then(({data}) => {
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
    }
}
</script>
