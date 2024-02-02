export type AcceptedFile = {
  id: number;
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
  onDelete: (id: number | string) => void;
};
