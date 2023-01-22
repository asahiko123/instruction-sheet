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
            

        }
        
    },
    created(){
        store.commit('initTable');
        const localDataTable = localStorage.getItem('table');
        if(localDataTable != null){
            console.log('created!')
            store.replaceState(JSON.parse(localDataTable));

        }
    },
    methods: {
        onInput : function(index, val){
                console.log('onInput');
                store.commit('setTableRow',{index, val});
        }
    },
    computed: {
        rows(){
            return store.state.tableList[0].rows;
        }
    },
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