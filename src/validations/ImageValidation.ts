import validateColor from 'validate-color';
import { z } from 'zod';

const colorType = z
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

const checkNumberAsString = (propertyName: string) =>
  z
    .string({ required_error: `${propertyName} is required` })
    .refine((value: string) => !Number.isNaN(Number(value)), {
      message: 'Invalid width'
    })
    .transform((value: string) => Number(value));

export const ImageSizeValidation = z.object({
  width: checkNumberAsString('width'),
  height: checkNumberAsString('height').optional()
});

export const ImageParamsValidation = z.object({
  background: colorType.optional().default('#ff00ff'),
  textcolor: colorType.optional().default('#ffffff'),
  text: z.string().max(50, { message: 'Maximum 50 characters are allowed' }).optional().default('Hello world!'),
  font: z
    .enum(['Arial', 'Helvetica', 'Georgia', 'Roboto', 'Open Sans', 'Segoe UI', 'Lato', 'Lora', 'Montserrat'])
    .optional()
    .default('Arial'),
  weight: z.enum(['100', '200', '300', '400', '500', '600', '700', '800', '900']).optional().default('600'),
  size: checkNumberAsString('font size').optional()
});
