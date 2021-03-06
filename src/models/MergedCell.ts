import { CellColor, CellFont } from "./TableDesign";

export interface MergedCell {
    title?: string;
    imgFilePath?: string;
    skipRow?: number;
    skipColumns?: number;
    rowSpan?: number;
    colSpan?: number;
    cellFont?: CellFont;
    bcgColor?: CellColor;
}