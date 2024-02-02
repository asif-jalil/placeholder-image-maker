import { RejectedFile } from './rejected-files.types';

export type RejectedActionProps = {
  rejectedFiles: RejectedFile[];
  onClear: () => void;
};
