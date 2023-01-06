<template>
    <div class="main-page">
        <div class="left-menu" @click.self="onEditNoteEnd()">
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
                            @delete="onDeleteWidget"
                            @addChild="onAddChildWidget"
                            @addWidgetAfter="onAddWidgetAfter"
                            @inputWidget=" widget.text = $event"
                            @mouseover= "widget.mouseover = $event">   
                        </WidgetItem>
                    </draggable>
                    <button class="addWidget transparent" @click="onClickButtonAddWidget">
                        <i class="fas fa-plus-square"></i>ウィジェットを追加する
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import NoteItem from '@/components/parts/NoteItem.vue'
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
    methods: {
        onAddNoteCommon: function(targetList, layer, index){
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
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            const layer = parentNote == null ? 1 : note.layer;
            const index = targetList.indexOf(note);
            this.onAddNoteCommon(targetList, layer, index);
        },
        onClickButtonAdd: function(){
            this.onAddNoteCommon(this.noteList);
        },
        onDeleteNote: function(parentNote, note){
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            const index = targetList.indexOf(note); 
            targetList.splice(index,1);
        },
        onSelectNote: function(targetNote){
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
            this.onAddNoteCommon(note.children, note.layer + 1 );
        },
        onEditNoteStart: function(editNote, parentNote){
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            for(let note of targetList){
                note.editing = (note.id === editNote.id);
                this.onEditNoteStart(editNote, note);
            }
        },
        onEditNoteEnd: function(parentNote){
            const targetList = parentNote == null ? this.noteList : parentNote.children;
            for(let note of targetList){
                note.editing = false;
                this.onEditNoteEnd(note);
            }
        },
        onAddWidgetCommon: function(targetList, layer, index){
            layer = layer || 1;
            const widget = {
                id: new Date().getTime().toString(16),
                type: layer === 1 ? 'heading' : 'body',
                text: '',
                mouseover: false,
                children: [],
                layer: layer,
            };
            if(index == null){
                targetList.push(widget);
            }else{
                targetList.splice(index + 1,0,widget);
            }
        },
        onClickButtonAddWidget: function(){
            this.onAddWidgetCommon(this.selectedNote.widgetList);
        },
        onAddChildWidget: function(widget){
            this.onAddWidgetCommon(widget.children, widget.layer + 1);
        },
        onAddWidgetAfter: function(parentWidget, note){
            console.log('test');
            const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
            const layer = parentWidget == null ? null : parentWidget.layer + 1;
            const index = targetList.indexOf(note);
            this.onAddWidgetCommon(targetList, layer, index);
        },
        onDeleteWidget : function(parentWidget, widget) {
        const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
        const index = targetList.indexOf(widget);
        targetList.splice(index, 1);

        const focusWidget = index === 0 ? parentWidget : targetList[index - 1];
        if(focusWidget != null){
            focusWidget.id = (parseInt(focusWidget.id, 16) + 1).toString(16);
        }
    },
        
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