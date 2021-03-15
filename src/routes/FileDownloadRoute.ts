import express from 'express';
import { ExcelTable } from '../utility/ExcelTable';
import { MergedCell } from '../models/MergedCell';
import { TableStyle } from '../models/TableStyle';
import { TableColumn } from '../models/TableColumns';
import { SubTable } from '../models/subtable';
import { ExcelWorkbook } from '../models/ExcelWorkbook';


const router = express.Router();
router.get('/test', async (req, res, next) => {
    res.status(200).send("ABC");

});

router.get('/exportExcel', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let wbHeader: MergedCell = {
            title: "My First Excel Export Using ExcelJS",
            textColor: "white",
            bcgColor: "black",
            colSpan: 3,
            skipColumns: 2,
            rowSpan: 2
        }
        let wbFooter: MergedCell = {
            title: "My First Excel Export Using ExcelJS Ends Here",
            textColor: "white",
            bcgColor: "black",
            colSpan: 3,
            skipColumns: 2,
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
            showRowStripes: true
        }

        let wbSubTable1Data: Array<Array<any>> = [
            ["A", 1, "XYZ"],
            ["B", 2, "ZXY"],
            ["C", 3, "YXZ"],
            ["D", 4, "XZY"],
            ["E", 5, "ZYX"],
        ]
        let wbSubTable1: SubTable = {
            columns: wbSubTable1Column,
            name: "Employee",
            rows: wbSubTable1Data,
            skipRows: 2,
            style: wbSubTable1Style
        }


        let wbSubTable2Column: TableColumn[] = [
            {
                name: "Month",
                filterButton: true
            },
            {
                name: "Profit",
                filterButton: true
            }
        ];

        let wbSubTable2Style: TableStyle = {
            showRowStripes: true
        }

        let wbSubTable2Data: Array<Array<any>> = [
            ["Apr-Jun", "3.2%"],
            ["Jul-Sep", "4.3%"],
            ["Oct-Dec", "5.8%"],
            ["Jan-Mar", "1.2%"],
        ]
        let wbSubTable2: SubTable = {
            columns: wbSubTable2Column,
            name: "Quarter Profits",
            rows: wbSubTable2Data,
            headerRow: false,
            //skipRows:2,
            style: wbSubTable2Style
        }


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
            showRowStripes: true
        }

        let wbSubTable3Data: Array<Array<any>> = [
            ["WB", 12345],
            ["MUM", 20000]
        ]
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
        res.status(500).json(err);
    }
})



export { router as FileDownloadRoute };