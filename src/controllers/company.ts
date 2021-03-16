import { ExcelWorkbook } from "../models/ExcelWorkbook";
import { MergedCell } from "../models/MergedCell";
import { AllowedFonts, AllowedThemes, CellColor, CellFont, TableStyle } from "../models/TableDesign";
import { TableColumn } from '../models/TableColumns';
import { SubTable } from "../models/subtable";
import { Company, CompanyDoc, CompnayAttributes } from "../database/models/company";
import { addSyntheticTrailingComment } from "typescript";

export async function getExportData(companyId: any): Promise<ExcelWorkbook> {
    return new Promise<ExcelWorkbook>(async (resolve, reject) => {
        try {
            let textColor: CellColor = { argb: "FFFFFF00" };
            let bcgColor: CellColor = { argb: "FF0000FF" };
            let font: CellFont = {
                name: AllowedFonts.Cosmic,
                bold: true,
                family: 2,
                size: 14,
                italic: true,
                color: textColor,
                underline: false
            }
            let wbHeader: MergedCell = {
                title: "My First Excel Export Using ExcelJS",
                cellFont: font,
                bcgColor: bcgColor,
                colSpan: 7,
                //skipColumns: 2,
                rowSpan: 2,
                imgFilePath: "./src/static/images/ExcelLogo.PNG"
            }
            let wbFooter: MergedCell = {
                title: "My First Excel Export Using ExcelJS Ends Here",
                cellFont: font,
                bcgColor: bcgColor,
                colSpan: 7,
                //skipColumns: 2,
                skipRow: 2,
                rowSpan: 2
            }
            //Fetch Data From Mongo
            const cp = await Company.find({ _id: companyId });
            let wbSubTable1: SubTable = getTopSubTableData(cp);
            let wbSubTable2: SubTable = getMiddleRowLeftTable(cp);
            let wbSubTable3: SubTable = getMiddleRowRightTable(cp);

            let excelData: ExcelWorkbook = {
                sheetName: "Company Data",
                subTables: [wbSubTable1, wbSubTable2, wbSubTable3],
                workbookExportName: "FirstExcel",
                workbookHeader: wbHeader,
                workbookFooter: wbFooter
            }

            resolve(excelData);
        }
        catch (err) {
            reject(err);
        }

    });
}

function getMiddleRowRightTable(cp: CompanyDoc[]) {
    let wbSubTable3Column: TableColumn[] = [
        {
            name: "Quarter",
            filterButton: true
        },
        {
            name: "Profit (in %)",
            filterButton: false
        }
    ];

    let wbSubTable3Style: TableStyle = {
        theme: AllowedThemes.Medium,
        showRowStripes: true
    };
    let wbSubTable3Data: Array<Array<any>> = [];
    cp.forEach(c => {
        c.quarterData.forEach(q => {
            var currData: Array<any> = [];
            currData.push(q.name);
            currData.push(q.profit);
            wbSubTable3Data.push(currData);
        });
    });

    let wbSubTable3: SubTable = {
        columns: wbSubTable3Column,
        name: "StateEmployee",
        rows: wbSubTable3Data,
        skipRows: 2,
        skipColumns: 2,
        style: wbSubTable3Style
    };
    return wbSubTable3;
}

function getMiddleRowLeftTable(cp: CompanyDoc[]) {
    let wbSubTable2Column: TableColumn[] = [
        {
            name: "Month"
        },
        {
            name: "Profit"
        }
    ];

    let wbSubTable2Style: TableStyle = {
        theme: AllowedThemes.Light,
        showRowStripes: true
    };

    let wbSubTable2Data: Array<Array<any>> = [];
    cp.forEach(c => {
        c.adresses.forEach(address => {
            var currData: Array<any> = [];
            currData.push(address.state);
            currData.push(address.employeeNum);
            wbSubTable2Data.push(currData);
        });
    });

    let wbSubTable2: SubTable = {
        columns: wbSubTable2Column,
        name: "QuarterProfits",
        rows: wbSubTable2Data,
        //skipColumns:1,
        style: wbSubTable2Style
    };
    return wbSubTable2;
}

function getTopSubTableData(cp: CompanyDoc[]) {
    let wbSubTable1Column: TableColumn[] = [
        {
            name: "Name",
            filterButton: false
        },
        {
            name: "Employee Strength",
            filterButton: false
        },
        {
            name: "Start Date",
            filterButton: false
        }
    ];
    let wbSubTable1Style: TableStyle = {
        theme: AllowedThemes.Dark,
        showRowStripes: true
    };

    let wbSubTable1Data: Array<Array<any>> = [];
    cp.forEach(element => {
        var currData: Array<any> = [];
        currData.push(element.name);
        currData.push(element.employeeStrength);
        currData.push(element.operationStartDate);
        wbSubTable1Data.push(currData);
    });
    let wbSubTable1: SubTable = {
        columns: wbSubTable1Column,
        name: "Employee",
        rows: wbSubTable1Data,
        skipRows: 4,
        skipColumns: 1,
        style: wbSubTable1Style
    };
    return wbSubTable1;
}
