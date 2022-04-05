<template>
    <div>
        <form @submit.prevent="saveDelivery">
            <h4 class="mb-3 pb-2 text-center mt-2 mb-2 border-bottom border-blue">Delivery details</h4>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input type="text" v-model="billing.first_name" class="form-control round" id="first_name" placeholder="Joe">
                    <div class="invalid-feedback">
                        Valid first name is required.
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input type="text" v-model="billing.last_name" class="form-control round" id="last_name" placeholder="Smith">
                    <div class="invalid-feedback">
                        Valid last name is required.
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email">Email</label>
                    <input type="email" v-model="billing.email" class="form-control round" id="email" placeholder="you@example.com">
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="email">Phone number</label>
                    <input type="text" v-model="billing.phone" class="form-control round" id="phone" placeholder="08XXXXXXXXXX">
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" v-model="billing.address_1" class="form-control round" id="address" placeholder="9 Kareem St">
                <div class="invalid-feedback">
                    Please enter your shipping address.
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="country">Country</label>
                    <select disabled class="form-select d-block w-100 round" id="country">
                        <option>Nigeria</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="state">State</label>
                    <select disabled class="form-select d-block w-100 round" id="state">
                        <option value="">Lagos</option>
                    </select>
                    <div class="invalid-feedback">
                        Please provide a valid state.
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="zip">City/LGA</label>
                    <select v-model="billing.city" class="form-select d-block w-100 round" id="city">
                        <option value="">Choose...</option>
                        <option v-for="(lga, index) in $lagos" :value="lga" :key="index"> {{ lga }}</option>
                    </select>
                    <div class="invalid-feedback">
                        Please provide a valid state.
                    </div>
                </div>
            </div>
            <hr class="my-2">
            <button type="submit" class="btn btn-warning btn-lg btn-block round mt-2">
                Proceed to payment
            </button>
        </form>
    </div> 
</template>

<script>
    export default {
        data(){
            return{
                billing: {
                    city:'',
                    email:'',
                    phone: '',
                    address_1: '',
                    last_name : '',
                    first_name : '',
                },
            }
        },
        created(){
            if(localStorage.getItem('delivery')){
                let delivery = JSON.parse(localStorage.getItem('delivery'))
                this.billing = delivery
            }
        },
        methods:{
            saveDelivery(){
                if(this.billing.city != '' && this.billing.email != '' && this.billing.phone != '' 
                && this.billing.address_1 != '' && this.billing.last_name != '' 
                && this.billing.first_name != ''){
                    localStorage.setItem('delivery', JSON.stringify(this.billing))
                    this.$eBus.emit('checkout', 'payment') //switch to payment tab on checkot page
                }  else {
                    if(!this.billing.first_name)
                        document.getElementById('first_name').classList.add('border', 'border-danger')
                    if(!this.billing.last_name)
                        document.getElementById('last_name').classList.add('border', 'border-danger')  
                    if(!this.billing.email)
                        document.getElementById('email').classList.add('border', 'border-danger')
                    if(!this.billing.phone)
                        document.getElementById('phone').classList.add('border', 'border-danger')  
                    if(!this.billing.city)
                        document.getElementById('city').classList.add('border', 'border-danger')
                    if(!this.billing.address_1)
                        document.getElementById('address').classList.add('border', 'border-danger')    
                }
            },
        }
    }
</script>