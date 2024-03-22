import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';

export enum AcceptedFont {
  'Arial' = 'Arial',
  'Helvetica' = 'Helvetica',
  'Georgia' = 'Georgia',
  'Roboto' = 'Roboto',
  'Open Sans' = 'Open Sans',
  'Segoe UI' = 'Segoe UI',
  'Lato' = 'Lato',
  'Lora' = 'Lora',
  'Montserrat' = 'Montserrat',
  'Noto Sans' = 'Noto Sans'
}

export type AcceptedFontType =
  | 'Arial'
  | 'Helvetica'
  | 'Georgia'
  | 'Roboto'
  | 'Open Sans'
  | 'Segoe UI'
  | 'Lato'
  | 'Lora'
  | 'Montserrat'
  | 'Noto Sans';

export enum AcceptedFontWeight {
  'Thin' = '100',
  'Extra light' = '200',
  'Light' = '300',
  'Normal' = '400',
  'Medium' = '500',
  'Semi bold' = '600',
  'Bold' = '700',
  'Extra bold' = '800',
  'Black' = '900'
}
export type AcceptedFontWeightType = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type OptionsType = {
  font: AcceptedFontType;
  textcolor: string;
  text?: string;
  background: string;
  weight: AcceptedFontWeightType;
  size?: number;
};

export type DimensionType = {
  width: number;
  height?: number;
};

export type MakeImageType = {
  bgColor?: string;
  textColor?: string;
  caption?: string;
  font?: AcceptedFontType;
  weight?: AcceptedFontWeightType;
  fontsize?: number;
} & Omit<AcceptedFile, 'id' | 'size' | 'previewSrc'>;

export type ConstructImageUrlType = {
  dimension: {
    width: number;
    height: number;
  };
  imageFormat: string;
  background?: string;
  textcolor?: string;
  text?: string;
  weight?: string;
  font?: string;
  size?: string;
};
