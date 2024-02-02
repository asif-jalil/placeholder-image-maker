import { AcceptedFile } from '@/components/files/accepted-files.types';

const makeImage = (file: AcceptedFile) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = file.width;
  canvas.height = file.height;

  context.fillStyle = '#e2e8f0';
  context.fillRect(0, 0, canvas.width, canvas.height);

  let widthFactor: number;
  const heightFactor = canvas.height / 2;

  if (canvas.width < 200) {
    widthFactor = canvas.width / 5;
  } else {
    widthFactor = canvas.width / 9;
  }

  const fontSize = Math.min(widthFactor, heightFactor);

  context.font = `bold ${fontSize}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const text = `${file.width} x ${file.height}`;
  context.fillStyle = '#000000';

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  context.fillText(text, centerX, centerY);

  const dataURI = canvas.toDataURL();

  return dataURI;
};

export default makeImage;
