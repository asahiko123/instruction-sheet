import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id:  new Date().getTime().toString(16),
        rows: [
            {
                id: new Date().getTime().toString(16) + '0',
                table_cells:[
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '',id :new Date().getTime().toString(16) + '1'},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '',id :new Date().getTime().toString(16) + '2'},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '',id :new Date().getTime().toString(16) + '3'},
                    {cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '',id :new Date().getTime().toString(16) + '4'},
                   
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
            
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            this.save(state);
        },
        setSecondRow(state, payload){
            
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            this.save(state);
        },
        setTdFront(state, payload){
            
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            this.save(state);
        },
        setTdBack(state, payload){
            state.rows.table_cells[payload.index].cell_type_th_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_th_back = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_front = payload.val;
            state.rows.table_cells[payload.index].cell_type_td_back = payload.val;
            this.save(state);
        },
        save(state){
            console.log('save');
            localStorage.setItem('store',JSON.stringify(state));
        },
        load(state){
            if(localStorage.getItem('store')){
                const store = JSON.parse(localStorage.getItem('store'));
                this.replaceState(Object.assign(state,store));
            }
        }
    },
    actions: {
        loading({ commit }){
        commit('load');
        }
    }
    
})