export enum ImageFormatType {
  jpeg = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  gif = 'image/gif',
  webp = 'image/webp',
  bmp = 'image/bmp'
}

export enum Format {
  JPEG = 'jpeg',
  PNG = 'png',
  SVG = 'svg',
  GIF = 'gif',
  WEBP = 'webp',
  BMP = 'bmp'
}

export enum ImageFormat {
  'image/jpeg' = Format.JPEG,
  'image/png' = Format.PNG,
  'image/svg+xml' = Format.SVG,
  'image/gif' = Format.GIF,
  'image/webp' = Format.WEBP,
  'image/bmp' = Format.BMP
}

export const getImageFormat = (type: ImageFormatType) => ImageFormat[type] as unknown as Format;
