export interface TableStyle {
    theme: AllowedThemes;
    showFirstColumn?: boolean;
    showLastColumn?: boolean;
    showRowStripes?: boolean;
    showColumnStripes?: boolean;
}

export enum AllowedThemes {
    Light = "TableStyleLight15",
    Medium = "TableStyleMedium2",
    Dark = "TableStyleDark2"
}

export interface CellFont {
    name: AllowedFonts,
    color: CellColor,
    family: number;
    size: number;
    italic: boolean;
    bold: boolean;
    underline: boolean;
};

export enum AllowedFonts {
    Cosmic = "Comic Sans MS",
    Arial = "Arial Black",
    Calibri = "Calibri"
}

export interface CellColor{
    argb:string;
}
