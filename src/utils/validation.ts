import validateColor from 'validate-color';
import { z } from 'zod';

import { ApiImageFormat } from './image-format';

export const validateRequest = (file: string) => {
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

export const colorType = z
  .string()
  .transform((value: string) => {
    if (!validateColor(value)) {
      return ['#', value].join('');
    }
    return value;
  })
  .refine((value: string) => validateColor(value), {
    message: 'Invalid color format'
  });

export const checkNumberAsString = (propertyName: string) =>
  z
    .string({ required_error: `${propertyName} is required` })
    .refine((value: string) => !Number.isNaN(Number(value)), {
      message: `Invalid ${propertyName}`
    })
    .transform((value: string) => Number(value));

export const getDefaultDimension = (dimension: { width: number; height?: number }) => {
  const newDimension = dimension;

  if (newDimension.height === undefined) {
    newDimension.height = newDimension.width;
  }
  return newDimension;
};
