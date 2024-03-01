import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';

export type OptionsType = {
  font: 'Arial' | 'Helvetica' | 'Georgia' | 'Roboto' | 'Open Sans' | 'Segoe UI' | 'Lato' | 'Lora' | 'Montserrat';
  textcolor: string;
  text?: string;
  background: string;
  weight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  size?: number;
};

export type DimensionType = {
  width: number;
  height: number;
};

export type MakeImageType = {
  bgColor?: string;
  textColor?: string;
  caption?: string;
} & Omit<AcceptedFile, 'id' | 'size' | 'previewSrc'>;
