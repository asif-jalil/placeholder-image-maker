export enum ImageFormatType {
  jpeg = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  webp = 'image/webp',
  bmp = 'image/bmp'
}

export enum Format {
  JPEG = 'jpeg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp',
  BMP = 'bmp'
}

export enum ImageFormat {
  'image/jpeg' = Format.JPEG,
  'image/png' = Format.PNG,
  'image/svg+xml' = Format.SVG,
  'image/webp' = Format.WEBP,
  'image/bmp' = Format.BMP
}

export const getImageFormat = (type: ImageFormatType) => ImageFormat[type] as unknown as Format;

export const imageFormats = [Format.BMP, Format.JPEG, Format.PNG, Format.SVG, Format.WEBP];
