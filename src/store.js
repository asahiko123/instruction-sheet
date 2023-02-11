import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        
        id: new Date().getTime().toString(16),
        tableList:[],
        filePreview: '',
        noteList:[],
        widgetList:[],
        table:{

        },
        note:{
            id: new Date().getTime().toString(16),
            name : null,
            children: [],
            mouseover: false,
            editing: false,
            selected: false,
            layer: 1,
            widgetList:[]
        },
        widget:{
            id: new Date().getTime().toString(16),
            type: null,
            text: '',
            mouseover: false,
            children: [],
            layer: null,
        },
        table:
            {
                id : new Date().getTime().toString(16) + new Date().getSeconds().toString(16),
                rows: [
                    {
                        id: new Date().getTime().toString(16),
                        table_cells:[
                            {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                            {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                        
                        ]

                    },
                ],
                selected: false,
            }
        },
    getters: {
        // getThFront: state => {
        //     return state.rows.filter(row => row.table_cells).filter(table_cell => table_cell.cell_type_th_front);
        // }
    },
    mutations: {
        setTableRow(state, payload){
            console.log(payload);
            console.log('ggggg');
            // state.tableList.push({
            //     rows: [
            //         {
            //             id: new Date().getTime().toString(16),
            //             table_cells:[
            //                 {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
            //                 {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
            //                 {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
            //                 {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: ''},
                        
            //             ]

            //         },
            //     ],
            //     selected: false,
            // });

            state.tableList[tableList.length - 1].table_cells[payload.index].cell_type_th_front = payload.val;
            state.tableList[tableList.length - 1].table_cells[payload.index].cell_type_th_back = payload.val;
            state.tableList[tableList.length - 1].table_cells[payload.index].cell_type_td_front = payload.val;
            state.tableList[tableList.length - 1].table_cells[payload.index].cell_type_td_back = payload.val;
        },
        addTable(state){
            state.tableList.push(state.table);
        },
        // setWidgetCommon(targetList,layer,index){

        //     layer = layer || 1;
        //     state.widget.id = new Date().getTime().toString(16);
        //     state.widget.type = layer == 1 ? 'heading' : 'body';
        //     state.widget.layer = layer;

        //     if(index == null){
        //         targetList.push(state.widget);
        //     }else{
        //         targetList.splice(index + 1,0,widget);
        //     }

        // },
        // setNoteCommon(targetList, layer, index){

        //     layer = layer || 1;
        //     state.note.id = new Date().getTime().toString(16);
        //     state.note.layer = layer,
        //     state.note.name = `新規ノート-${layer}-${targetList.length}`;
        //     state.note.children = [],
        //     state.note.mouseover = false,
        //     state.note.editing = false,
        //     state.noet.selected = false,
        //     state.note.widgetList = []


        //     this.setWidgetCommon(note.widgetList);

        //     if(index == null){
        //         targetList.push(state.note)
        //     }else{
        //         targetList.splice(index + 1, 0 , state.note);
        //     }        
        // },
        // addNoteOnSameLayer(parentNote,note){
        //     const targetList = parentNote == null ? state.noteList : parentNote.children;
        //     const layer = parentNote == null ? 1 : state.note.layer;
        //     const index = targetList.typeOf(note);

        //     this.setNoteCommon(targetList, layer, index);
        // },
        save(state){
            console.log('save');
            localStorage.setItem('table',JSON.stringify(state));
        },
        removeTable(state){
            console.log(state.tableList);
            for(let table in state.tableList){
                for(let cells in table.rows){
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
        },

    }
    
})