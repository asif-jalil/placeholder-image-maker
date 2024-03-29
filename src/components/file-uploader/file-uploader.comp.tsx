import { FileRejection, useDropzone } from 'react-dropzone';

import Image from 'next/image';

import CryptoJS from 'crypto-js';

import uploadIllustration from '@/assets/images/file-upload.png';
import ga from '@/utils/GA';
import { ImageFormatType, getImageFormat } from '@/utils/image-format';

import { FileUploaderProps } from './file-uploader.types';

const FileUploader = ({ onSelect, accept, onReject, filesOnQueue }: FileUploaderProps) => {
  const onDropAccepted = (files: File[]) => {
    files?.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!(e.target?.result && typeof e.target.result === 'string')) return;

        const img = new window.Image();

        img.onload = () => {
          const uniqueId = [Date.now(), file.name].join('-');
          const hash = CryptoJS.MD5(uniqueId).toString(CryptoJS.enc.Hex);
          const info = {
            id: hash,
            name: file.name.split('.').slice(0, -1).join('.'),
            extension: file.name.split('.').pop() as string,
            size: file.size,
            type: getImageFormat(file.type as ImageFormatType),
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
      name: file.file.name.split('.').slice(0, -1).join('.'),
      extension: file.file.name.split('.').pop() as string,
      size: file.file.size,
      type: getImageFormat(file.file.type as ImageFormatType),
      previewSrc: URL.createObjectURL(file.file),
      error: file.errors[0].message
    }));
    onReject(formattedFiles);
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const totalFile = acceptedFiles.length + rejectedFiles.length;
    for (let i = 0; i < totalFile; i += 1) {
      ga.upload();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 5242880,
    maxFiles: 100,
    onDrop,
    onDropAccepted,
    onDropRejected,
    accept
  });

  return (
    <div
      {...getRootProps({
        className: `group ${filesOnQueue ? 'h-auto' : 'h-[30rem]'} p-5 border border-gray-400 hover:border-dark active:scale-[0.98] transition-transform duration-75 border-dashed hover:bg-slate-50 rounded-3xl cursor-pointer`
      })}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center justify-center text-center h-full'>
        {!filesOnQueue && (
          <div className='flex mb-6'>
            <Image src={uploadIllustration} height={250} alt='Upload' />
          </div>
        )}
        <h2 className='text-xl leading-7 text-slate-900'>Drop/Upload your files here</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>jpg, jpeg, png, svg, webp accepted</p>
        <p className='mt-3 text-sm leading-6 text-slate-600'>Maximum file size: 5MB</p>
        <p className='mt-1 text-sm leading-6 text-slate-600'>Maximum files: 100</p>
      </div>
    </div>
  );
};

export default FileUploader;
