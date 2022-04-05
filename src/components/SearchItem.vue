<template>
    <li v-if="product" class="flex items-center">
        <img :src="product.images[0].src" class="m-2" 
        style="width:20px;height:20px rounded" :alt="product.title">
        
        <router-link class="text-decoration-none text-secondary" 
        :to="{ name: 'product', params:{ slug: product.slug }}">
            {{product.name}}
        </router-link>
    </li>
</template>

<script>
export default {
    props:['id'],
    data(){
        return {
            product: null
        }
    },
    mounted(){
        window.$http.get(`${window.$wc}products/${this.id}`)
        .then(({data}) => {
            this.product = data
        })
    }
};
</script>