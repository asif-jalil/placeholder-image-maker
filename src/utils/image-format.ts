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

export enum ApiImageFormat {
  AVIF = 'avif',
  DZ = 'dz',
  FITS = 'fits',
  GIF = 'gif',
  HEIF = 'heif',
  INPUT = 'input',
  JPEG = 'jpeg',
  JPG = 'jpg',
  JP2 = 'jp2',
  JXL = 'jxl',
  MAGICK = 'magick',
  OPENSLIDE = 'openslide',
  PDF = 'pdf',
  PNG = 'png',
  PPM = 'ppm',
  RAW = 'raw',
  SVG = 'svg',
  TIFF = 'tiff',
  TIF = 'tif',
  V = 'v',
  WEBP = 'webp'
}

export const getImageFormat = (type: ImageFormatType) => ImageFormat[type] as unknown as Format;

export const imageFormats = [Format.BMP, Format.JPEG, Format.PNG, Format.SVG, Format.WEBP];
