<template>
  <component :is="layout">  
    <router-view :key="$route.fullPath"/>
  </component>  
</template>

<script>
export default {
  computed: {
    layout(){
      return this.$route.meta.layout || 'main-layout' 
    }
  },
  created(){
    this.$store.dispatch('products/setCategories')
    // // this.$store.dispatch('products/setTags')
    this.$store.dispatch('products/setProducts')
    // this.$store.dispatch('location/setStates')
    // this.$store.dispatch('location/setLGAS')
    this.$store.dispatch('products/setBrands')
    // this.$store.dispatch('products/setModels')
    // this.$store.dispatch('products/setTypes')
  },
  updated(){
    window.scrollTo(0, 0)
  },
  beforeCreate(){
    // console.log(localStorage.getItem('store'))
    this.$store.commit('INIT_STORE')
  },
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
