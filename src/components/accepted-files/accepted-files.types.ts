import { Format } from '@/utils/image-format';

export type AcceptedFile = {
  id: number | string;
  size: number;
  type: Format;
  extension: string;
  height: number;
  width: number;
  previewSrc: string;
  name: string;
};

export type AcceptedFilesProps = {
  acceptedFiles: AcceptedFile[];
  onDelete: (id: number | string) => void;
};
