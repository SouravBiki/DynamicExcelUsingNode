"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelTable = void 0;
const Excel = __importStar(require("exceljs"));
const fs = __importStar(require("fs"));
var uuid = require('uuid');
class ExcelTable {
    constructor(reports) {
        this.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        this.font = { size: 12, bold: true };
        this._reports = reports;
    }
    getTable() {
        return new Promise((resolve, reject) => {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Report');
            //Form The Excel File
            //Loop through all the subtables to be created inside the excel sheet
            this._reports.reports.forEach(report => {
                //current last row number of excel which has some data
                let lastRowNum = worksheet.rowCount;
                let col = report.startColumn ? report.startColumn.toUpperCase() : 'A';
                let rowNum = report.startRow ? report.startRow : lastRowNum + 1;
                //Loop through all the headers and print it's name inside excel sheet with formatting
                report.headers.forEach(header => {
                    let cell = worksheet.getCell(col + rowNum);
                    cell.value = header.name;
                    //cell.border = this.border;
                    let nameCol = worksheet.getColumn(col);
                    if (header.format) {
                        nameCol.numFmt = header.format;
                    }
                    nameCol.width = header.width;
                    //nameCol.border = this.border;
                    //cell.font = report.headers[i].font;
                    col = this.nextColumn(col);
                });
                //Loop through all the rows to be added under the header
                report.rows.forEach(row => {
                    rowNum++;
                    let cell = worksheet.getCell(col + rowNum);
                    //Loop through each value in each row data and print it
                    row.values.forEach(value => {
                        cell.value = value;
                        col = this.nextColumn(col);
                    });
                });
            });
            //End of Forming Excel
            const guidForClient = uuid.v1();
            let pathNameWithGuid = `${guidForClient}_result.xlsx`;
            workbook.xlsx.writeFile(pathNameWithGuid).then(() => {
                let stream = fs.createReadStream(pathNameWithGuid);
                stream.on("close", () => {
                    fs.unlink(pathNameWithGuid, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                });
                resolve(stream);
            }, (err) => {
                throw err;
            });
        });
    }
    nextColumn(current) {
        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return alphabet[alphabet.indexOf(current) + 1];
    }
}
exports.ExcelTable = ExcelTable;
//# sourceMappingURL=ExcelTable.js.map