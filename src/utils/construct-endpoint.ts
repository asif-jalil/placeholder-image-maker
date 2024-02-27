interface ImageParams {
  dimensions: {
    width: number;
    height: number;
  };
  imageFormat: string;
  background?: string;
  color?: string;
  text?: string;
  weight?: string;
  font?: string;
}

export const constructImageUrl = ({
  dimensions,
  imageFormat,
  background,
  color,
  text,
  weight,
  font
}: ImageParams): string => {
  // Construct the base URL
  const baseUrl = 'https://pimage.vercel.app/image/';

  // Construct the query parameters
  const queryParams: { [key: string]: string | undefined } = {
    background: background ? background.replace('#', '') : undefined,
    color: color ? color.replace('#', '') : undefined,
    text,
    weight,
    font
  };

  // Construct the URL
  let imageUrl = `${baseUrl}${dimensions.width}x${dimensions.height}.${imageFormat}`;
  const queryParamsString = Object.entries(queryParams)
    .filter(([key, value]) => value) // Filter out undefined or falsy values
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Append query parameters if they exist
  if (queryParamsString) {
    imageUrl += `?${queryParamsString}`;
  }

  return imageUrl;
};
