<template>
    <div class="widget-family">
        <div class="widget"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        v-bind:class="{mouseover: widget.mouseover}">
            <component
                :is = "getWidgetComponent(widget.type)"
                :widget = "widget"
                @input="$emit('inputWidget',$event.target.value)"
            />
            <SelectBar
                :widget = "widget"
            />
        </div>

        <div class="child-widget">
            <WidgetItem
            v-for="childWidget in widget.children"
            v-bind:widget="childWidget"
            v-bind:parentWidget="widget"
            v-bind:key="childWidget.id"
            v-bind:layer="layer + 1"
            @delete="onClickDelete"
            @addChild="onClickChildWidget"
            @addWidgetAfter="onClickAddWidgetAfter"
            @inputWidget=" childWidget.text = $event"
            @mouseover= "childWidget.mouseover = $event"
            @typeWidget=" childWidget.type = $event"
            >

            </WidgetItem>
        </div>
    </div>
</template>

<script>
import ImageWidget from './ImageWidget.vue'
import TableWidget from './TableWidget.vue'
import HeadingWidget from './HeadingWidget.vue'
import CodeWidget from './CodeWidget.vue'
import BodyWidget from './BodyWidget.vue'
import SelectBar from './SelectBar.vue'
import limitWidthDirective from '@/directive/limitWidthDirective'
import setFontSizeDirective from '@/directive/setFontSizeDirective'
export default{
    name: 'WidgetItem',
    props:[
        'widget',
        'parentWidget',
        'layer',
        'table'
    ],
    components: {
        ImageWidget,
        TableWidget,
        HeadingWidget,
        CodeWidget,
        BodyWidget,
        SelectBar
    },
    methods: {
        getWidgetComponent(type){
            switch(type){
                case "heading":
                    return "HeadingWidget"
                case "table":
                    return "TableWidget"
                case "body":
                    return "BodyWidget"
                case "code":
                    return "CodeWidget"
                case "image":
                    return "ImageWidget"
                default:
                    return null
            }
        },
        onMouseOver : function(){
            console.log('bbbb1')
            this.$emit('mouseover',true);
        },
        onMouseLeave : function(){
            console.log('bbbb2')
            this.$emit('mouseover',false);
        },
        onClickDelete : function(parentWidget, widget){
            console.log('bbbb3')
            this.$emit('delete',parentWidget,widget);
        },
        onClickChildWidget: function(widget){
            console.log('bbbb4')
            this.$emit('addChild',widget);
        },
        onClickAddWidgetAfter :function(parentWidget, widget){
            console.log('bbbb5')
            this.$emit('addWidgetAfter',parentWidget,widget);
        },
        resizeCodeTextarea: function(){
            console.log('bbbb6')
            if(this.widget.type !== 'code')return;
            const textarea = this.$ref[`widget-code-${this.widget.id}`];

            const promise = new Promise(function(resolve){
                resolve(textarea.style.height = 'auto')
            });

            promise.then(function(){
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        },
        
        onAddTable: function(widget){
            console.log(widget)
            this.$emit('addTable',widget);
        },
        

    },
    watch: {
        'widget.text': function(){
            this.resizeCodeTextarea();
        },
        
    },
    directives: {
        'limit-width': limitWidthDirective,
        'set-font-size': setFontSizeDirective,
    }
    
}

</script>

<style scoped lang="scss">
.widget{
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    padding: 0px  5px 5px;
    color: rgba(25, 23, 17, 0.6);

    
}
.child-widget {
  padding-left: 10px;
}

table{
    width: 100%;
    display: block;
    input{
        border:none;
        width: 100%;
    }

    
}
</style>