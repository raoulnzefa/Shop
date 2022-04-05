<template>
    <div  class="mx-auto rounded-br rounded-bl">
        <form class="p-2 shadow">
            <h1 class="text-center py-3 uppercase ">
                Delivery Details
            </h1>
            
            <div class="flex flex-col sm:flex-row">
                <in-put type="text" class_label="sr-only" 
                open_class="border-yellow-500" input_id="first_name"
                input_name="First name" v-model="billing.first_name" 
                main_class="w-full sm:w-1/2 mb-4 mr-0 sm:mr-1" />

                <in-put type="text" class_label="sr-only" 
                input_id="last_name" open_class="border-yellow-500"
                input_name="Last name" v-model="billing.last_name" 
                main_class="w-full sm:w-1/2 mb-4 ml-0 sm:ml-1" />
            </div>

            <div class="flex flex-col sm:flex-row">
                <in-put type="text" class_label="sr-only" 
                open_class="border-yellow-500" 
                input_name="Email" v-model="billing.email" input_id="email"
                main_class="w-full sm:w-1/2 mb-4 mr-0 sm:mr-1" />

                <in-put type="text" class_label="sr-only" 
                open_class="border-yellow-500"
                input_name="Phone number" v-model="billing.phone" input_id="phone"
                main_class="w-full sm:w-1/2 mb-4 ml-0 sm:ml-1" />
            </div>

            <div class="flex flex-col sm:flex-row">
                <in-put type="text" class_label="sr-only" 
                open_class="border-yellow-500" input_id="address"
                input_name="Address" v-model="billing.address_1" 
                main_class="w-full mb-4 mr-0 sm:mr-1" />

                <in-put type="text" class_label="sr-only" 
                open_class="border-yellow-500" 
                input_name="Area" v-model="area" input_id="area"
                main_class="w-full mb-4 ml-0 sm:ml-1" />
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-4/12 mb-4">
                    <label class="block sr-only" for="country">Country</label>
                    <select style="cursor:not-allowed" disabled class="rounded bg-gray-200 w-full py-1" 
                    id="country">
                        <option>Nigeria</option>
                    </select>
                </div>
                <div class="w-full sm:w-4/12 mb-4 sm:mx-2">
                    <label class="block sr-only" for="state">State</label>
                    <select style="cursor:not-allowed" disabled
                    class="w-full rounded py-1 bg-gray-200" id="stat">
                        <option value="">lagos</option>
                    </select>
                </div>
                
                <div class="w-full sm:w-4/12 mb-4">
                    <label class="block sr-only" for="city">CITY/LGA</label>
                    <select v-model="billing.city" 
                    class="block w-full rounded py-1 border border-gray-500" id="city">
                        <option value="">-- SELECT CITY/LGA --</option>
                        <option v-for="(lga, index) in $lagos" 
                        :value="lga" :key="index"> 
                        {{ lga }}
                        </option>
                    </select>
                </div>
            </div>
            <hr class="my-1 border border-gray-300">
            <button @click.prevent="saveDelivery"
            class="hover:bg-yellow-400 bg-yellow-500 py-2 w-full rounded mt-3">
                Proceed to payment
            </button>
        </form>
       
    </div> 
</template>

<script>
import InPut from '@/components/Input.vue'
export default {
    data(){
        return{
            billing: {
                city:'',
                // state:'',
                email:'',
                phone: '',
                address_1: '',
                last_name : '',
                first_name : '',
            },
            area : '',
        }
    },

    created(){
        if(localStorage.getItem('billing')){
            let billing = JSON.parse(localStorage.getItem('billing'))
            this.billing = billing
        }

        if(localStorage.getItem('area')){
            let area = localStorage.getItem('area')
            this.area = area
        }
    },
    components:{
        InPut
    },
    methods:{
            saveDelivery(){
                if(this.billing.city != '' && this.billing.email != '' && this.area != '' 
                && this.billing.phone != '' && this.billing.address_1 != '' 
                && this.billing.last_name != '' && this.billing.first_name != ''){
                    localStorage.setItem('billing', JSON.stringify(this.billing))
                    localStorage.setItem('area', this.area)
                    this.$eBus.emit('shopping', 'payment') //switch to shopping tab on checkout page
                }  else {
                    if(!this.billing.first_name)
                        document.getElementById('first_name').classList.add('border', 'border-red-500')
                    if(!this.billing.last_name)
                        document.getElementById('last_name').classList.add('border', 'border-red-500')  
                    if(!this.billing.email)
                        document.getElementById('email').classList.add('border', 'border-red-500')
                    if(!this.billing.phone)
                        document.getElementById('phone').classList.add('border', 'border-red-500')  
                    if(!this.area)
                        document.getElementById('area').classList.add('border', 'border-red-500')
                    if(!this.billing.city)
                        document.getElementById('city').classList.add('border', 'border-red-500')
                    if(!this.billing.address_1)
                        document.getElementById('address').classList.add('border', 'border-red-500')    
                }
            },
        },
}
</script>