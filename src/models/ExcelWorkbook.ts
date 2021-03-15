import { SubTable } from './subtable';
import { MergedCell } from './MergedCell';
export interface ExcelWorkbook{
    workbookHeader?: MergedCell;
    workbookExportName: string;
    sheetName:string;
    subTables: Array<SubTable>;
    workbookFooter?: MergedCell;
}