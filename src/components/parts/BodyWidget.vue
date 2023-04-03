<template v-if="widget.type == 'body'">
    <input  
        v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)" 
        v-bind:ref="'widget-body-' + widget.id"
        class="body transparent"
        placeholder="本文"
    />
</template>

<script>
    export default{
        props:[
            "widget"
        ]
    }
</script>