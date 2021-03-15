import {TableColumn} from './TableColumns';
import {TableStyle} from './TableStyle';
export interface SubTable {
  name: string;
  skipRows?: number;
  skipColumns?: number;
  headerRow?:boolean;
  totalsRow?: boolean;
  style?: TableStyle,
  columns: Array<TableColumn>,
  rows: Array<Array<any>>,
}