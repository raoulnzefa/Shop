<template>
    <button @click="addToCart" id="cart-btn"
        class="w-full rounded py-0 sm:py-1 border bg-white 
        border-yellow-500 text-yellow-500 
        px-2  hover:text-white hover:bg-yellow-500">
            ADD TO CART
    </button>
</template>

<script>
export default {
    name: 'addToCart',
    props:['product'],
    methods:{
        addToCart(){
            let data = {};
            data['id'] = this.product.id
            data['price'] = this.product.price
            data['name'] = this.product.name
            data['image'] = this.product.images[0].src
            data['slug'] = this.product.slug
            this.$store.dispatch('cart/addItem', data)
        },
    },
}
</script>

<style scoped>
#cart-btn:active {
    background-color: rgb(197, 157, 25);
}
</style>