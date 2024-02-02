export type RejectedFilesProps = {
  rejectedFiles: RejectedFile[];
};

export type RejectedFile = {
  id: number;
  fileName: string;
  error: string;
  previewSrc: string;
  type: string;
};
