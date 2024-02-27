import { AcceptedFile } from '../accepted-files/accepted-files.types';
import { RejectedFile } from '../rejected-files/rejected-files.types';

export type FileUploaderProps = {
  onSelect: (file: AcceptedFile) => void;
  onReject: (files: RejectedFile[]) => void;
  accept: { [key: string]: string[] };
  disabled?: boolean;
  filesOnQueue?: boolean;
};
