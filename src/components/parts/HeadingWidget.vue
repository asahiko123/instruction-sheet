<template v-if="widget.type == 'heading'">
    <input   
        v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)"
        v-bind:ref="'widget-heading-' + widget.id"
        class="heading transparent"
        placeholder="見出し"
    />
</template>

<script>
    export default{
        props:[
            "widget"
        ]
    }
</script>