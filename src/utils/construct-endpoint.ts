interface ImageParams {
  dimensions: {
    width: number;
    height: number;
  };
  imageFormat: string;
  background?: string;
  textcolor?: string;
  text?: string;
  weight?: string;
  font?: string;
}

export const constructImageUrl = ({
  dimensions,
  imageFormat,
  background,
  textcolor,
  text,
  weight,
  font
}: ImageParams): string => {
  // Construct the base URL
  const baseUrl = 'https://pimage.vercel.app/image/';

  // Construct the query parameters
  const queryParams: { [key: string]: string | undefined } = {
    background: background ? background.replace('#', '') : undefined,
    textcolor: textcolor ? textcolor.replace('#', '') : undefined,
    text,
    weight,
    font
  };

  // Construct the URL
  let imageUrl = `${baseUrl}`;

  if (dimensions.width > 0 && dimensions.height > 0) {
    imageUrl += `${dimensions.width}x${dimensions.height}`;
  } else if (dimensions.width > 0) {
    imageUrl += `${dimensions.width}`;
  } else if (dimensions.height > 0) {
    imageUrl += `${dimensions.height}`;
  } else {
    imageUrl += '400x300';
  }
  imageUrl += `.${imageFormat}`;

  const queryParamsString = Object.entries(queryParams)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Append query parameters if they exist
  if (queryParamsString) {
    imageUrl += `?${queryParamsString}`;
  }

  return imageUrl;
};
