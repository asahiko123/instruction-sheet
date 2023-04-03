<template>
    <table> 
        <tr class="table-wrapper" 
            v-for="(table,tableIndex) in widget.tableList" 
            :key = "table.id">
            <!-- {{ tableIndex }} -->
            <div class="table-list"
                v-for="(list,listIndex) in table.rows" 
                :key = "list.id">
                <!-- {{ listIndex }} -->
                <div v-for="(cell,index) in list.table_cells" :key = "cell.id"  class="table-wrapper">
                    {{ index }}
                        <div class="cellinput-wrapper">
                            <th>
                                <template>
                                    <input 
                                        v-bind:value="cell.cell_type_th_front"
                                        v-limit-width style="width: 100%"
                                        v-set-font-size
                                        @input="$emit('inputCell_Th_Front',widget,$event.target.value,tableIndex,listIndex,index)"
                                        class="headerInput"
                                        >
                                </template>
                            </th>
                            <td class="cellinput">
                                <template>
                                    <input 
                                        v-bind:value="cell.cell_type_td_front"
                                        v-limit-width style="width: 100%"
                                        @input="$emit('inputCell_Td_Front',widget,$event.target.value,tableIndex,listIndex,index)"
                                        class="cellinputText" 
                                    >
                                </template>
                            </td>  
                        </div>
                        <div class="cellinput-wrapper">
                            <th>
                                <template>
                                    <input 
                                        v-bind:value="cell.cell_type_th_back"
                                        v-limit-width style="width: 100%"
                                        v-set-font-size
                                        @input="$emit('inputCell_Th_Back',widget,$event.target.value,tableIndex,listIndex,index)"
                                        class="headerInput" 
                                    >
                                </template>
                            </th>
                            <td class="cellinput">
                                <template>
                                    <input 
                                        v-bind:value="cell.cell_type_td_back"
                                        v-limit-width style="width: 100%"
                                        @input="$emit('inputCell_Td_Back',widget,$event.target.value,tableIndex,listIndex,index)"
                                        class="cellinputText" 
                                    >
                                </template>
                            </td>
                        </div>  
                </div>
            </div>
        </tr>   
    </table>
</template>

<script>
    import limitWidthDirective from '@/directive/limitWidthDirective';
    import setFontSizeDirective from '@/directive/setFontSizeDirective';
    export default{
        props:[
            'widget'
        ],
        directives: {
            'limit-width': limitWidthDirective,
            'set-font-size': setFontSizeDirective
        }
    }

</script>


<style scoped lang="scss">
table {
  width: 100%;
  display: block;
  input {
    border: none;
    width: 100%;
  }

  .headerInput {
    font-weight: bold;
    background: rgba(195, 182, 182, 0.12);
  }

  td {
    width: 60%;
    border: thin solid rgba(195, 182, 182, 0.12);
  }
  th {
    width: 50%;
    background: #ccc;
    border: thin solid rgba(195, 182, 182, 0.12);
  }
  .table-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .table-list {
    flex-grow: 1;
  }
  .cellinput {
    width: 100%;
  }
}
</style>