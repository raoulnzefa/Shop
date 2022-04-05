<template>
  <div>
    <!-- <loader :loading="loading"/> -->
    <!-- <h2 class="text-center mb-3">Your Orders</h2> -->
    <header class="flex my-8 mt-4">
       <router-link :to="{name: 'user-home'}">
       <span class="text-yellow-500 fas fa-2x fa-chevron-circle-left"></span>
       </router-link>
       <h2 class="mx-auto uppercase"> Your Order </h2>
    </header>

    <div v-if="orders.length" class="table-responsive">
      <table class="mx-auto table">
        <thead>
          <th>Order</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Actions</th>
        </thead>
        <tr v-for="order in orders" :key="order.id">
          <td class="text-danger">#{{ order.id }}</td>
          <td>{{ (new Date(order.date_created)).toDateString() }}</td>
          <td>{{ order.status }}</td>
          <td><span v-html="$currency"></span>{{ order.total }}</td>
          <td>
            <router-link class="bg-green-500 text-white py-2 px-3 rounded" :to="{ name: 'order', params:{'id': order.id } }">
              View Order
            </router-link>
          </td>
        </tr>
      </table>
      </div>
      <p v-if="!orders.length" class="py-2 text-center text-white bg-yellow-500 rounded">
        No Order 
        <router-link class="text-black hover:text-gray-500 text-decoration-none" :to="{ name: 'shop' }">
        Go shopping
        </router-link>
      </p>
  </div>
</template>

<script>
  export default{
    name: 'Order',
    data(){
      return {
        orders:[],
        // loading:false
      }
    },
    mounted(){
      const user = this.$store.getters['user/getUser'].ID
      var vm = this
      // vm.loading = true
      window.$http.get(`${window.$wc}orders?customer=${user}`)
      .then(({data}) => {
        // vm.loading = false  
        vm.orders = data    
        console.log(data)
      }).catch(error => {
        console.log(error.toString())
      })
    },
  }
</script>