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
        BodyWidget
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

    .widget-action {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        .button-icon {
        padding: 3px;
        margin-left: 3px;
        border-radius: 5px;
        }
    }
    input.heading {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1.5px solid #e0e0e0;
    }
    input.body {
        font-size: 16px;
    }
    .code {
        width: calc(100% - 120px);
        height: 35px;
        padding: 5px 10px;
        border: none;
        border-radius: 8px;
        color: #f8f8f2;
        background: #282a36;
        font-size: 14px;
        font-family: Consolas, Menlo, 'Liberation Mono', Courier, monospace;
        resize: none;
    }
    .code:focus {
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .upload{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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

    .headerInput{
        font-weight: bold;
        background: rgba(195, 182, 182, 0.12);
    }

    td{
        width: 60%;
        border: thin solid rgba(195, 182, 182, 0.12);
    }
    th{
        width: 50%;
        background: #ccc;
        border: thin solid rgba(195, 182, 182, 0.12);
    }
    .table-wrapper{
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .table-list{
        flex-grow: 1;
    }
    .cellinput{
        width: 100%;
    }
    .cellinputText{
        width: 100%;
    }
    .cellinput-wrapper{
        width: 50%;
        display: flex;
        flex-direction: row;
        height: 30px;
        border: thin solid rgba(0,0,0,0.12);
    }

}

@media print{
    // .widget-action {
    //     display: none;
    // }

    // input{
    //     display: none
    // }
}
</style>