<template>
<div class="note-family">
    <div class="note"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        @click="onSelect(note)"
        v-bind:class="{mouseover: note.mouseover && !note.editing, selected: note.selected}">
        <template v-if="note.editing">
            <input v-bind:value="note.name" @input="$emit('input',$event.target.value)" class="transparent" @keypress.enter="onEditEnd"/>
        </template>
        <template v-else>
            <div class="note-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <div class="note-name">{{ note.name }}</div>
            <div class="note-action">
                <div class="button-icon" @click="onAddChildNote(note)">
                    <i class="fas fa-sitemap"></i>
                </div>
                <div class="button-icon" @click="addNoteOnSameLayer(parentNote, note)">
                    <i class="fas fa-plus-circle"></i>
                </div>
                <div class="button-icon" @click="onClickEdit(note)">
                    <i class="fas fa-edit"></i>
                </div>
                <div class="button-icon" @click="onClickDelete(parentNote, note)">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </template> 
    </div>
    <div class="child-note">
    <draggable :list="note.children" group="childnotes">
      <NoteItem
        v-for="childNote in note.children"
        v-bind:note="childNote"
        v-bind:parentNote="note"
        v-bind:key="childNote.id"
        v-bind:layer="layer + 1"
        @delete="onClickDelete"
        @editStart="onClickEdit"
        @editEnd="onEditEnd"
        @addChild="onAddChildNote"
        @input="childNote.name = $event"
        @mouseover="childNote.mouseover = $event"
        @addNoteOnSameLayer="addNoteOnSameLayer"
        @select = "onSelect"
      />
    </draggable>
    </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'NoteItem',
    components: {
        draggable
    },
    props: [
        'note',
        'parentNote',
        'layer'
    ],
    methods: {
        onMouseOver: function(){
            this.$emit('mouseover',true);
        },
        onMouseLeave: function(){
            this.$emit('mouseover',false);
        },
        onClickDelete: function(parentNote,note){
            this.$emit('delete',parentNote,note);
        },
        onAddChildNote: function(note){
            this.$emit('addChild', note);
        },
        onClickEdit: function(note){
            this.$emit('editStart', note);
        },
        onEditEnd: function(){
            this.$emit('editEnd');
        },
        addNoteOnSameLayer: function(parentNote, note){
            this.$emit('addNoteOnSameLayer',parentNote, note);
        },
        onSelect: function(note){
            this.$emit('select',note);
        }
    },
}
</script>

<style scoped lang="scss">

.note{
    margin: 10px 0;
    display: flex;
    align-items: center;
    padding: 5px;
    color: rgba(25,23,17,0.6);

    &.mouseover{
        background-color: rgb(232,231,228);
        cursor: pointer;
    }
    &.selected {
    color: black;
    background-color: rgb(232, 231, 228);
    font-weight: 600;
  }
    .note-icon{
        margin-left: 10px;
    }
    .note-name{
        width: 100%;
        padding: 3px 10px;
    }
    .note-action{
        display: flex;
        flex-direction: row;
        .button-icon {
        padding: 3px;
        margin-left: 3px;
        border-radius: 5px;
        }
    }

}
.child-note{
    padding-left: 10px;
}
</style>