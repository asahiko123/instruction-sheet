<template>
    <div class="table-wrapper">
    <table>
            <div class="table-wrapper">
            
                <div class="cellinput-wrapper">
                    <th>
                        <template>
                            <input 
                                v-bind:value="table.rows.table_cells.cell_type_th_front"
                                @input="$emit('inputCell_Th_Front',$event.target.value)"
                                >
                        </template>
                    </th>
                    <td class="cellinput">
                        <template>
                            <input 
                                v-bind:value="table.rows.table_cells.cell_type_td_front"
                                @input="$emit('inputCell_Td_Front',$event.target.value)"
                            >
                        </template>
                    </td>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </div>
                <div class="cellinput-wrapper">
                    <th>
                        <template>
                            <input 
                                v-bind:value="table.rows.table_cells.cell_type_th_back"
                                @input="$emit('inputCell_Th_Back',$event.target.value)"
                            >
                        </template>
                    </th>
                    <td class="cellinput">
                        <template>
                            <input 
                                v-bind:value="table.rows.table_cells.cell_type_td_back"
                                @input="$emit('inputCell_Td_Back',$event.target.value)"
                            >
                        </template>
                    </td>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </div>
            
            </div>
    </table>
    </div>

</template>

<script>
import store from '../../store'
export default{
    name: 'TableItem',
    props:[
        'table',
        
    ],
    created(){
        // store.commit('initTable');
        const localDataTable = localStorage.getItem('table');
        if(localDataTable != null){
            console.log('created!')
            store.replaceState(JSON.parse(localDataTable));

        }
    },
    methods: {

    },
    computed:{
        
        // tableList(){
            
        //     if(store.state.tableList.length === 0){
        //         console.log('ccd')
        //         store.commit('addTable');
        //     }
        //     console.log('ccd-1')
        //     return store.state.tableList;
        // },

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