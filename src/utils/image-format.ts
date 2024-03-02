export enum ImageFormatType {
  jpeg = 'image/jpeg',
  jpg = 'image/jpg',
  png = 'image/png',
  svg = 'image/svg+xml',
  webp = 'image/webp'
}

export enum Format {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp'
}

export enum ImageFormat {
  'image/jpeg' = Format.JPEG,
  'image/jpg' = Format.JPG,
  'image/png' = Format.PNG,
  'image/svg+xml' = Format.SVG,
  'image/webp' = Format.WEBP
}

export enum ApiImageFormat {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp'
}

export const getImageFormat = (type: ImageFormatType) => ImageFormat[type] as unknown as Format;

export const imageFormats = [Format.JPG, Format.JPEG, Format.PNG, Format.SVG, Format.WEBP];
