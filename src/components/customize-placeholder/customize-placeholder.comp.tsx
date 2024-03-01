import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiRevision } from 'react-icons/bi';
import { BsCheckLg, BsCloudArrowDown, BsCopy } from 'react-icons/bs';

import { constructImageUrl } from '@/utils/construct-endpoint';
import { downloadFile } from '@/utils/download';
import { Format } from '@/utils/image-format';

import BackgroundColor from './background-color.comp';
import Caption from './caption.comp';
import Dimension from './dimension.comp';
import SelectFormat from './select-format.comp';
import TextColor from './text-color.comp';

const CustomizePlaceholder = () => {
  const [imageFormat, setImageFormat] = useState(Format.PNG);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [caption, setCaption] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDownload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    downloadFile({
      type: imageFormat,
      extension: imageFormat,
      height: dimensions.height,
      width: dimensions.width,
      name: 'placeholder',
      bgColor,
      textColor,
      caption
    });
  };

  const handleReset = () => {
    setImageFormat(Format.PNG);
    setDimensions({ width: 400, height: 300 });
    setBgColor('');
    setTextColor('');
    setCaption('');
  };

  const handleChangeDimension = (key: 'width' | 'height', value: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(value))) return;

    setDimensions((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const handleCopyToClipboard = () => {
    setCopied(() => true);
    setTimeout(() => setCopied(false), 2000);
  };

  const imgUrl = constructImageUrl({
    dimensions,
    imageFormat,
    background: bgColor,
    textcolor: textColor,
    text: caption
  });

  return (
    <div>
      <form onSubmit={handleDownload} onReset={handleReset} className='px-2 space-y-14'>
        <div className='space-y-5'>
          <SelectFormat imageFormat={imageFormat} onSelect={setImageFormat} />
          <Dimension dimension={dimensions} onChange={handleChangeDimension} />
          <Caption text={caption} onChange={setCaption} />
          <div className='grid grid-cols-2 gap-5'>
            <BackgroundColor color={bgColor} onChange={setBgColor} />
            <TextColor color={textColor} onChange={setTextColor} />
          </div>
          <div>
            <h5 className='font-medium mb-2'>Image URL</h5>
            <div className='flex gap-3 justify-between rounded-xl p-5 shadow-sm bg-slate-50 ring-1 ring-inset ring-gray-300'>
              <h1 className='font-mono flex-1 [overflow-wrap:anywhere] text-sm'>{imgUrl}</h1>
              <div
                className='cursor-pointer translate-y-[2px]'
                data-tooltip-id='tooltip'
                data-tooltip-content={copied ? 'Copied!' : 'Copy'}
                aria-disabled={copied}
              >
                <CopyToClipboard text={imgUrl} onCopy={handleCopyToClipboard}>
                  {copied ? <BsCheckLg className='text-green-500 text-lg' /> : <BsCopy />}
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {/* <div className='bg-dark px-5 pb-5 rounded-2xl max-w-2xl mx-auto'>
            <div className='py-3 text-white flex justify-between items-center'>
              <h5>Preview</h5>
              <div className='flex gap-2'>
                <button
                  type='submit'
                  className='flex items-center gap-2 active:scale-95 transition-transform duration-75 bg-white hover:bg-slate-100 text-dark font-semibold text-xs px-3 md:px-5 py-2.5 rounded-xl'
                >
                  <BsCloudArrowDown className='text-lg' />
                  <span className='sr-only md:not-sr-only'>Download</span>
                </button>
                <button
                  type='reset'
                  className='flex items-center gap-1 hover:underline text-xs active:scale-95 transition-transform duration-75 px-2 py-2.5 rounded-xl'
                >
                  <BiRevision className='text-lg -translate-y-0.5' />
                  <span className='sr-only md:not-sr-only'>Reset to default</span>
                </button>
              </div>
            </div>
            <div
              className='w-full h-60 flex justify-center items-center text-center text-xl border border-white/20 rounded-xl overflow-hidden'
              style={{
                backgroundColor: bgColor || '#e2e8f0',
                color: textColor || '#000000',
                fontFamily: 'poppins, sans-serif'
              }}
            >
              {caption || [dimensions.width, dimensions.height].join(' x ') || 'Width x Height'}
            </div>
          </div> */}
        </div>

        <div className='flex justify-between gap-3 mt-10'>
          <button
            type='submit'
            className='w-full flex justify-center items-center gap-2 active:scale-95 transition-transform duration-75 bg-dark hover:bg-dark/90 text-white font-semibold text-xs px-3 md:px-5 py-2 rounded-xl'
          >
            <BsCloudArrowDown className='text-lg' />
            <span className='sr-only md:not-sr-only'>Download</span>
          </button>
          <button
            type='reset'
            className='w-full flex justify-center items-center gap-2 active:scale-95 transition-transform duration-75 bg-white border border-dark hover:bg-slate-100 font-semibold text-xs px-3 md:px-5 py-3 rounded-xl'
          >
            <BiRevision className='text-lg' />
            <span className='sr-only md:not-sr-only'>Reset to default</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomizePlaceholder;
