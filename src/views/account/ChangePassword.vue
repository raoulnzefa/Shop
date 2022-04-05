<template>
  <div class="px-3 sm:px-10 mx-auto mt-3 sm:w-1/2">
    <loader :loading="loading"/>
    
    <div v-if="!loading">
        <header class="flex my-8 mt-4">
        <router-link :to="{name: 'user-home'}">
        <span class="text-yellow-500 fas fa-2x fa-chevron-circle-left"></span>
        </router-link>
        <h2 class="mx-auto uppercase"> Change Password </h2>
        </header>

        <form class="" @submit.prevent="saveDetails">
          
            <div class="w-full  mb-3">
                <label class="block" for="c-password">Current password</label>
                <input type="text" v-model="c_password" 
                    class="rounded-full w-full" id="c_password" placeholder="Your current password">
            </div>

            <div class="w-full  mb-3">
                <label class="block" for="new_password">New password</label>
                <input type="text" v-model="new_password"  class="w-full rounded-full" 
                id="new_password" placeholder="Your new password">
            </div>

             <div class="w-full mb-3">
                <label class="block" for="confirm_password">Confirm password</label>
                <input type="text" v-model="confirm_password" class="w-full rounded-full" 
                    id="new_password" placeholder="Confirm new password">
            </div>
          
            <hr class="my-2">

            <button type="submit"
            class="uppercase hover:bg-yellow-400 hover:text-gray-500 
            bg-yellow-500 py-3 w-full rounded mt-2">
                Change Password
            </button>
            
        </form>
    </div>

    <notification/>
  </div>
</template>

<script>
import notification from '@/components/Notification.vue'
export default{
    name: 'Profile',
    data(){
        return {
            loading: false,
            first_name:'',
            last_name:'',
            email:'',
            phone:'',
            address_1:'',
            state:'',
            city:'',
      }
    },
    mounted(){
        document.title = `CHANGE PASSWORD | ${this.$appName}`
        var vm = this
        const user = this.$store.getters['user/getUser'].ID

        window.$http.get(`${window.$wc}customers/${user}`)
        .then(({data}) => {
            // console.log(data)
            vm.first_name = data.first_name
            vm.last_name = data.last_name
            vm.email = data.email

            vm.phone = vm.getMeta(data.meta_data, 'phone')

            vm.state = vm.getMeta(data.meta_data, 'state')

            vm.city = vm.getMeta(data.meta_data, 'city')

            vm.address_1 = vm.getMeta(data.meta_data, 'address')

        }).catch(error => {
            console.log(error.toString())
        }) 
    },

    methods:{
        saveDetails(){
            var vm = this
            if(this.first_name != '' && this.last_name != '' 
            &&  this.email != '' && this.phone != '' && this. state != ''
            && this.city != '' && this.address_1 != ''){
                const user = this.$store.getters['user/getUser'].ID
                var data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    // phone: this.phone,
                    meta_data: [
                        {key:'phone', value:this.phone}, 
                        {key:'state', value:this.state},
                        {key:'city', value:this.city},
                        {key:'address', value:this.address_1},
                    ],
                }
                vm.loading = true
                window.$http.put(`${window.$wc}customers/${user}`, data)
                .then(() => {
                    vm.loading = false
                    vm.$flash('Update successful!', 'green-500');
                    // console.log(data)
                }).catch(error => {
                    console.log(error.toString())
                })       
            }
        },

        getMeta(data, key){
            // var value;
            // data.forEach(datum => {
            //     if(datum.key == key){
            //         return datum.value
            //     }
            // });
            for (let index = 0; index < data.length; index++) {
                const datum = data[index];
                if(datum.key == key){
                    return datum.value
                }
            }
        }
    },
    components:{
        notification
    }
  }
</script>