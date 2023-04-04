<template>
    <div v-show="widget.mouseover" class="widget-action">
        <div class="button-icon" @click="onClickChildWidget(widget)">
            <i class="fas fa-sitemap"></i>
        </div>  
        <div class="button-icon" @click="onClickAddWidgetAfter(parentWidget,widget)">
            <i class="fas fa-plus-circle"></i>
        </div> 
        <div class="button-icon" @click="onClickDelete(parentWidget,widget)">
            <i class="fas fa-trash"></i>
        </div> 
        <div class="button-icon">
            <i class="fas fa-cog" data-toggle="dropdown"></i>
            <div class="dropdown-menu">
                <a class="dropdown-item" @click="$emit('typeWidget','heading')">見出し</a>
                <a class="dropdown-item" @click="$emit('typeWidget','code')">ソースコード</a>
                <a class="dropdown-item" @click="$emit('typeWidget','body')">本文</a>
                <a class="dropdown-item" 
                    @click="$emit('typeWidget','table'); 
                    onAddTable(widget)"
                    v-if="widget.layer < 3"
                >テーブル</a>
                <a class="dropdown-item" 
                    @click="$emit('typeWidget','image')"
                    v-if="widget.layer < 3"
                >写真</a>
            </div>
        </div> 
    </div>

</template>

<script>
    export default{
        props:[
            "widget"
        ],
        methods:{
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
        }
    }
</script>

<style scoped >
    .widget-action {
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }

    .widget-action .button-icon{
        padding: 3px;
        margin-left: 3px;
        border-radius: 5px;
    }

    @media print{
        .widget-action{
            display: none;
        }
    }
</style>