import express from 'express';
import { ExcelTable } from '../utility/ExcelTable';
import { MergedCell } from '../models/MergedCell';
import { TableStyle, AllowedThemes, CellFont, AllowedFonts, CellColor } from '../models/TableDesign';
import { TableColumn } from '../models/TableColumns';
import { SubTable } from '../models/subtable';
import { ExcelWorkbook } from '../models/ExcelWorkbook';
import { CustomError } from '../errors/CustomError';
import { BadRequestError } from '../errors/bad-request-error';


const router = express.Router();
router.get('/test', async (req, res, next) => {
    res.status(200).send("ABC");
});

router.get('/exportExcel', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        let textColor:CellColor = {argb:"FFFFFF00"};
        let bcgColor:CellColor = {argb:"FF0000FF"};
        let font:CellFont={
            name:AllowedFonts.Cosmic,
            bold:true,
            family:2,
            size:14,
            italic:true,
            color:textColor,
            underline:false
        }
        let wbHeader: MergedCell = {
            title: "My First Excel Export Using ExcelJS",
            cellFont:font,
            bcgColor: bcgColor,
            colSpan: 7,
            //skipColumns: 2,
            rowSpan: 2,
            imgFilePath:"./src/static/images/ExcelLogo.PNG"
        }
        let wbFooter: MergedCell = {
            title: "My First Excel Export Using ExcelJS Ends Here",
            cellFont:font,
            bcgColor: bcgColor,
            colSpan: 7,
            //skipColumns: 2,
            skipRow: 2,
            rowSpan: 2
        }
        let wbSubTable1Column: TableColumn[] = [
            {
                name: "Name",
                filterButton: true
            },
            {
                name: "EmployeeId",
                filterButton: true
            },
            {
                name: "Address",
                filterButton: false
            }

        ];
        let wbSubTable1Style: TableStyle = {
            theme:AllowedThemes.Dark,
            showRowStripes: true
        }

        let wbSubTable1Data: Array<Array<any>> = [
            ["A", 1, "XYZ"],
            ["B", 2, "ZXY"],
            ["C", 3, "YXZ"],
            ["D", 4, "XZY"],
            ["E", 5, "ZYX"]
        ]
        


        let wbSubTable2Column: TableColumn[] = [
            {
                name: "Month"
            },
            {
                name: "Profit"
            }
        ];

        let wbSubTable2Style: TableStyle = {
            theme:AllowedThemes.Light,
            showRowStripes: true
        }

        let wbSubTable2Data: Array<Array<any>> = [
            ["Apr", 3.2],
            ["Jul", 4.3],
            ["Oct", 5.8],
            ["Jan", 1.2]
        ]

        let wbSubTable3Column: TableColumn[] = [
            {
                name: "State",
                filterButton: true
            },
            {
                name: "Employee Strength",
                filterButton: true
            }
        ];

        let wbSubTable3Style: TableStyle = {
            theme:AllowedThemes.Medium,
            showRowStripes: true
        }

        let wbSubTable3Data: Array<Array<any>> = [
            ["WB", 12345],
            ["MUM", 20000]
        ]

        let wbSubTable1: SubTable = {
            columns: wbSubTable1Column,
            name: "Employee",
            rows: wbSubTable1Data,
            skipRows: 2,
            skipColumns: 1,
            style: wbSubTable1Style
        }

        let wbSubTable2: SubTable = {
            columns: wbSubTable2Column,
            name: "QuarterProfits",
            rows: wbSubTable2Data,
            //skipColumns:1,
            style: wbSubTable2Style
        }

        let wbSubTable3: SubTable = {
            columns: wbSubTable3Column,
            name: "StateEmployee",
            rows: wbSubTable3Data,
            skipRows: 2,
            skipColumns: 2,
            style: wbSubTable3Style
        }

        let excelData: ExcelWorkbook = {
            sheetName: "Company Data",
            subTables: [wbSubTable1, wbSubTable2, wbSubTable3],
            workbookExportName: "FirstExcel",
            workbookHeader: wbHeader,
            workbookFooter: wbFooter
        }

        const exTable: ExcelTable = new ExcelTable();
        const workbook = exTable.buildExcelSheet(excelData);
        var fileName = 'FirstExcel.xlsx';
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        await workbook.xlsx.write(res);

        res.end();
    }
    catch (err) {
        throw new BadRequestError(`Excel Generation failed due to ${err.message}`);
    }
})



export { router as FileDownloadRoute };