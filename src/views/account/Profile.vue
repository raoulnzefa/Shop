<template>
  <div class="px-3 sm:px-10">
    <loader :loading="loading"/>
    
    <div v-if="!loading">
        <header class="flex my-8 mt-4">
        <router-link :to="{name: 'user-home'}">
        <span class="text-yellow-500 fas fa-2x fa-chevron-circle-left"></span>
        </router-link>
        <h2 class="mx-auto uppercase"> Your Profile </h2>
        </header>

        <form class="p-2 mt-3" @submit.prevent="saveDetails">
          
            <div class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 mb-3 ml-0 sm:mr-1">
                    <label class="block" for="first_name">First name</label>
                    <input type="text" v-model="first_name" 
                    class="rounded-full w-full" id="first_name" placeholder="Joe">
                </div>
                <div class="w-full sm:w-1/2 mb-3 ml-0 sm:ml-1">
                    <label class="block" for="last_name">Last name</label>
                    <input type="text" v-model="last_name" 
                    class="w-full rounded-full" 
                    id="last_name" placeholder="Smith">
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 mb-3 ml-0 sm:mr-1">
                    <label class="block"  for="email">Email</label>
                    <input type="email" v-model="email" 
                    class="rounded-full w-full" id="email" 
                    placeholder="you@example.com">
                </div>
                <div class="w-full sm:w-1/2 mb-3 ml-0 sm:ml-1">
                    <label class="block" for="email">Phone number</label>
                    <input type="text" v-model="phone" 
                    class="rounded-full w-full" id="phone" 
                    placeholder="08XXXXXXXXXX">
                </div>
            </div>

            <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" v-model="address_1" 
                class="w-full rounded-full" id="address" placeholder="9 Kareem St">
                
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-4/12 mb-3">
                    <label class="block" for="country">Country</label>
                    <select disabled class=" bg-gray-200 w-full rounded-full" 
                    id="country">
                        <option>Nigeria</option>
                    </select>
                </div>
                <div class="w-full sm:w-4/12 mb-3 sm:mx-2">
                    <label class="block" for="state">State</label>
                    <select v-model="state"
                    class="w-full rounded-full" id="state">
                        <option value="">-- SELECT STATE --</option>
                        <option 
                        v-for="(state, index) in $store.state.location.states" 
                        :value="state.id" :key="index"> 
                        {{ state.name }}
                        </option>
                    </select>
                </div>
                
                <div class="w-full sm:w-4/12 mb-3">
                    <label class="block" for="city">CITY/LGA</label>
                    <select v-model="city" 
                    class="block w-full rounded-full" id="city">
                        <option value="">-- SELECT CITY/LGA --</option>
                        <option 
                        v-for="(lga, index) in $store.getters['location/getLGAByStateId'](state)" 
                        :value="lga.id" :key="index"> 
                        {{ lga.name }}
                        </option>
                    </select>
                </div>
            </div>
            <hr class="my-2">
            <button type="submit"
            class="uppercase hover:bg-yellow-400 bg-yellow-500 py-3 w-full rounded mt-2">
                Update profile
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
        document.title = `PROFILE SETTING | ${this.$appName}`
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