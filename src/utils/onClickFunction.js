import ExcelJS from 'exceljs'

function onClickButtonDownloadXlsx(targetNote){

    console.log(targetNote)

    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet(`${targetNote.name}`)
    const worksheet = workbook.getWorksheet(`${targetNote.name}`)

    const title = worksheet.getCell('B2')
    title.value = `${targetNote.name}`


    targetNote.widgetList.forEach((widget,index) => {
 
        switch(widget.type){
            case 'table':
                console.log('table')
                widget.tableList[0].rows[0].table_cells.forEach((cell,index) => {

                    worksheet.addRow({
                        id: widget.tableList.id,
                        cell_type_td_front: cell.cell_type_td_front,
                        cell_type_td_back: cell.cell_type_td_back,
                        cell_type_th_front: cell.cell_type_th_front,
                        cell_type_th_back: cell.cell_type_th_back
                    })
                })
                return 'table'
            case 'heading':
                console.log('heading')
                worksheet.addRow({
                    id: widget.id,
                    text: widget.text
                })
                return 'heading'
            case 'image': 
            console.log('image')
                return 'image'
        }
    })

    const buffer = workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    console.log(downloadUrl)
    link.href = downloadUrl
    link.download = `${targetNote.name}`
    link.click()
    link.remove()
}



export  { onClickButtonDownloadXlsx }