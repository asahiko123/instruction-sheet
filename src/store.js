import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initTable = {
    cell_type_th_front: '',
    cell_type_th_back: '',
    cell_type_td_front: '',
    cell_type_td_back: ''
}

export default new Vuex.Store({
    state: {
        id:  new Date().getTime().toString(16),
        rows: [
            {
                id: new Date().getTime().toString(16) + '0',
                table_cells:[
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                   
                ]

            },
        ],
        filePreview: '',
        noteList:[],
        widgetList:[],
        note:{
            id: new Date().getTime().toString(16),
            name : `新規ノート-${layer}-${targetList.length}`,
            children: [],
            mouseover: false,
            editing: false,
            selected: false,
            layer: layer,
            widgetList:[]
        },
        widget:{
            id: new Date().getTime().toString(16),
            type: null,
            text: '',
            mouseover: false,
            children: [],
            layer: null,
        }

    },
    getters: {
        getThFront: state => {
            return state.rows.filter(row => row.table_cells).filter(table_cell => table_cell.cell_type_th_front);
        }
    },
    mutations: {
        setTableRow(state, payload){
            console.log(payload.val);
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;        
        },
        setWidgetCommon(targetList,layer,index){

            layer = layer || 1;
            state.widget.id = new Date().getTime().toString(16);
            state.widget.type = layer == 1 ? 'heading' : 'body';
            state.widget.layer = layer;

            if(index == null){
                targetList.push(state.widget);
            }else{
                targetList.splice(index + 1,0,widget);
            }

        },
        setNoteCommon(targetList, layer, index){

            layer = layer || 1;
            state.note.id = new Date().getTime().toString(16);
            state.note.name = `新規ノート-${layer}-${targetList.length}`;
            state.note.children = [],
            state.note.mouseover = false,
            state.note.editing = false,
            state.noet.selected = false,
            state.note.layer = null,
            state.note.widgetList = []


            this.setWidgetCommon(note.widgetList);

            if(index == null){
                targetList.push(state.note)
            }else{
                targetList.splice(index + 1, 0 , state.note);
            }        
        },
        addNoteOnSameLayer(parentNote,note){
            const targetList = parentNote == null ? state.noteList : parentNote.children;
            const layer = parentNote == null ? 1 : state.note.layer;
            const index = targetList.typeOf(note);

            this.setNoteCommon(targetList, layer, index);
        },
        save(state){
            console.log('save');
            localStorage.setItem('table',JSON.stringify(state));
        },
        removeTable(state){
            console.log(state.rows);
            for(let cell of state.rows){
                for(let cells of cell.table_cells){
                    console.log(cells);
                    Object.assign(cells,initTable);
                }
            }
        },
        updateFilePreview(state,value){
            state.filePreview = value;
        },
        removeFilePreview(state){
            state.filePreview = '';
        }

    }
    
})