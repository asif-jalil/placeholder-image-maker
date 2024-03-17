import { MakeImageType } from '@/types/image';

import calculateFontSize from './calculate-font-size';
import { Format, ImageFormatType } from './image-format';
import splitTextIntoLines from './split-text-into-lines';

const makeImage = (imageConfig: MakeImageType) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = imageConfig.width;
  canvas.height = imageConfig.height;

  const bgColor = imageConfig.bgColor || '#e2e8f0';

  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = imageConfig.fontsize || calculateFontSize(canvas.width, canvas.height);

  context.font = `${imageConfig.weight || '400'} ${fontSize}px ${imageConfig.font || 'Arial'}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const textColor = imageConfig.textColor || '#000000';
  context.fillStyle = textColor;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const text = imageConfig.caption || [imageConfig.width, imageConfig.height].join(' x ');

  const maxWidth = canvas.width * 0.9;
  const lines = splitTextIntoLines(context, text, maxWidth);

  const lineHeight = fontSize * 1.2;
  const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    context.fillText(line, centerX, startY + index * lineHeight);
  });

  const type = ImageFormatType[imageConfig.type];

  let dataURI = canvas.toDataURL(type, '0.5');

  if (imageConfig.type === Format.SVG) {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', imageConfig.width.toString());
    svgElement.setAttribute('height', imageConfig.height.toString());

    const imgElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    imgElement.setAttribute('x', '0');
    imgElement.setAttribute('y', '0');
    imgElement.setAttribute('width', imageConfig.width.toString());
    imgElement.setAttribute('height', imageConfig.height.toString());
    imgElement.setAttribute('href', canvas.toDataURL());

    svgElement.appendChild(imgElement);

    const svgSource = new XMLSerializer().serializeToString(svgElement);

    dataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgSource)}`;
  }

  return dataURI;
};

export default makeImage;
