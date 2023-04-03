<template>
    <input
        v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)" 
        v-bind:ref="'widget-code-' + widget.id"
        class="code transparent"
        rows="1"
        placeholder="コード"
    />
</template>

<script>
   export default{
        props:[
            "widget"
        ]
   }


</script>