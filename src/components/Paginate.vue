<template>
    <nav aria-label="Page navigation">
        <div class="pagination flex justify-center borde border-gray-400 rounded p-1">
                <a class="border border-gray-300 text-gray-400 hover:text-gray-500 
                p-1 mr-1 px-2 rounded" 
                @click.prevent="onClickFirstPage"
                href="#" aria-label="Previous">
                    <span class="fas fa-angle-double-left"></span>
                </a>
            
                <a class="border border-gray-300 p-1 mx-1 px-2 text-gray-400  
                hover:text-gray-500 rounded" 
                @click.prevent="onClickPreviousPage"
                href="#" aria-label="Previous">
                    <span class="fas fa-angle-left"></span>
                </a>
            
                <a  v-for="(page, index) in pages" 
                :key="index" class="border mx-1 border-gray-300 p-1 px-3 rounded" 
                    :class="[isActivePage(page.name)? 'text-white bg-active': '' ]"
                @click.prevent="onClickPage(page.name)" 
                :disabled="page.isDisabled" href="#">{{page.name}}</a>
            
                <a class="border border-gray-300 text-gray-400 
                hover:text-gray-500 p-1 mx-1 px-2 rounded" 
                @click.prevent="onClickNextPage" href="#" aria-label="Next">
                    <span class="fas fa-angle-right"></span>
                </a>
            
                <a class="border border-gray-300 text-gray-400 hover:text-gray-500 
                p-1 ml-1 px-2 rounded" 
                @click.prevent="onClickLastPage" href="#" aria-label="Next">
                    <span class="fas fa-angle-double-right"></span>
                </a>
        </div>
    </nav>
</template>

<script>
export default{
    name: 'Paginate',
    props:[
        'max_visible_btn',
        'total_pages',
        'current_page'
    ],
    computed:{
        start_page(){
            if(this.current_page === 1)
                return 1
            // if(this.current_page === this.total_pages)
            //     return Math.abs(this.total_pages - this.max_visible_btn)
            return this.current_page - 1
        },

        pages(){
            const range = [], 
            x = Math.min(this.start_page + this.max_visible_btn - 1, this.total_pages)
                for (let i = this.start_page; i <= x; i++) {
                    range.push({
                        name: i,
                        isDisabled: i === this.current_page
                    })
                }
            return range
        },

    },
    methods:{
        isActivePage(page){
            return this.current_page == page
        },
        
        onClickFirstPage(){
            if(this.current_page > 1)
                this.$eBus.emit('pagechanged', 1)
            window.scrollTo(0,0)
        },

        onClickPreviousPage(){
            if(this.current_page > 1)
                this.$eBus.emit('pagechanged', this.current_page - 1)
            window.scrollTo(0,0)
        },

        onClickPage(page){
            this.$eBus.emit('pagechanged', page)
            window.scrollTo(0,0)
        },

        onClickNextPage(){
            // let current_page = this.current_page + 1
            if(this.current_page < this.total_pages)
                this.$eBus.emit('pagechanged', this.current_page + 1)
            window.scrollTo(0,0)
        },
        onClickLastPage(){
            if(this.current_page == this.total_pages)
                return
            this.$eBus.emit('pagechanged', this.total_pages)
            console.log(this.total_pages)
            window.scrollTo(0,0)
        }
    }
}
</script>

<style scoped>
    .active{
        border: 2px solid #0d6efd;
    }
    .bg-active{
        color: #f59e0b;
        font-weight: bold;
        background-image:  linear-gradient(to bottom,#e8e8e8 0%, #f4f3f3 100%);
    }
</style>