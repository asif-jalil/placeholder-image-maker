import sharp, { Color, FormatEnum } from 'sharp';

import { DimensionType, OptionsType } from '@/types/image';

import { ApiImageFormat } from './image-format';

export const generateSvgContent = (validDimension: DimensionType, validOptions: OptionsType) => {
  const { width, height } = validDimension;
  const fontSize = validOptions.size || Math.min(width < 200 ? width / 5 : width / 9, height / 2);
  const centerX = width / 2;
  const centerY = height / 2 + (fontSize * 0.3) / 2;
  const text = validOptions.text || [width, height].join(' x ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <rect width="100%" height="100%" fill="${validOptions.background}" />
            <text x="${centerX}" y="${centerY}" font-family="${validOptions.font}" font-size="${fontSize}" font-weight="${validOptions.weight}" fill="${validOptions.textcolor}" text-anchor="middle" alignment-baseline="middle">${text}</text>
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
      height: validDimension.height,
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
