<template>
    <table>
        <template>
            <tr v-for="tr in rows" :key="tr.id">
                <template>
                    <div class="cellinput-wrapper" v-for="cell in tr.table_cells" :key="cell.id">
                        <th>
                            <p>{{ cell.cell_type}}</p>
                        </th>
                        <td>
                            <input type="text" class="cellinput">
                        </td>
                        <th>
                            <p>{{ cell.cell_type}}</p>
                        </th>
                        <td>
                            <input type="text" class="cellinput">
                        </td>
                    </div>
                </template>
            </tr>
        </template>
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
                    { cell_type: "TH", id: new Date().getTime().toString(16)},
                    { cell_type: "TD", id: new Date().getTime().toString(16)},
                    { cell_type: "TH", id: new Date().getTime().toString(16)},
                    { cell_type: "TD", id: new Date().getTime().toString(16)}
                ]

            }
            ]
        }
        
    },
}
</script>

<style scoped lang="scss">

table{
    width: 100%;
    td{
        width: 80%;
        border: thin solid rgba(0,0,0,0.12);
    }
    th{
        width: 20%;
        background: #ccc;
        border: thin solid rgba(0,0,0,0.12);
    }
    .cellinput-wrapper{
        display: flex;
        flex-direction: row;
        height: 30px;
    }
    .cellinput{
        width: 100%;
    }
}
</style>