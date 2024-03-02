import { ConstructImageUrlType } from '@/types/image';

import { isProduction } from './check-environment';

export const constructImageUrl = ({
  dimension,
  imageFormat,
  background,
  textcolor,
  text,
  weight,
  font,
  size
}: ConstructImageUrlType): string => {
  const baseUrl = `${isProduction ? 'http://pimage.vercel.app' : 'http://localhost:3000'}/image/`;

  const queryParams: { [key: string]: string | undefined } = {
    background: background ? background.replace('#', '') : undefined,
    textcolor: textcolor ? textcolor.replace('#', '') : undefined,
    text,
    weight,
    font,
    size
  };

  let imageUrl = `${baseUrl}`;

  if (dimension.width > 0 && dimension.height > 0) {
    imageUrl += `${dimension.width}x${dimension.height}`;
  } else if (dimension.width > 0) {
    imageUrl += `${dimension.width}`;
  } else if (dimension.height > 0) {
    imageUrl += `${dimension.height}`;
  } else {
    imageUrl += '400x300';
  }
  imageUrl += `.${imageFormat}`;

  const queryParamsString = Object.entries(queryParams)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  if (queryParamsString) {
    imageUrl += `?${queryParamsString}`;
  }

  return imageUrl;
};
