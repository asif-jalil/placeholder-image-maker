import { z } from 'zod';

import { checkNumberAsString, colorType, getDefaultDimension } from '@/utils/validation';

export const ImageSizeValidation = z
  .object({
    width: checkNumberAsString('width'),
    height: checkNumberAsString('height').optional()
  })
  .refine(getDefaultDimension);

export const ImageParamsValidation = z.object({
  background: colorType.optional().default('#e2e8f0'),
  textcolor: colorType.optional().default('#000000'),
  text: z.string().max(50, { message: 'Maximum 50 characters are allowed' }).optional(),
  font: z
    .enum([
      'Arial',
      'Helvetica',
      'Georgia',
      'Roboto',
      'Open Sans',
      'Segoe UI',
      'Lato',
      'Lora',
      'Montserrat',
      'system-ui'
    ])
    .optional()
    .default('system-ui'),
  weight: z.enum(['100', '200', '300', '400', '500', '600', '700', '800', '900']).optional().default('400'),
  size: checkNumberAsString('font size').optional()
});
