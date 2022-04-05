<template>
    <form>
        <h2 class="bg-gray-200 font-bol uppercase border border-gray-300 
            text-gray-500 shadow text-center rounded-full py-1 mb-3">
            advanced search
        </h2>
        
        <div class="uppercase mb-6">    
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">category</h2>
                <div @click="toggle.cat=!toggle.cat" class="trigger">
                    <span v-show="!toggle.cat"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.cat"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            <div v-show="toggle.cat">
                <label class="block flex items-center" 
                v-for="category in $store.state.products.categories" 
                    :key="category.id" :for="category.slug">
                    <input v-model="search.categories" :value="category.slug"
                    class="rounded border border-gray-500 bg-gray-300" :id="category.slug" 
                    type="checkbox">&nbsp;{{category.name}}
                </label>
            </div>
        </div>

        <div class="mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2>price</h2>
                <div @click="toggle.price=!toggle.price" class="trigger">
                    <span v-show="!toggle.price"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.price"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            <div v-show="toggle.price" class="flex flex-row mb-3">
                <div  class="w-1/2">
                    <input type="number" v-model="search.min_price" min="100000" 
                    placeholder="-- min price --"  
                    class="mr-1 w-full rounded uppercase py-1">
                </div>

                <div  class="w-1/2">
                    <input type="number" v-model="search.max_price" min="100000" 
                    placeholder="-- max price --"  
                    class="ml-1 rounded w-full uppercase py-1">
                </div>
            </div>
        </div>
 
        <div class="mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2>brand</h2>
                <div @click="toggle.brand=!toggle.brand" class="trigger">
                    <span v-show="!toggle.brand"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.brand"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            <div v-show="toggle.brand">
                <label class="block flex items-center" 
                v-for="brand in $store.state.products.brands" 
                    :key="brand.id" :for="brand.slug">
                    <input v-model="search.brands" 
                    class="rounded border border-gray-500 bg-gray-200" 
                    :id="brand.slug" :value="brand.slug" type="checkbox">&nbsp;{{brand.name}}
                </label>
            </div>
        </div>
       
        <!-- <div v-for="(items, index) in terms" :key="index">
            <div v-for="(term, index) in items" :key="index" class="mb-6 uppercase">
                <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                    <h2>{{ getTax(index).name }}</h2>
                    <div class="trigger"><span class="fas fa-minus"></span></div>
                </div>
                
                <div class="" v-for="value in term" :key="value.id">
                    <label class="block flex items-center">
                        <input :v-model="getTax(index).slug" 
                        :value="value.slug" :id="value.slug" 
                        class="rounded border border-gray-500 bg-gray-200" 
                            type="checkbox">&nbsp;{{value.name}}
                    </label>
                </div>
            </div>
        </div> -->
                            
        <div class="mb-6">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">ram size</h2>
                <div @click="toggle.ram_size=!toggle.ram_size" class="trigger">
                    <span v-show="!toggle.ram_size"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.ram_size"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.ram_size">
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="1gb" v-model="search.ram_size" type="checkbox">&nbsp;1GB
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="2gb" v-model="search.ram_size" type="checkbox">&nbsp;2GB
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="3gb" v-model="search.ram_size" type="checkbox">&nbsp;3GB
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="4gb" v-model="search.ram_size" type="checkbox">&nbsp;4GB
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="5gb" v-model="search.ram_size" type="checkbox">&nbsp;5GB
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="6gb" v-model="search.ram_size" type="checkbox">&nbsp;6GB
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="8gb" v-model="search.ram_size" type="checkbox">&nbsp;8GB
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="12gb" v-model="search.ram_size" type="checkbox">&nbsp;12GB
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="16gb" v-model="search.ram_size" type="checkbox">&nbsp;16GB
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="32gb" v-model="search.ram_size" type="checkbox">&nbsp;32GB
                </label>
            </div>
        </div>

        <div class="mb-6">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">operating system</h2>
                <div @click="toggle.os=!toggle.os" class="trigger">
                    <span v-show="!toggle.os"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.os"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.os">
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="windows" v-model="search.os" type="checkbox">&nbsp;windows
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="android" v-model="search.os" type="checkbox">&nbsp;android
                </label>

                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="ios" v-model="search.os" type="checkbox">&nbsp;iOS
                </label>
                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="mac_os" v-model="search.os" type="checkbox">&nbsp;Mac OS
                </label>
                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="kai_os" v-model="search.os" type="checkbox">&nbsp;Kai OS
                </label>
            </div>
        </div>

         <div class="mb-6">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">connectivity</h2>
                <div @click="toggle.connectivity=!toggle.connectivity" class="trigger">
                    <span v-show="!toggle.connectivity"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.connectivity"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.connectivity">
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="2g" v-model="search.connectivity" type="checkbox">&nbsp;2G
                </label>

                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="3g" v-model="search.connectivity" type="checkbox">&nbsp;3G
                </label>

                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="4g" v-model="search.connectivity" type="checkbox">&nbsp;4G
                </label>
                
                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="5G" v-model="search.connectivity" type="checkbox">&nbsp;5G
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="wifi" v-model="search.connectivity" type="checkbox">&nbsp;wifi
                </label>

                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="lte" v-model="search.connectivity" type="checkbox">&nbsp;LTE
                </label>
                <label class="block flex items-center uppercase">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="bluetooth" v-model="search.connectivity" type="checkbox">&nbsp;bluetooth
                </label>
            </div>
        </div>

        <div class="mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">condition</h2>
                <div @click="toggle.condition=!toggle.condition" class="trigger">
                    <span v-show="!toggle.condition"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.condition"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.condition">
                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="new" v-model="search.condition" type="checkbox">&nbsp;new
                </label>

                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                    value="used" v-model="search.condition" type="checkbox">&nbsp;used
                </label>

                <label class="block flex items-center">
                    <input class="rounded border border-gray-500 bg-gray-200"
                     value="refurbished" v-model="search.condition" type="checkbox">&nbsp;refurbished
                </label>
            </div>
        </div>

        <div class="mb-6">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">year</h2>
                <div @click="toggle.year=!toggle.year" class="trigger">
                    <span v-show="!toggle.year"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.year"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            <div  v-show="toggle.year">
                <div class="flex flex-row mb-3">
                    <div class="w-1/2">
                        <select v-model="search.min_year"
                            class="w-full rounded uppercase py-0 mr-1 py-1"
                            aria-label="year" aria-describedby="year-addon">
                            <option value="">--MIN YEAR--</option>
                            <option v-for="(year, index) in generateDateYear()" :key="index">
                                {{year}}
                            </option>
                        </select>
                    </div>

                    <div class="w-1/2"> 
                        <select v-model="search.max_year"
                            class="w-full rounded uppercase py-0 ml-1 py-1 "
                            aria-label="year" aria-describedby="year-addon">
                            <option value="">--MAX YEAR--</option>
                            <option v-for="(year, index) in generateDateYear()" :key="index">
                                {{year}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>    

        <div class="w-full mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">sim slot</h2>
                <div @click="toggle.sim_slot=!toggle.sim_slot" class="trigger">
                    <span v-show="!toggle.sim_slot"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.sim_slot"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            
            <div v-show="toggle.sim_slot">
                <label class="block flex items-center">
                    <input v-model="search.sim_slot" class="rounded border border-gray-500 bg-gray-200"
                    value="single" type="checkbox">&nbsp;single 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_slot" class="rounded border border-gray-500 bg-gray-200"
                    value="dual" type="checkbox">&nbsp;dual 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_slot" class="rounded border border-gray-500 bg-gray-200"
                    value="triple" type="checkbox">&nbsp;triple
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_slot" class="rounded border border-gray-500 bg-gray-200"
                    value="quadruple" type="checkbox">&nbsp;quadruple
                </label>
            </div>
        </div>

         <div class="w-full mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">sim size</h2>
                <div @click="toggle.sim_size=!toggle.sim_size" class="trigger">
                    <span v-show="!toggle.sim_size"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.sim_size"><span  class="fas fa-minus"></span></span>
                </div>
            </div>
            
            <div v-show="toggle.sim_size">
                <label class="block flex items-center">
                    <input v-model="search.sim_size" class="rounded border border-gray-500 bg-gray-200"
                    value="nano" type="checkbox">&nbsp;Nano
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_size" class="rounded border border-gray-500 bg-gray-200"
                    value="micro" type="checkbox">&nbsp;micro 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_size" class="rounded border border-gray-500 bg-gray-200"
                    value="triple" type="checkbox">&nbsp;triple
                </label>
                <label class="block flex items-center">
                    <input v-model="search.sim_size" class="rounded border border-gray-500 bg-gray-200"
                    value="quadruple" type="checkbox">&nbsp;quadruple
                </label>
            </div>
        </div>

        <div class="w-full mb-6 uppercase">
            <div class="pb-1 my-3 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">architecture</h2>
                <div @click="toggle.architecture=!toggle.architecture" class="trigger">
                    <span v-show="!toggle.architecture"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.architecture"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.architecture">
                <label class="block flex items-center">
                    <input v-model="search.architecture" 
                        class="rounded border border-gray-500 bg-gray-200"
                        value="64" type="checkbox">&nbsp;64 bits
                </label>
                <label class="block flex items-center">
                    <input  v-model="search.architecture"
                        class="rounded border border-gray-500 bg-gray-200"
                        value="32" type="checkbox">&nbsp;32 bits 
                </label>
            </div>
        </div>

        <div class="w-full mb-6 uppercase">
            <div class="pb-1 mt-3 mb-2 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">storage</h2>
                <div @click="toggle.storage=!toggle.storage" class="trigger">
                    <span v-show="!toggle.storage"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.storage"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.storage">
                <label class="block flex items-center">
                    <input v-model="search.storage" 
                        class="rounded border border-gray-500 bg-gray-200"
                        value="32gb" type="checkbox">&nbsp;32GB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage" 
                        class="rounded border border-gray-500 bg-gray-200"
                        value="64gb" type="checkbox">&nbsp;64GB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage"
                    class="rounded border border-gray-500 bg-gray-200" 
                    value="128" type="checkbox">&nbsp;128GB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage"
                    class="rounded border border-gray-500 bg-gray-200"
                    value="256" type="checkbox">&nbsp;256GB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage"
                    class="rounded border border-gray-500 bg-gray-200" 
                    value="512" type="checkbox">&nbsp;512GB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage"
                    class="rounded border border-gray-500 bg-gray-200"
                    value="1tb" type="checkbox">&nbsp;1TB 
                </label>
                <label class="block flex items-center">
                    <input v-model="search.storage"
                    class="rounded border border-gray-500 bg-gray-200" 
                    value="2tb" type="checkbox">&nbsp;2TB 
                </label>
            </div>
        </div>

        <div class="w-full mb-6 uppercase">
            <div class="pb-1 mt-3 mb-1 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">processor</h2>
                <div @click="toggle.processor=!toggle.processor" class="trigger">
                    <span v-show="!toggle.processor"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.processor"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.processor">
                <label class="block flex items-center">
                    <input v-model="search.processor" 
                    class="rounded border border-gray-500 bg-gray-200"
                    value="amd" type="checkbox">&nbsp;AMD
                </label>

                <label class="block flex items-center">
                    <input v-model="search.processor" 
                    class="rounded border border-gray-500 bg-gray-200"
                    value="intel" type="checkbox">&nbsp;intel 
                </label>
            </div>
        </div>

        <div class="w-full mb-6 uppercase">
            <div class="pb-1 mt-3 mb-1 flex items-center justify-between border-b border-gray-300">
                <h2 class="uppercase">camera</h2>
                <div @click="toggle.camera=!toggle.camera" class="trigger">
                    <span v-show="!toggle.camera"><span class="fas fa-plus"></span></span>
                    <span v-show="toggle.camera"><span  class="fas fa-minus"></span></span>
                </div>
            </div>

            <div v-show="toggle.camera">
                <label class="block flex items-center">
                    <input v-model="search.camera" 
                    class="rounded border border-gray-500 bg-gray-200"
                    value="front" type="checkbox">&nbsp;front
                </label>
                <label class="block flex items-center">
                    <input v-model="search.camera" 
                    class="rounded border border-gray-500 bg-gray-200"
                    value="rear" type="checkbox">&nbsp;rear 
                </label>
            </div>
        </div>

        <button type="button" @click="submit" id="submitBtn" 
            class="rounded-full shadow hover:bg-yellow-400 
            font-bold bg-yellow-500 uppercase py-1 mt-3 w-full">
            search
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            search:{
                categories:[],
                min_price:'',
                max_price:'',
                brands:[],
                ram_size:[],
                os:[], 
                connectivity:[],
                conditon:[],
                min_year:'',
                max_year:'',
                sim_slot:[],
                sim_size:[],
                architecture:[],
                storage:[],
                processor:[],
                camera:[]
            },

            toggle:{
                cat:false,
                price:false,
                brand:false,
                ram_size:false,
                os:false,
                connectivity:false,
                conditon:false,
                year:false,
                sim_slot:false,
                sim_size:false,
                architecture:false,
                storage:false,
                processor:false,
                camera:false
            }
        }
    },

    watch:{
        search: {
            handler() {
                this.getSearchData()
            },
            deep: true
        }
    },

    created(){
        this.getSearchData = this.$_.debounce(this.submit, 500)
    },

    methods: {
        submit(){
            this.$eBus.emit('searchData', this.search)
        },

        getTax(id){
            return this.p_a.find(tax => tax.id == id)
        },

        generateDateYear(){
            let data = []
            let year = new Date().getFullYear()
            for (let index = 2001; index <= year; index++) {
                data.push(index)
            }
            return data
        },
    }
}
</script>

<style scoped>
.trigger{
    padding: 2px;
    cursor: pointer;
}
</style>