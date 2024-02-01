export type RejectedFilesProps = {
  rejectedFiles: RejectedFile[];
};

export type RejectedFile = {
  fileName: string;
  error: string;
  previewSrc: string;
  type: string;
};
