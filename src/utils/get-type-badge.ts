import { Format } from './image-format';

const getTypeBadge = (type: Format) => {
  if (type === Format.JPEG) {
    return 'blue';
  }

  if (type === Format.GIF) {
    return 'gray';
  }

  if (type === Format.PNG) {
    return 'green';
  }

  if (type === Format.SVG) {
    return 'yellow';
  }

  if (type === Format.WEBP) {
    return 'red';
  }

  return 'blue';
};

export default getTypeBadge;
