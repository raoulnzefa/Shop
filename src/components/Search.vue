<template>
    <ul class="relative w-full">
        <li>
            <form  class="w-full flex">
                <input type="text" id="input-search"  v-model="term"
                :placeholder="`Search ${$appName}...`"
                class="w-full rounded-tl focus:outline-none
                focus:border-yellow-500 rounded-bl py-1 
                border border-gray-300 border-r-0">
                <button type="button" @click="search"
                class="bg-yellow-400 text-white hover:bg-yellow-500 
                p-1 px-3 uppercase rounded-tr rounded-br">
                <span class="fas fa-search"></span>
                </button>
            </form>
        </li>

        <li id="searchboard" v-show="$route.name != 'search' && ids.length" 
            style="z-index:300"
            class="absolute bg-gray-100 p-2 mt-2 w-full shadow rounded">
            <ul>
                <search-item v-for="id in ids" 
                :key="id" 
                :id="id">
                </search-item>
            </ul>
        </li>
       
    </ul>
</template>

<script>
import SearchItem from '@/components/SearchItem'
export default {
    data(){
        return {
            term: '',
            ids: [],
        }
    },
    watch:{
      term(){
        this.getSearchData()
      }, 

    //   ids(){
    //     this.$_.debounce(()=>{
    //         if(this.ids.length)
    //             this.$eBus.emit('searchTerm', this.ids)
    //     }, 500)
    //   }
    },

    // created(){
    //   this.getSearchData = this.$_.debounce(this.searchData, 500)
    // },

    mounted(){
      this.getSearchData = this.$_.debounce(this.searchData, 500)

        var vm = this

        var searchInput = document.getElementById('search')

        // searchInput.onfocus = () => {
        //     vm.searchData()
        // }

        window.addEventListener('click', (e) => {
            var searchboard = document.getElementById('searchboard')
            // let advSearch = document.getElementById('advSearch')
            
            if(e.target != searchboard) {
                vm.ids = []
            }
            if(e.target == searchInput) {
                vm.searchData()
            }
            // if(e.target != advSearch) {
            //     advSearch.classList.add('hidden')
            // }
        }, false)
    },

    methods:{
        searchData(){
            if(this.term == ''){
                this.ids = []
                return
            }
            window.$http.get(`wp/v2/search?subtype=product&search=${this.term}`)
            .then(({data}) => {
                let ids = [] 
                data.forEach(el => {
                    ids.push(el.id)
                });
                this.ids = ids
                this.$eBus.emit('searchTerm', this.ids)
                console.log(this.ids)
            }).catch(error => {
                console.log(error.toString())
            })
        },

        search(){
            // if(this.$route.name != 'search')
                this.$router.push({name:'search'})
            if(this.ids.length)
                this.$eBus.emit('searchTerm', this.ids)
        }
    },

    components:{
        SearchItem
    }
}
</script>

<style scoped>
    #input-search:focus{ 
        border-color: rgb(245, 158, 11);
        box-shadow: none;
    }

    #input-search{ 
        padding-top: 5px;
        padding-bottom: 5px;
        line-height:1.5
    }
</style>