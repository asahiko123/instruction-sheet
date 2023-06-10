import ExcelJS from 'exceljs'

function onClickButtonDownloadXlsx(targetNote){

    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet(`${targetNote.name}`)

    const excelData = targetNote.widgetList.map((widget,index) => {
 
        switch(widget.type){
            case 'table':
                console.log('table')
                return 'table'
            case 'heading':
                console.log('heading')
                return 'heading'
            case 'image': 
            console.log('image')
                return 'image'
        }
    })



}



export  { onClickButtonDownloadXlsx }