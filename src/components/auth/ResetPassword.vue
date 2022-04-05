<template>
    <div>
        <form class="mt-5 px-3" style="max-width: 400px;margin: 0 auto" @submit.prevent="submit">
            <h2 style="border-bottom-width: 2px !important" 
            class="mb-5 text-center border-bottom border-warning pb-1">
            Create new password
            </h2>
            
            <div id="loading" class="p-2 mx-auto my-5 round bg-success text-white text-center" v-if="loading">Loading...</div>
            
            <p class="bg-danger text-white mt-4 round p-2 text-center" v-if="error">{{ error }}</p>
            
            <div class="form-group">
                <label for="newpassword" class="sr-only">New password</label>
                <input type="text" id="newpassword" @focus="clear" class="round form-control py-1" v-model="newpassword" aria-describedby="emailHelp" placeholder="New password">
            </div>

            <div class="form-group">
                <label for="confirmpassword" class="sr-only">Confirm new password</label>
                <input type="text" id="confirmpassword" class="round form-control py-1" v-model="confirmpassword" aria-describedby="emailHelp" placeholder="Confirm password">
            </div>
            <button type="submit" id="submitBtn" class="round btn btn-warning btn-block">Reset password</button>
        </form>
    </div>
</template>
<script>

export default {
    name: 'ResetPassword',
    data(){
        return {
            loading: false,
            newpassword : '',
            confirmpassword : '',
            error: ''
        }
    },

    mounted(){
        document.title = `Reset Password - ${this.app_name}`
    },
    methods:{
        submit(){
            if(this.newpassword){            
                var vm = this
                vm.loading = true
                this.$http.post('deshopastore/v1/resetpassword', { newpassword: this.newpassword }, { params: this.$route.query })
                .then(({ data }) => {
                    if(JSON.parse(data).message == 'Invalid key.'){
                        vm.error = JSON.parse(data).message;
                        return;
                    }    
                    document.getElementById('loading').classList.remove('bg-success') 
                    document.getElementById('loading').classList.remove('text-white') 
                    document.getElementById('loading').classList.add('bg-warning') 
                    document.getElementById('loading').classList.add('text-dark') 
                    document.getElementById('loading').innerHTML = JSON.parse(data).message
                    vm.$router.push(this.$route.query.redirect || { name : 'home' })
                }).catch(error => {
                    console.log(error.toString())
                })
            } else {
                if(!this.newpassword)
                    document.getElementById('username').classList.add('border', 'border-danger')
            }
        },
       
        clear(){
            document.getElementById('newpassword').classList.remove('border', 'border-danger')
            this.error = ''
        },
    }
}
</script>

<style>
    #submitBtn:active {
        background-color: red;
    }
</style>
