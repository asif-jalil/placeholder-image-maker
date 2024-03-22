import sharp, { Color, FormatEnum } from 'sharp';

import { DimensionType, OptionsType } from '@/types/image';

import calculateFontSize from './calculate-font-size';
import { ApiImageFormat } from './image-format';

const splitTextIntoLines = (text: string, maxWidth: number, fontSize: number) => {
  const words = text.split(' ');

  return words.reduce((lines: string[], word: string) => {
    const line = lines[lines.length - 1];
    const updatedLine = line ? [line, word].join(' ') : word;

    const FONT_ADJUSTMENT_FACTOR = 0.62;
    const AVERAGE_CHARACTER_WIDTH = 0.735;
    const estimatedWidth = updatedLine.length * fontSize * AVERAGE_CHARACTER_WIDTH * FONT_ADJUSTMENT_FACTOR;

    if (line && estimatedWidth > maxWidth) {
      lines.push(word);
    } else if (line) {
      lines[lines.length - 1] = updatedLine; // Update the current line
    } else {
      lines.push(updatedLine); // Push the first word as the first line
    }

    return lines;
  }, []);
};

export const generateSvgContent = (validDimension: DimensionType, validOptions: OptionsType) => {
  const { width, height } = validDimension;

  const fontSize = validOptions.size || calculateFontSize(width, height as number);

  const text = validOptions.text || [width, height].join(' x ');

  const maxWidth = width * 0.9;
  const lines = splitTextIntoLines(text, maxWidth, fontSize);

  const centerY = (height as number) / 2;

  const lineHeight = fontSize * 1.2;
  const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
  const textElements = lines
    .map((line, index) => `<tspan x="50%" y="${startY + index * lineHeight}px" text-anchor="middle">${line}</tspan>`)
    .join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${height}">
            <style type="text/css">
              <![CDATA[   
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Lora:wght@400;500;600;700&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');
                text{
                  font: ${validOptions.weight} ${fontSize} ${validOptions.font};
                }
              ]]> 
            </style>
            <rect width="100%" height="100%" fill="${validOptions.background}" />
            <text fill="${validOptions.textcolor}" text-anchor="middle" alignment-baseline="middle" y="${centerY}">
              ${textElements}
            </text>
          </svg>`;
};

export const createImageBuffer = async (
  svgContent: string,
  format: ApiImageFormat,
  validDimension: DimensionType,
  validOptions: OptionsType
) => {
  if (format === ApiImageFormat.SVG) {
    return Buffer.from(svgContent);
  }

  return sharp({
    create: {
      width: validDimension.width,
      height: validDimension.height as number,
      channels: 4,
      background: validOptions.background as Color
    }
  })
    .composite([{ input: Buffer.from(svgContent) }])
    .toFormat(format as keyof FormatEnum)
    .toBuffer();
};

export const getContentType = (format: ApiImageFormat) => {
  if (format === ApiImageFormat.SVG) {
    return 'image/svg+xml';
  }

  return `image/${format}`;
};
