import { RejectedFile } from '../files/rejected-files.types';

export type RejectedActionProps = {
  rejectedFiles: RejectedFile[];
  onClear: () => void;
};
