import { NextRequest, NextResponse } from 'next/server';

import { ga4Event } from '@/utils/GA-api';
import { createImageBuffer, generateSvgContent, getContentType } from '@/utils/api-image';
import { validateRequest } from '@/utils/validation';
import { ImageParamsValidation, ImageSizeValidation } from '@/validations/ImageValidation';

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

    const svgContent = generateSvgContent(validDimension, validOptions);
    const imageBuffer = await createImageBuffer(svgContent, format, validDimension, validOptions);

    await ga4Event('api_image', { size: [validDimension.width, validDimension.height].join('x') });

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': getContentType(format),
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    // @ts-expect-error error type is not defined
    return NextResponse.json({ message: error.message as string }, { status: 400 });
  }
};
