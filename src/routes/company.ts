import express from 'express';
import { ExcelTable } from '../utility/ExcelTable';
import { MergedCell } from '../models/MergedCell';
import { TableStyle, AllowedThemes, CellFont, AllowedFonts, CellColor } from '../models/TableDesign';
import { TableColumn } from '../models/TableColumns';
import { SubTable } from '../models/subtable';
import { ExcelWorkbook } from '../models/ExcelWorkbook';
import { CustomError } from '../errors/CustomError';
import { BadRequestError } from '../errors/bad-request-error';
import { Company } from '../database/models/company';
import {getExportData} from '../controllers/company';

const router = express.Router();
router.get('/test', async (req, res, next) => {
    res.status(200).send("ABC");
});

router.post('/createCompany', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { name, employeeStrength, operationStartDate, adresses, quarterData } = req.body;
        let startDt: Date = new Date(operationStartDate);
        const company = Company.createNew({
            name: name,
            employeeStrength: employeeStrength,
            operationStartDate: startDt,
            adresses: adresses,
            quarterData: quarterData
        });
        await company.save();
        res.status(201).send({ company });
    }
    catch (err) {
        throw new BadRequestError(err.message);
    }
});
router.get('/export/:companyId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {companyId} = req.params;
        let excelData: ExcelWorkbook = await getExportData(companyId);
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



export { router as CompanyRoute };