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
        ]
    },
    getters: {
        getThFront: state => {
            return state.rows.filter(row => row.table_cells).filter(table_cell => table_cell.cell_type_th_front);
        }
    },
    mutations: {
        setFirstRow(state, payload){
            console.log('saveFirst');
            console.log(payload.val);
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            
        },
        setSecondRow(state, payload){
            console.log('saveSecond');
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            
        },
        setThirdRow(state, payload){
            console.log('saveThird');
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            
        },
        setForthRow(state, payload){
            console.log('saveForth');
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            
        },
        save(state){
            console.log('save');
            localStorage.setItem('table',JSON.stringify(state));
        },
        removeTable(rows){
            console.log('remove');
            for(let cells in rows){
                for(let cell in cells.table_cells){
                    console.log(cell);
                    Object.assign(cell,initTable);
                }
            }
        }

    }
    
})