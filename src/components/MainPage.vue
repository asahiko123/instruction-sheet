<template>
    <div class="main-page">
        <div class="left-menu" @click.self="onEditNoteEnd()">

            <button class="transparent save" @click="onClickButtonSave">
                <i class="fas fa-save"></i>内容を保存する
            </button>
            <NoteItem
                v-for="note in noteList"
                v-bind:note="note"
                v-bind:key="note.id"
                v-bind:layer="1"
                @input="note.name= $event"
                @mouseover="note.mouseover = $event"
                @delete="onDeleteNote"
                @addChild="onAddChildNote"
                @editStart="onEditNoteStart"
                @editEnd="onEditNoteEnd"
                @addNoteOnSameLayer="addNoteOnSameLayer"
                @select="onSelectNote"
                >
            </NoteItem>
            <button class="transparent" @click="onClickButtonAdd">
                <i class="fas fa-plus-square"></i>マニュアルを追加する
            </button>
        </div>
        <div class="right-view" @click.self="onEditNoteEnd()">
            <template v-if="selectedNote == null">
                <div class="no-selected-note">ノートを選択してください</div>
            </template>
            <template v-else>
                
                <div class="note-content">
                    <h3 class="note-title">{{ selectedNote.name }}</h3>
                    <draggable v-bind:list="selectedNote.widgetList" group="widgets">
                        <WidgetItem
                            v-for="widget in selectedNote.widgetList"
                            v-bind:key="widget.id"
                            v-bind:widget="widget"
                            v-bind:layer="1"
                            v-bind:tableList = "widget.tableList"
                            @addTable="onAddTable"
                            @delete="onDeleteWidget"
                            @addChild="onAddChildWidget"
                            @addWidgetAfter="onAddWidgetAfter"
                            @inputWidget=" widget.text = $event"
                            @mouseover= "widget.mouseover = $event"
                            @typeWidget=" widget.type = $event"
                            @inputCell_Th_Front="inputCell_Th_Front"
                            @inputCell_Td_Front="inputCell_Td_Front"
                            @inputCell_Th_Back="inputCell_Th_Back"
                            @inputCell_Td_Back="inputCell_Td_Back">   
                        </WidgetItem>
                    </draggable>
                    
                </div>
                <button class="addWidget transparent" @click="onClickButtonAddWidget">
                    <i class="fas fa-plus-square"></i>ウィジェットを追加する
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import NoteItem from '@/components/parts/NoteItem.vue'
import store from '../store'
import WidgetItem from '@/components/parts/WidgetItem.vue'
import draggable from 'vuedraggable'
export default {
    
    data(){
        return {
            noteList: [],
            selectedNote: null,
        }
    },
    components: {
        NoteItem,
        WidgetItem,
        draggable
    },
    created: function(){
        const localData = localStorage.getItem('noteItem');

        if(localData != null){
            console.log('setItem')
            this.noteList = JSON.parse(localData);
        }
    
    },
    methods: {
        onAddNoteCommon: function(targetList, layer, index){
            console.log('aaaa1')
            layer = layer || 1
            const note = {
                id: new Date().getTime().toString(16),
                name : `新規ノート-${layer}-${targetList.length}`,
                children: [],
                mouseover: false,
                editing: false,
                selected: false,
                layer: layer,
                widgetList:[]
            };
            this.onAddWidgetCommon(note.widgetList);

            if(index == null){
                targetList.push(note)
            }else{
                targetList.splice(index + 1, 0 , note);
            }
        },
        addNoteOnSameLayer: function(parentNote, note){
            console.log('aaaa2')
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            const layer = parentNote == null ? 1 : note.layer;
            const index = targetList.indexOf(note);
            this.onAddNoteCommon(targetList, layer, index);
        },
        onClickButtonAdd: function(){
            console.log('aaaa3')
            this.onAddNoteCommon(this.noteList);
        },
        onDeleteNote: function(parentNote, note){
            console.log('aaaa4')
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            const index = targetList.indexOf(note); 
            targetList.splice(index,1);
        },
        onSelectNote: function(targetNote){
            console.log('aaaa5')
            const updateSelectStatus = function(targetNote,noteList){
                for(let note of noteList){
                    note.selected = (note.id === targetNote.id);
                    updateSelectStatus(targetNote, note.children);
                }
            }
            updateSelectStatus(targetNote, this.noteList);

            this.selectedNote = targetNote;

        },
        onAddChildNote: function(note){
            console.log('aaaa6')
            this.onAddNoteCommon(note.children, note.layer + 1 );
        },
        onEditNoteStart: function(editNote, parentNote){
            console.log('aaaa7')
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            for(let note of targetList){
                note.editing = (note.id === editNote.id);
                this.onEditNoteStart(editNote, note);
            }
        },
        onEditNoteEnd: function(parentNote){
            console.log('aaaa8')
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            for(let note of targetList){
                note.editing = false;
                this.onEditNoteEnd(note);
            }
        },
        onAddWidgetCommon: function(targetList, layer, index){
            console.log('addWidget')
            layer = layer || 1;
            const widget = {
                id: new Date().getTime().toString(16),
                type: layer === 1 ? 'heading' : 'body',
                text: '',
                mouseover: false,
                children: [],
                layer: layer,
                tableList:[],
            };

            if(index == null){
                targetList.push(widget);
            }else{
                targetList.splice(index + 1,0,widget);
            }
        },
        onClickButtonAddWidget: function(){
            console.log('aaaa10')
            this.onAddWidgetCommon(this.selectedNote.widgetList);
        },
        onAddChildWidget: function(widget){
            console.log('aaaa111')
            this.onAddWidgetCommon(widget.children, widget.layer + 1);
        },
        onAddWidgetAfter: function(parentWidget, note){
            console.log('aaaa12')
            console.log('test');
            const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
            const layer = parentWidget == null ? null : parentWidget.layer + 1;
            const index = targetList.indexOf(note);
            this.onAddWidgetCommon(targetList, layer, index);
        },
        onDeleteWidget : function(parentWidget, widget) {
            console.log('aaaa13')
        const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
        const index = targetList.indexOf(widget);
        if(widget.type == "table"){
            localStorage.removeItem('table');
            store.commit('removeTable',store.state);
        }else if(widget.type == 'image'){
            store.commit('removeFilePreview',store.state);
        }
        targetList.splice(index, 1);



        const focusWidget = index === 0 ? parentWidget : targetList[index - 1];
            if(focusWidget != null){
                focusWidget.id = (parseInt(focusWidget.id, 16) + 1).toString(16);
            }
        },
        onClickButtonSave: function(){
            console.log('aaaa')
            localStorage.setItem('noteItem',JSON.stringify(this.noteList));
            // localStorage.setItem(`table_${store.state.id}`,JSON.stringify(store.state.tableList)); 
            this.$toasted.show('マニュアルを保存しました',{
                position: 'top-left',
                duration: 1000,
                type: 'success'
            });
            
        },
        onAddTable: function(widget){
            console.log(widget)
            this.onAddTableCommon(widget.tableList);
        },

        onAddTableCommon: function(targetList){
            console.log('addTable')
            const table = {
                id : new Date().getTime().toString(16) + new Date().getSeconds().toString(16),
                rows: [
                    {
                        table_cells:[
                            {cell_type_th_front: '',cell_type_td_front: '',cell_type_th_back: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_td_front: '',cell_type_th_back: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_td_front: '',cell_type_th_back: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_td_front: '',cell_type_th_back: '',cell_type_td_back: ''},
                        
                        ]

                    },
                ],
                selected: false,
            };

            targetList.push(table);
        },
        inputCell_Th_Front: function(widget,eventVal,tableIndex,listIndex,index){
            console.log('emit th front:' + eventVal + 'row' + index + 'tableIndex' + tableIndex + 'listIndex' + listIndex)
            widget.tableList[tableIndex].rows[listIndex].table_cells[index].cell_type_th_front = eventVal;
            
        },
        inputCell_Td_Front: function(widget,eventVal,tableIndex,listIndex,index){
            console.log('emit td front:' + eventVal + 'row' + index + 'tableIndex' + tableIndex + 'listIndex' + listIndex)
            widget.tableList[tableIndex].rows[listIndex].table_cells[index].cell_type_td_front = eventVal;
        },
        inputCell_Th_Back: function(widget,eventVal,tableIndex,listIndex,index){
            console.log('emit th back' + eventVal + 'row' + index + 'tableIndex' + tableIndex + 'listIndex' + listIndex)
            widget.tableList[tableIndex].rows[listIndex].table_cells[index].cell_type_th_back = eventVal;
        },
        inputCell_Td_Back: function(widget,eventVal,tableIndex,listIndex,index){
            console.log('emit td back' + eventVal + 'row' + index + 'tableIndex' + tableIndex + 'listIndex' + listIndex);
            widget.tableList[tableIndex].rows[listIndex].table_cells[index].cell_type_td_back = eventVal;

        }

        
    },


}
</script>

<style scoped lang="scss">

.main-page{
    display: flex;
    height: calc(100vh - 60px);

    .left-menu{
        width: 350px;
        background-color: #f7f6f3;

        .save{
            width: 100%;
        }

    }
    .right-view{
        flex-grow: 1;
        padding: 10px;
        .no-selected-note {
      text-align: center;
      font-size: 25px;
      margin: 20px;
    }

    .note-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: left;
      .note-title {
        margin-bottom: 25px;
      }
    }
    }
}

@media print {
        .left-menu,.addWidget{
            display: none;
        }
    }

</style>