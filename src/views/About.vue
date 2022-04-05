<template>
  <div style="max-width:500px" class="about shadow border border-gray-200 
  rounded my-10 p-2 mx-auto text-center">
    <h1 style="font-size: 40px" 
    class="uppercase border-b-2 border-gray-400 text-gray-500 mb-18 pb-2 mt-3">About us</h1>

    <dl>
      <dt class="uppercase font-bold text-gray-600 mt-8 mb-3">Online Electronic Shop</dt>
      <dd>
        <img class="mx-auto" :class="{ loading: loading }" 
        style="height:200px;width:200px;border-radius:50%" 
        :src="`${$publicPath}img/images.png`">
      BuyElektro is an online electronics store. 
      We focused on selling quality phones, gadgets, tablets,
      laptops &amp; desktop computers, accessories like earpieces, chargers etc,
      other electronics appliances at competitive prices.
      <hr class="my-4">
      </dd>

      <dt class="mt-8 uppercase font-bold text-gray-600 mb-3">Repairs</dt>
      <dd>
         <img class="mx-auto border border-gray-400 p-1" :class="{ loading: loading }" 
        style="height:200px;width:200px;border-radius:50%" 
        :src="`${$publicPath}img/tools.png`">
      Do not be quick to throw away your old devices!!! Contact us for repairs.
      <hr class="my-4">
      
      </dd>

      <dt class="uppercase font-bold text-gray-600 mt-8 mb-3">Software/hardware Installation</dt>
      <dd>
         <img class="mx-auto border border-gray-400 p-1" :class="{ loading: loading }" 
        style="height:200px;width:200px;border-radius:50%" 
        :src="`${$publicPath}img/hardware.jpg`">
      Complex hardware/software installation can be tedious. From software installation, configuration and maintenance like 
      office tool to operating system and hardware installation from cctv camera, cash register in malls and supermarket,
      to home management system, we can be at your service when needed.
      <hr class="my-4">

      </dd>
    </dl>

    <p>We sell quality product that outlast and compete with new technologies.</p>

    <h2 class="uppercase text-yellow-400 font-bold mt-5">Mission</h2>
    <p>We want to make sure everyone own quality quality devices at affordable prices.</p>


    <h2 class="uppercase font-bold text-yellow-400">Vision</h2>
    <p>
      We are working hard to keep and bring new customers and to ensure that {{ $appName }}
      is your one-stop electronic shop.
    </p>
  </div>
</template>


<script>
export default {
  mounted(){
    document.title = `ABOUT US | ${this.$appName}`
  }
}
</script>

