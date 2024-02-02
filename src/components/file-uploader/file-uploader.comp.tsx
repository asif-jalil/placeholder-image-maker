import { FileRejection, useDropzone } from 'react-dropzone';

import Image from 'next/image';

import icon from '@/assets/images/icon.png';
import { ImageFormatType, getImageFormat } from '@/utils/image-format';

import { FileUploaderProps } from './file-uploader.types';

const FileUploader = ({ onSelect, accept, onReject }: FileUploaderProps) => {
  const onDropAccepted = (files: File[]) => {
    files?.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!(e.target?.result && typeof e.target.result === 'string')) return;

        const img = new window.Image();

        img.onload = () => {
          const info = {
            id: Date.now(),
            fileName: file.name,
            size: file.size,
            type: getImageFormat(file.type as ImageFormatType),
            extension: file.name.split('.').pop(),
            height: img.height,
            width: img.width,
            previewSrc: URL.createObjectURL(file)
          };

          onSelect(info);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  const onDropRejected = (files: FileRejection[]) => {
    const formattedFiles = files.map((file) => ({
      id: Date.now(),
      previewSrc: URL.createObjectURL(file.file),
      fileName: file.file.name,
      error: file.errors[0].message,
      type: getImageFormat(file.file.type as ImageFormatType)
    }));
    onReject(formattedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 5000000,
    maxFiles: 100,
    onDropAccepted,
    onDropRejected,
    accept
  });

  return (
    <div className='border-4 border-emerald-100 hover:border-emerald-200 border-dashed rounded-xl cursor-pointer group mb-6'>
      <div {...getRootProps({ className: 'h-[550px] flex justify-center items-center' })}>
        <div className='text-center'>
          <input {...getInputProps()} />
          <div className='text-center mb-16'>
            <Image className='inline-block mb-5' width={100} src={icon} alt='placeholder image maker' />
            <h1 className='font-bold mb-3'>
              <span className='text-7xl text-emerald-500'>P</span>
              <span className='text-5xl'>laceholder</span>
              <span className='px-3' />
              <span className='text-7xl text-emerald-500'>M</span>
              <span className='text-5xl'>aker</span>
            </h1>
            <p className='text-slate-400'>
              Generate a temporary image placeholder to use when submitting it to Themeforest or any other online
              marketplace.
            </p>
          </div>

          <h3 className='text-3xl font-semibold text-slate-300 group-hover:text-slate-400 mb-3'>
            Drop your files here...
          </h3>
          <h4 className='text-slate-300 group-hover:text-slate-400 mb-3'>(jpg, jpeg, png, svg, bmp, webp accepted)</h4>
          <h4 className='text-slate-300 group-hover:text-slate-400 mb-1'>Maximum file size: 5MB</h4>
          <h4 className='text-slate-300 group-hover:text-slate-400'>Maximum files: 100</h4>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
