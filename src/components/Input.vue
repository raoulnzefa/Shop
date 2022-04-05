<template>
    <div class="relative" :class="main_class">
        <label :class="class_label" :for="input_id">{{input_name}}</label>
        <p v-show="open" style="font-size:13px;top:-15px;right:8px;height:16px;z-index:200" 
        :class="open ? open_class:''"
        class="px-2 border-b-0 border pt-0 text-black
        border-yellow-200 bg-white rounded-tr rounded-tl absolute">{{input_name}}</p>

        <input :type="type" @blur="open=false" @focus="open=true" 
        :class="open ? open_class : 'border-gray-500'" 
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        class="rounded w-full py-1 pl-3 focus:outline-none border" 
        :id="input_id" :placeholder="open ? '':input_name">
    </div>
</template>

<script>
export default {
    props:[
        'modelValue',
        'input_name', 
        'main_class', 
        'input_id', 
        'class_label', 
        'type', 
        'open_class'
    ],
    emits:['update:modelValue'],
    data(){
        return{
            open:false,
        }
    },

}
</script>