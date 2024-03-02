import { AcceptedFile } from './accepted-files.types';

export type AcceptedActionProps = {
  acceptedFiles: AcceptedFile[];
  onClear: () => void;
};
