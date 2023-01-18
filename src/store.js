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
        setTableRow(state, payload){
            console.log(payload.val);
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;        
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
        }

    }
    
})