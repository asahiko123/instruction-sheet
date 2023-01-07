<template>
    <table>
        <div v-for="tr in rows" :key="tr.id" >
            <tr v-for="cell in tr.table_cells" :key="cell.id" class="table-wrapper">
                <div class="cellinput-wrapper">
                    <th>{{ cell.cell_type_front }}</th>
                    <td class="cellinput"><input type="text" class="cellinputText"></td>
                </div>
                <div class="cellinput-wrapper">
                    <th>{{ cell.cell_type_back }}</th>
                    <td class="cellinput"><input type="text" class="cellinputText"></td>
                </div>
            </tr>
        </div>
    </table>
</template>

<script>
export default{
    name: 'TableItem',
    data(){
        return{
            rows: [
            {
                id: new Date().getTime().toString(16),
                table_cells:[
                    { cell_type_front: "TD",cell_type_back: "TD", id: new Date().getTime().toString(16)},
                    { cell_type_front: "TH",cell_type_back: "TH", id: new Date().getTime().toString(16)},
                    { cell_type_front: "TH",cell_type_back: "TH",id: new Date().getTime().toString(16)},
                    { cell_type_front: "TD",cell_type_back: "TH", id: new Date().getTime().toString(16)}
                ]

            },
            ]
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
    input.cellinputText{
        width: 100%;
    }
}
</style>