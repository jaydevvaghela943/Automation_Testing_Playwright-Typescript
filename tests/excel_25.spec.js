const {test, expect} = require('@playwright/test');
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


//Excel Download and Upload Utilities
test("Excel Download Upload Validation",async({page})=>{
     const searchText = "Mango";
    const updateValue= 365;

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:'Download'}).click();
    const download = await downloadPromise;

    await download.saveAs(`downloads/${download.suggestedFilename()}`);

    console.log('Downloaded:', download.suggestedFilename());

    await page.waitForTimeout(2000);

    await excelTest(searchText,updateValue,{rowChange:0,colChange:2},"downloads/download.xlsx");

    //Work if input has attribute type=file
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("downloads/download.xlsx");

   
    const textLocator = await page.getByText(searchText);

    //select Specific row
    const desireRow = await page.getByRole('row').filter({has:textLocator});
    await expect(desireRow.locator("#cell-4-undefined")).toContainText(String(updateValue));

    await page.waitForTimeout(5000);



});