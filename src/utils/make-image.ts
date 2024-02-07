import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';

import { Format, ImageFormatType } from './image-format';

export type MakeImageType = {
  bgColor?: string;
  textColor?: string;
  caption?: string;
} & Omit<AcceptedFile, 'id' | 'size' | 'previewSrc'>;

const makeImage = (file: MakeImageType) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = file.width;
  canvas.height = file.height;

  const bgColor = file.bgColor || '#e2e8f0';

  context.fillStyle = bgColor;
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

  const textColor = file.textColor || '#000000';
  context.fillStyle = textColor;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const text = file.caption || [file.width, file.height].join(' x ');
  context.fillText(text, centerX, centerY);

  const type = ImageFormatType[file.type];

  let dataURI = canvas.toDataURL(type, '0.5');

  if (file.type === Format.SVG) {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', file.width.toString());
    svgElement.setAttribute('height', file.height.toString());

    const imgElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    imgElement.setAttribute('x', '0');
    imgElement.setAttribute('y', '0');
    imgElement.setAttribute('width', file.width.toString());
    imgElement.setAttribute('height', file.height.toString());
    imgElement.setAttribute('href', canvas.toDataURL());

    svgElement.appendChild(imgElement);

    const svgSource = new XMLSerializer().serializeToString(svgElement);

    dataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgSource)}`;
  }

  return dataURI;
};

export default makeImage;
