export type AcceptedFile = {
  size: number;
  type: string;
  extension?: string;
  height: number;
  width: number;
  previewSrc: string;
  fileName: string;
};

export type AcceptedFilesProps = {
  acceptedFiles: AcceptedFile[];
  onDelete: (fileName: string) => void;
};
