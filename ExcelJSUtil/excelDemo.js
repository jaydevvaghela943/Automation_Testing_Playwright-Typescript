const ExcelJs = require('exceljs');

async function excelTest(searchText,replaceText,change,filePath){
    //Create Workbook Environment
    const workbook = new ExcelJs.Workbook();

    //Read excel file by Workbook
    await workbook.xlsx.readFile(filePath);

    //Read sheet from workbook using getWorksheet
    const worksheet = workbook.getWorksheet("Sheet1");

    const output = await readExcel(worksheet,searchText);

    //Update exact cell value
    //const cell = worksheet.getCell(3,2);
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
}

//Make it separate function
async function readExcel(worksheet,searchText) {
    let output = {row:-1,column:-1};

     //Loop each row of worksheet
    worksheet.eachRow((row, rowNumber) => {
        
        // loop each row of cell and column combine data
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value); Find value in sheet
            if(cell.value === searchText){
                console.log(rowNumber,"===",colNumber,"====");
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

excelTest("Iphone","Mango",{rowChange:0,colChange:2},"excel_download.xlsx");