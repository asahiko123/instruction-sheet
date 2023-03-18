<template>
    <div class="table-wrapper">
    <table>
        <div v-for="tr in tableList" :key="tr.id">
            <div v-for="list in tr.rows" :key="list.id">
                {{ list }}
            <div v-for="cell in list.table_cells" :key="cell.id" class="table-wrapper">
            
                <div class="cellinput-wrapper">
                <tr>
                    <th>
                        <template>
                            <input 
                                type="text" 
                                class="ThInput" 
                                v-limit-width style="width: 10px;"
                                key="th-input"
                                @change="onInput(index, $event.target.value)"
                                v-model="cell.cell_type_th_front"
                                >
                        </template>
                    </th>
                    <td class="cellinput">
                        <template>
                            <input 
                                type="text" 
                                class="TdInput" 
                                key="td-input"
                                v-limit-width style="width: 10px;"
                                @change="onInput(index, $event.target.value)"
                                v-model="cell.cell_type_td_front"
                            >
                        </template>
                    </td>
                </tr>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </div>
                <div class="cellinput-wrapper">
                <tr>
                    <th>
                        <template>
                            <input 
                            type="text" 
                            class="ThInput" 
                            key="th-input-sub"
                            v-limit-width style="width: 10px;"
                            @change="onInput(index, $event.target.value)"
                            v-model="cell.cell_type_th_back"
                            >
                        </template>
                    </th>
                    <td>
                        <template>
                            <input 
                            type="text" 
                            class="TdInput" 
                            key="td-input-sub"
                            v-limit-width style="width: 10px;"
                            @change="onInput(index, $event.target.value)"
                            v-model="cell.cell_type_td_back"
                            >
                        </template>
                    </td>
                    <!-- <td class="cellinput"><input type="text" class="cellinputText"></td> -->
                </tr>
                </div>
            
            </div>
            </div>
        </div>
    </table>
    
    </div>
</template>

<script>
import store from '../../store'
import limitWidthDirective from '../../directive/limitWidthDirective'
export default{
    name: 'TableItem',
    // props:[
    //     'table',
        
    // ],
    created(){
        // store.commit('initTable');
        const localDataTable = localStorage.getItem('table');
        if(localDataTable != null){
            console.log('created!')
            store.replaceState(JSON.parse(localDataTable));

        }
    },
    methods: {
        onInput : function(index, val){
                console.log('cccccc');
                store.commit('setTableRow',{index, val});
        },
        onSelect: function(key){
            console.log('ccc')
            store.commit('onSelect',key);
        }
    },
    computed:{
        
        tableList(){
            
            if(store.state.tableList.length === 0){
                console.log('ccd')
                store.commit('addTable');
            }
            console.log('ccd-1')
            return store.state.tableList;
        },

    },
    directives:{
        'limit-width' : limitWidthDirective
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
        border-collapse: collapse;
        width: 100%;
    }

    .cellinput-wrapper{
        width: 50%;
        display: flex;
        flex-direction: row;
        height: 30px;
        border: thin solid rgba(0,0,0,0.12);
    }
    input{
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        border: none;
        background: transparent;
        box-shadow: none;
        outline: none;
    }

    input.ThInput{
        font-weight: bold;
        background: rgba(195, 182, 182, 0.12);
        }
    input.TdInput{
            border: none;
            margin: 0;
        }
}

@media(max-width: 787px){
    table{
        display: block;

        th{
            display: block;
        }
        td{
            display: block;
        }
    }

}
</style>