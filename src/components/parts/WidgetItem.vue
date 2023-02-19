<template>
    <div class="widget-family">
        <div class="widget"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        v-bind:class="{mouseover: widget.mouseover}">
            <template v-if="widget.type == 'heading'">
                <input   
                    v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)"
                    v-bind:ref="'widget-heading-' + widget.id"
                    class="heading transparent"
                    placeholder="見出し"
                />
            </template>
            <template v-if="widget.type == 'body'">
                □<input  
                    v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)" 
                    v-bind:ref="'widget-body-' + widget.id"
                    class="body transparent"
                    placeholder="本文"
                />
            </template>
            <template v-if="widget.type == 'code'">
                <input
                    v-bind:value="widget.text" @input="$emit('inputWidget',$event.target.value)" 
                    v-bind:ref="'widget-code-' + widget.id"
                    class="code transparent"
                    rows="1"
                    placeholder="コード"
                />
            </template>
            <template 
                v-if="widget.type == 'table'">
                    <table>    
                        <div class="table-wrapper" v-for="(table,tableIndex) in widget.tableList" :key = "table.id">
                            {{ tableIndex }}
                            <div v-for="(list,listIndex) in table.rows" :key = "list.id">
                                {{ listIndex }}
                                <div v-for="(cell,index) in list.table_cells" :key = "cell.id"  class="table-wrapper">
                                    {{ index }}
                                        <div class="cellinput-wrapper">
                                            <th>
                                                <template>
                                                    <input 
                                                        v-bind:value="cell.cell_type_th_front"
                                                        @input="$emit('inputCell_Th_Front',widget,$event.target.value,tableIndex,listIndex,index)"
                                                        class="headerInput"
                                                        >
                                                </template>
                                            </th>
                                            <td class="cellinput">
                                                <template>
                                                    <input 
                                                        v-bind:value="cell.cell_type_td_front"
                                                        @input="$emit('inputCell_Td_Front',widget,$event.target.value,tableIndex,listIndex,index)"
                                                        class="cellinputText" 
                                                    >
                                                </template>
                                            </td>   
                                        </div>
                                        <div class="cellinput-wrapper">
                                            <th>
                                                <template>
                                                    <input 
                                                        v-bind:value="cell.cell_type_th_back"
                                                        @input="$emit('inputCell_Th_Back',widget,$event.target.value,tableIndex,listIndex,index)"
                                                        class="headerInput" 
                                                    >
                                                </template>
                                            </th>
                                            <td class="cellinput">
                                                <template>
                                                    <input 
                                                        v-bind:value="cell.cell_type_td_back"
                                                        @input="$emit('inputCell_Td_Back',widget,$event.target.value,tableIndex,listIndex,index)"
                                                        class="cellinputText" 
                                                    >
                                                </template>
                                            </td>
                                        </div>  
                                </div>
                            </div>
                        </div>
                    </table>
            </template>
            <template v-if="widget.type == 'image'">
                <div class="upload">                  
                        <img :src="widget.image" v-bind:value="widget.image" style="max-width: 100%">                  
                    <input type="file" @change="upload($event,widget)" />
                </div>
            </template>
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
                        <a class="dropdown-item" @click="$emit('typeWidget','table'); onAddTable(widget)">テーブル</a>
                        <a class="dropdown-item" @click="$emit('typeWidget','image')">写真</a>
                    </div>
                </div> 
            </div>
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
import TableItem from './TableItem.vue'
import FilePreview from './FilePreview.vue'
import store from '../../store'
export default{
    name: 'WidgetItem',
    props:[
        'widget',
        'parentWidget',
        'layer',
        'table'
    ],
    components: {
        // TableItem,
        // FilePreview,
    },
    methods: {
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
        upload(e,widget){
            console.log(e)
            // this.$emit('upload',widget,e);

            let image = e.target.files[0]
            let reader = new FileReader();
            console.log(reader);

            reader.readAsDataURL(image);
            reader.onload = (e) =>{
                let imageData = e.target.result;
                console.log(imageData);
                widget.image = imageData;
                
            }

            

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
    computed:{
        
    
    }
}

</script>

<style scoped lang="scss">
.widget{
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
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
}
.child-widget {
  padding-left: 10px;
}

table{
    width: 100%;
    td{
        width: 60%;
        border: thin solid rgba(195, 182, 182, 0.12);
    }
    th{
        width: 40%;
        background: #ccc;
        border: thin solid rgba(195, 182, 182, 0.12);
    }
    .table-wrapper{
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .cellinput{
        border: none;
        width: 100%;
    }
    .cellinput-wrapper{
        width: 50%;
        display: flex;
        flex-direction: row;
        height: 30px;
        border: thin solid rgba(0,0,0,0.12);
    }
    .headerInput{
        border: none;
        background: rgba(195, 182, 182, 0.12);
    }
    input.cellinputText{
        width: 100%;
    }
}

@media print{
    .widget-action {
        display: none;
    }
}
</style>