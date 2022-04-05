<template>
  <div v-if="order" class="mx-auto">
    <!-- <nav style="font-size: 80%" class="mb-4 font-weight-bold"> 
      <router-link :to="{name:'home'}">Home </router-link>
      <span class="fas fa-angle-double-right"></span>
      <router-link :to="{name:'user'}"> Dashboard </router-link>
      <span class="fas fa-angle-double-right"></span>
      <router-link :to="{name:'user-orders'}"> Orders </router-link>
      <span class="fas fa-angle-double-right"></span>
      <span> order #{{ $route.params.id }}</span>
    </nav> -->
    <header class="flex">
       <router-link :to="{name: 'orders'}">
       <span class="text-yellow-500 fas fa-2x fa-chevron-circle-left"></span>
       </router-link>
       <h2 class="mx-auto uppercase"> Order #{{ order.id}}</h2>
    </header>

    <!-- <h1 v-if="order" class="text-center my-5">Order #{{ order.id}}</h1> -->
    <p v-if="order" class="text-center my-5">Order #{{ order.id}}
       was placed on <span class="bg-green-400  text-white rounded p-2 py-1">
         {{ new Date(order.date_created).toDateString() }} 
         </span>
       and is currently <span class="bg-yellow-400 rounded p-2 py-1">{{ order.status }}.</span></p>

    <table v-if="order" class="mx-auto table">
      <thead>
        <th>Product</th>
        <th>Total</th>
      </thead>
      <tbody>
        <tr v-for="item in order.line_items" :key="item.id">
          <td><router-link :to="{name: 'product', params:{id: item.product_id, slug: (item.name.toLowerCase()).replace(' ', '-') }}"> {{item.name}} </router-link> x {{item.quantity}}</td>
          <td><span v-html="$currency"></span>{{item.total}}</td>
        </tr>
      </tbody>
      <tfoot>
        <td><b>Total</b></td>
        <td><b><span v-html="$currency"></span>{{ total }}</b></td>
      </tfoot>
      <!-- {{ order }} -->
    </table>
    <p v-else class="p-5 text-center text-white bg-danger rounded mt-5">
      No Orders 
    </p>
    <div class="text-center">
      <h2 class="border-t border-b border-black"><b>Address</b></h2>
      <p>Name: {{order.billing.first_name}} {{order.billing.last_name}}</p>
      <p>Address: {{order.billing.address_1}}</p>
      <!-- <p>{{order.billing.address_2}}</p> -->
    </div>
  </div>
</template>

<script>
  export default{
    name: 'OrderShow',
    data(){
      return{
        order:null
      }
    },
    mounted(){
      window.$http.get(`${window.$wc}orders/${this.$route.params.id}`).then(({data}) => {
        this.order = data      
        }).catch(error => {
          console.log(error.toString())
        })
    },
    computed:{
      // order(){
      //   return this.$store.getters['orders/getOrderById'](this.$route.params.id)
      // },
      total(){
        return this.order.line_items.reduce((sum, item) => {
          return sum += Number(item.total)
        },0)
      }
    }
  }
</script>
