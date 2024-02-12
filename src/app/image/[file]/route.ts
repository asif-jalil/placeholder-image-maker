import { NextRequest, NextResponse } from 'next/server';

import sharp, { Color, FormatEnum } from 'sharp';

import { ApiImageFormat } from '@/utils/image-format';
import { ImageParamsValidation, ImageSizeValidation } from '@/validations/ImageValidation';

type OptionsType = {
  font: 'Arial' | 'Helvetica' | 'Georgia' | 'Roboto' | 'Open Sans' | 'Segoe UI' | 'Lato' | 'Lora' | 'Montserrat';
  textcolor: string;
  text: string;
  background: string;
  weight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  size?: number;
};

type DimenstionType = {
  width: number;
  height?: number;
};

const validateRequest = (file: string) => {
  const [dimension, format] = file.split('.');
  const [width, height] = dimension.split('x');

  if (!format || !width) {
    throw new Error('Invalid request: Missing format or width');
  }

  const lowerCaseFormat = format.toLowerCase() as ApiImageFormat;
  if (!Object.values(ApiImageFormat).includes(lowerCaseFormat)) {
    throw new Error('Image format is not supported');
  }

  return { format: lowerCaseFormat, width, height };
};

const generateSvgText = (validDimension: DimenstionType, validOptions: OptionsType) => {
  const { width, height } = validDimension;
  const fontSize = validOptions.size || Math.min(width < 200 ? width / 5 : width / 9, (height || width) / 2);
  const centerX = width / 2;
  const centerY = (height || width) / 2 + (fontSize * 0.6) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height || width}">
            <text x="${centerX}" y="${centerY}" font-family="${validOptions.font}" font-size="${fontSize}" font-weight="${validOptions.weight}" fill="${validOptions.textcolor}" text-anchor="middle" alignment-baseline="middle">${validOptions.text}</text>
          </svg>`;
};

const createImageBuffer = async (
  svgText: string,
  format: keyof FormatEnum,
  validDimension: DimenstionType,
  validOptions: OptionsType
) =>
  sharp({
    create: {
      width: validDimension.width,
      height: validDimension.height || validDimension.width,
      channels: 4,
      background: validOptions.background as Color
    }
  })
    .composite([{ input: Buffer.from(svgText) }])
    .toFormat(format)
    .toBuffer();

export const GET = async (request: NextRequest, { params }: { params: { file: string } }) => {
  try {
    const { file } = params;
    const { format, width, height } = validateRequest(file);

    const { searchParams } = request.nextUrl;
    const options = Object.fromEntries(searchParams.entries());
    const parsedOptions = ImageParamsValidation.safeParse(options);
    const parsedDimension = ImageSizeValidation.safeParse({ width, height });

    if (!parsedDimension.success) {
      return NextResponse.json(parsedDimension.error.format(), { status: 422 });
    }

    if (!parsedOptions.success) {
      return NextResponse.json(parsedOptions.error.format(), { status: 422 });
    }

    const validOptions = parsedOptions.data;
    const validDimension = parsedDimension.data;

    const svgText = generateSvgText(validDimension, validOptions);
    const imageBuffer = await createImageBuffer(svgText, format, validDimension, validOptions);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    // @ts-expect-error error type is not defined
    return NextResponse.json({ message: error.message as string }, { status: 400 });
  }
};
