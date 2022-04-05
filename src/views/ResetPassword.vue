<template>
    <div class="px-3">
        <form class="mt-16 px-5 py-8 mx-auto shadow rounded" 
        style="max-width: 400px" @submit.prevent="submit">
            <h2 style="border-bottom-width: 2px !important" 
            class="mb-5 text-center uppercase border-b-2 border-yellow-500 pb-2">
            Create new password
            </h2>
            
            <div id="loading" class="p-2 mx-auto my-5 round bg-green-500 text-white text-center" 
            v-if="loading">Loading...</div>
            
            <p class="bg-red-500 text-white mt-4 round p-2 text-center" v-if="error">{{ error }}</p>
            
            <div class="form-group">
                <label for="newpassword" class="block">New password</label>
                <input type="text" id="newpassword" @focus="clear" class="rounded w-full py-2" 
                v-model="newpassword" aria-describedby="emailHelp" placeholder="New password">
            </div>

            <div class="form-group my-2">
                <label for="confirmpassword" class="block">Confirm new password</label>
                <input type="text" id="confirmpassword" class="rounded w-full py-2" 
                v-model="confirmpassword" aria-describedby="emailHelp" 
                placeholder="Confirm password">
            </div>

            <button type="submit" id="submitBtn" 
            class="rounded py-2 mt-5 uppercase
            hover:bg-yellow-400 bg-yellow-500 w-full">Reset password</button>
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
        document.title = `RESET PASSWORD - ${this.app_name}`
    },
    methods:{
        submit(){
            if(this.newpassword == this.confirmpassword){            
                var vm = this
                vm.loading = true
                this.$http.post('elektro/v1/resetpassword', { newpassword: this.newpassword }, 
                { params: this.$route.query })
                .then(({ data }) => {
                    if(JSON.parse(data).message == 'Invalid key.'){
                        vm.error = JSON.parse(data).message;
                        return;
                    }    
                    document.getElementById('loading').classList.remove('bg-green-500') 
                    document.getElementById('loading').classList.remove('text-white') 
                    document.getElementById('loading').classList.add('bg-yellow-500') 
                    document.getElementById('loading').classList.add('text-dark') 
                    document.getElementById('loading').innerHTML = JSON.parse(data).message
                    vm.$router.push(this.$route.query.redirect || { name : 'home' })
                }).catch(error => {
                    console.log(error.toString())
                })
            } else {
                if(!this.newpassword)
                    document.getElementById('username').classList.add('border', 'border-red-500')
            }
        },
       
        clear(){
            document.getElementById('newpassword').classList.remove('border', 'border-red-500')
            this.error = ''
        },
    }
}
</script>

<style>
    #submitBtn:active {
        background-color: rgb(255, 60, 0);
    }
</style>
