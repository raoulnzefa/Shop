<template>
  <div>
  <!-- <router-link :to="{ name: 'address'}">Address</router-link> -->
  <form @submit.prevent="changePassword">
    <p class="bg-dark round py-1 mb-3 text-white text-center font-weight-bold">Password change </p>
        <ul v-if="errors.length" class="bg-danger p-2 rounded text-white my-4 list-unstyled">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
        <div class="form-group">
            <label for="first_name">Current password (leave blank to leave unchanged)</label>
            <input type="password" @focus="clear" @change="checkPassword" class="form-control round" v-model="current_password" placeholder="">
        </div>
        <div class="form-group">
            <label for="last_name">New password (leave blank to leave unchanged)</label>
            <input type="password" id="new_password" class="form-control round" v-model="new_password">
        </div>
        <div class="form-group">
            <label for="last_name">Confirm password</label>
            <input type="password" @keyup="password_mismatch" class="form-control round" v-model="confirm_password">
        </div>

    <button type="submit"  class="btn btn-bloc round btn-success font-weight-bold text-uppercase"> Save changes</button>
  </form>
  </div>
</template>

<script>
    export default{
        name: 'PasswordChange',
        data(){
            return {
                current_password:'',
                new_password:'',
                confirm_password: '',
                errors:[]
            }
        },
        methods:{
            checkPassword(){
                var vm = this
                this.$http.post('deshopastore/v1/login', { username: this.$store.getters['user/getUser'].user.data.user_email, password: this.current_password })
                .then(({ data }) => {
                    if(typeof data === 'string'){
                        vm.errors.push(data) //push in error message from server
                        console.log(data)
                    }
                })
                
            },
            clear(){
                document.querySelector('[type="password"]').classList.remove('border', 'border-danger')
                this.errors = []
            },

            password_mismatch(event){
                // let password = document.querySelector('#[type="password"]')
                // let password = document.getElementById('new_password')
                if(this.new_password !== this.confirm_password){
                    this.errors.pop()
                    this.errors.push('Password mismatch')
                    event.target.classList.add('border', 'border-danger')
                } else {
                    this.errors.pop()
                    event.target.classList.remove('border', 'border-danger')
                }
            },
            changePassword(){
                if(!this.errors.length){
                    var vm = this
                    vm.loading = true
                    const user = this.$store.getters['user/getUser'].user.data.ID || this.$store.getters['user/getUser'].user.data.id
                    this.$http.put(this.$wc +'customers/'+ user, { password: vm.new_password })
                    .then(({data}) => {
                        vm.loading = false
                        console.log(data)
                    }).catch(error => {
                        console.log(error.toString())
                    })
                }
            },
        }
    }
</script>
