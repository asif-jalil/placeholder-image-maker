import { Format } from '@/utils/image-format';

export type RejectedFilesProps = {
  rejectedFiles: RejectedFile[];
};

export type RejectedFile = {
  id: number;
  name: string;
  extension: string;
  error: string;
  previewSrc: string;
  type: Format;
  size: number;
};
