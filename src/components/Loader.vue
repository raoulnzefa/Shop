<template>
    <div v-if="loading" style="height:25vh;" class="flex justify-center items-center text-center p-9">
    <!-- <div v-if="loading" class=" text-center p-9"> -->
        <img :class="{ loading: loading }" :src="`${$publicPath}img/logo.png`">

        <!-- <div class="p-2 my-2 rounded-full  bg-gray-300 w-full"></div>
        <div class="p-2 my-2 rounded-full  bg-gray-300 w-full"></div>
        <div class="p-2 my-2 rounded-full  bg-gray-300 w-full"></div>
        <div class="p-2 my-2 rounded-full  bg-gray-300 w-full"></div>
        <div class="p-2 my-2 rounded-full  bg-gray-300 w-full"></div> -->
    </div>
</template>
<script>
export default {
    props:['loading']
}
</script>

<style scoped>
 @keyframes shrink-and-expand {
    0%    {height: 100px;width:100px}
    10%   {height: 150px;width:150px}
    20%   {height: 100px;width:100px}
    30%   {height: 150px;width:150px}
    40%   {height: 100px;width:100px}
    50%   {height: 150px;width:150px}
    60%   {height: 100px;width:100px}
    70%   {height: 150px;width:150px}
    80%   {height: 100px;width:100px}
    90%   {height: 150px;width:150px}
    100%  {height: 100px;width:100px}
  }
.loading{
    animation-name: shrink-and-expand;
    animation-duration: 7s;
    animation-iteration-count: infinite;
}
</style>