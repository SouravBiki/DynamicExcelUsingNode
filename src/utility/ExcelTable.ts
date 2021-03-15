import * as Excel from "exceljs";
import { ExcelWorkbook } from '../models/ExcelWorkbook';
import { ExcelCellLocation } from '../models/ExcelCellLocation';
import { MergedCell } from "../models/MergedCell";
export class ExcelTable {
    public border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    public font = { size: 12, bold: true };

    buildExcelSheet(wb: ExcelWorkbook): Excel.Workbook {
        const { workbookHeader, workbookExportName, sheetName, subTables, workbookFooter } = wb;
        const workbook = new Excel.Workbook();
        const worksheet: Excel.Worksheet = workbook.addWorksheet(sheetName);

        if (workbookHeader) {
            this.processMergedCell(workbookHeader, worksheet, "H", workbook);
        }

        this.processSubTables(subTables, worksheet);

        if (workbookFooter) {
            this.processMergedCell(workbookFooter, worksheet, "F", workbook);
        }

        return workbook;

    }

    private processSubTables(subTables: import("../models/subtable").SubTable[], worksheet: Excel.Worksheet) {
        let startCell: ExcelCellLocation = {
            rowNum: 1,
            columnName: "A"
        };
        subTables.forEach(subtable => {
            let lastRowWithData: number = worksheet.rowCount;

            if (subtable.skipRows)
                startCell = this.determineStartCell(subtable.skipRows, subtable.skipColumns, lastRowWithData, worksheet);

            else
                startCell = this.determineStartCell(subtable.skipRows, subtable.skipColumns, lastRowWithData, worksheet, startCell.rowNum);
            worksheet.addTable({
                name: subtable.name,
                ref: startCell.columnName + startCell.rowNum,
                headerRow: subtable.headerRow,
                totalsRow: subtable.totalsRow,
                style: subtable.style ? subtable.style : {},
                columns: subtable.columns,
                rows: subtable.rows,
            });
        });
    }

    private processMergedCell(
        mergedCellProps: MergedCell,
        worksheet: Excel.Worksheet,
        type: string | undefined,
        workbook: Excel.Workbook): void {

        const { title, imgFilePath, bcgColor, cellFont, skipColumns, skipRow, colSpan, rowSpan } = mergedCellProps;
        let headerStartRowNum = 1;
        if (type == "F")
            headerStartRowNum = worksheet.rowCount + 1
        if (skipRow)
            headerStartRowNum += skipRow;
        let headerStartColumn = "A";
        if (skipColumns)
            headerStartColumn = this.nextColumn(headerStartColumn, skipColumns);
        let headerStartCell = headerStartColumn + headerStartRowNum;
        let headerEndRowNum = headerStartRowNum;
        let headerEndColumn = headerStartColumn;
        if (rowSpan)
            headerEndRowNum = headerStartRowNum + rowSpan;
        if (colSpan)
            headerEndColumn = this.nextColumn(headerStartColumn, colSpan);
        let headerEndCell = headerEndColumn + headerEndRowNum;
        if (imgFilePath) {
            let logo = workbook.addImage({
                filename: imgFilePath,
                extension: 'png',
            });
            worksheet.addImage(logo, `${headerStartCell}:${headerEndCell}`);
        }
        else {
            worksheet.getCell(headerStartCell).value = title;
            console.log(headerEndCell);
            worksheet.mergeCells(`${headerStartCell}:${headerEndCell}`);
            if (cellFont)
                worksheet.getCell(headerStartCell).font = cellFont;
            worksheet.getCell(headerStartCell).fill = {
                type: 'pattern',
                pattern: 'solid',
                bgColor: bcgColor
            };
        }
    }



    nextColumn(current: string, nextColumnTravel: number = 1): string {
        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return alphabet[alphabet.indexOf(current) + nextColumnTravel];
    }

    determineStartCell(skipRows: number | undefined,
        skipColumns: number | undefined,
        lastRowWithData: number,
        ws: Excel.Worksheet,
        startRowNum: number = -1): ExcelCellLocation {
        let finalRow: number = 1;
        let finalColumn: string = "A";
        let finalCell: ExcelCellLocation = {
            rowNum: 1,
            columnName: "A"
        };
        if (startRowNum > -1)
            finalRow = startRowNum;
        else {
            if (skipRows)
                finalRow = lastRowWithData + 1 + skipRows;
            else
                finalRow = lastRowWithData + 1;
        }

        let currentRowCellCount = ws.getRow(finalRow).cellCount;

        if (skipColumns)
            finalColumn = this.nextColumn("A", currentRowCellCount == 0 ? currentRowCellCount + skipColumns : currentRowCellCount + skipColumns + 1);
        else
            finalColumn = this.nextColumn("A", currentRowCellCount == 0 ? currentRowCellCount : currentRowCellCount + 1);

        finalCell.columnName = finalColumn;
        finalCell.rowNum = finalRow;

        return finalCell;
    }
}


