<template>
    <table>
        <div v-for="tr in rows" :key="tr.id" >
            <tr v-for="(cell,index) in tr.table_cells" :key="cell.id" class="table-wrapper">
                <div class="cellinput-wrapper">
                    <th>
                        <template>
                            <input 
                                type="text" 
                                class="headerInput" 
                                @change="onInput(index, $event.target.value)"
                                v-model="cell.cell_type_th_front"
                                >
                        </template>
                    </th>
                    <td class="cellinput">
                        <template>
                            <input 
                                type="text" 
                                class="cellinputText" 
                                @change="onInput(index, $event.target.value)"
                                v-model="cell.cell_type_td_front"
                            >
                        </template>
                    </td>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </div>
                <div class="cellinput-wrapper">
                    <th>
                        <template>
                            <input 
                            type="text" 
                            class="headerInput" 
                            @change="onInput(index, $event.target.value)"
                            v-model="cell.cell_type_th_back"
                            >
                        </template>
                    </th>
                    <td class="cellinput">
                        <template>
                            <input 
                            type="text" 
                            class="cellinputText" 
                            @change="onInput(index, $event.target.value)"
                            v-model="cell.cell_type_td_back"
                            >
                        </template>
                    </td>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </div>
            </tr>
        </div>
    </table>
</template>

<script>
import store from '../../store'
export default{
    name: 'TableItem',
    data(){
        return{
            // rows: [
            // {
            //     id: new Date().getTime().toString(16)+'0',
            //     table_cells:[
            //         { cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '', id: new Date().getTime().toString(16) + '1'},
            //         { cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '', id: new Date().getTime().toString(16) + '2'},
            //         { cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '',id: new Date().getTime().toString(16) + '3'},
            //         { cell_type_th_front: '',cell_type_th_back: '',cell_type_td_front: '',cell_type_td_back: '', id: new Date().getTime().toString(16) + '4'}
            //     ]
            // },
            // ]

        }
        
    },
    methods: {
        onInput : function(index, val){
            console.log('onInput');
            if(index == 1){
                console.log('1');
                store.commit('setFirstRow',{index, val});
            }else if(index == 2){
                console.log('2');
                store.commit('setSecondRow',{index, val});
            }else if(index == 3){
                console.log('3');
                store.commit('setThirdRow',{index, val});
            }else{
                console.log('4');
                store.commit('setForthRow',{index, val});
            }
            
        }
    },
    computed: {
        rows() {
            return store.state.rows;
        }
    }
}
</script>

<style scoped lang="scss">

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
</style>