import { Format } from '@/utils/image-format';

export type FormatProps = {
  imageFormat: Format;
  onSelect: React.Dispatch<React.SetStateAction<Format>>;
};
