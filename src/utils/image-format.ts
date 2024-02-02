export type ImageFormatType = 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'image/gif' | 'image/webp';

export enum Format {
  JPEG = 'jpeg',
  PNG = 'png',
  SVG = 'svg',
  GIF = 'gif',
  WEBP = 'webp'
}

export enum ImageFormat {
  'image/jpeg' = Format.JPEG,
  'image/png' = Format.PNG,
  'image/svg+xml' = Format.SVG,
  'image/gif' = Format.GIF,
  'image/webp' = Format.WEBP
}

export const getImageFormat = (type: ImageFormatType) => ImageFormat[type] as unknown as Format;
