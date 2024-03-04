import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiRevision } from 'react-icons/bi';
import { BsCheckLg, BsCloudArrowDown, BsCopy, BsXLg } from 'react-icons/bs';

import { AcceptedFont, AcceptedFontType, AcceptedFontWeight, AcceptedFontWeightType } from '@/types/image';
import ga from '@/utils/GA';
import { constructImageUrl } from '@/utils/construct-endpoint';
import { downloadFile } from '@/utils/download';
import { Format } from '@/utils/image-format';

import ColorInput from '../input/color-input.comp';
import SelectInput from '../input/select-input.comp';
import { SingleSelectedInput } from '../input/select-input.types';
import TextInput from '../input/text-input.comp';
import { CustomizePlaceholderProps } from './customize-placeholder.types';
import SelectFormat from './select-format.comp';

const CustomizePlaceholder = ({ bgColor, setBgColor, textColor, setTextColor }: CustomizePlaceholderProps) => {
  const [imageFormat, setImageFormat] = useState(Format.PNG);
  const [dimension, setDimension] = useState({ width: 400, height: 300 });
  const [caption, setCaption] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [font, setFont] = useState<SingleSelectedInput<AcceptedFontType>>();
  const [fontSize, setFontSize] = useState<number>();
  const [fontWeight, setFontWeight] = useState<SingleSelectedInput<AcceptedFontWeightType>>();

  const fontList = useMemo(
    () => Object.entries(AcceptedFont).map(([key, value]) => ({ id: value.toLowerCase(), displayName: key, value })),
    []
  );

  const fontWeightList = useMemo(
    () =>
      Object.entries(AcceptedFontWeight).map(([key, value]) => ({ id: value.toLowerCase(), displayName: key, value })),
    []
  );

  const handleDownload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    downloadFile({
      type: imageFormat,
      extension: imageFormat,
      height: dimension.height,
      width: dimension.width,
      name: 'placeholder',
      bgColor,
      textColor,
      caption,
      font: font?.value,
      weight: fontWeight?.value,
      fontsize: fontSize
    });

    ga.customDownload();
  };

  const handleReset = useCallback(() => {
    setImageFormat(Format.PNG);
    setDimension({ width: 400, height: 300 });
    setBgColor('');
    setTextColor('');
    setCaption('');
    setFont(undefined);
    setFontSize(undefined);
    setFontWeight(undefined);
  }, [setBgColor, setTextColor]);

  const handleChangeDimension = (key: 'width' | 'height', value: string) => {
    if (Number.isNaN(Number(value))) return;

    setDimension((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const handleChangeFontsize = (size: string) => {
    if (Number.isNaN(Number(size))) return;

    setFontSize(Number(size));
  };

  const handleCopyToClipboard = () => {
    setCopied(() => true);
    const timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 2000);
  };

  const imgUrl = useMemo(
    () =>
      constructImageUrl({
        dimension,
        imageFormat,
        background: bgColor,
        textcolor: textColor,
        text: caption,
        font: font?.value,
        weight: fontWeight?.value,
        size: fontSize?.toString()
      }),
    [bgColor, caption, dimension, font?.value, fontSize, fontWeight?.value, imageFormat, textColor]
  );

  useEffect(() => () => handleReset(), [handleReset]);

  return (
    <form onSubmit={handleDownload} onReset={handleReset} className='px-2 space-y-14'>
      <div className='space-y-5'>
        <SelectFormat imageFormat={imageFormat} onSelect={setImageFormat} />
        <div>
          <h5 className='font-medium mb-2'>Dimension</h5>
          <div className='flex gap-5 items-center'>
            <TextInput
              label='Width'
              value={dimension.width.toString()}
              onChange={(e) => handleChangeDimension('width', e.target.value)}
              placeholder={dimension.width.toString()}
              name='width'
              id='width'
            />
            <BsXLg className='text-xl' />
            <TextInput
              label='Height'
              value={dimension.height.toString()}
              onChange={(e) => handleChangeDimension('height', e.target.value)}
              placeholder={dimension.height.toString()}
              name='height'
              id='height'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div>
            <h5 className='font-medium mb-2'>Background color</h5>
            <ColorInput
              label='Hex value'
              setRandomColor={(value) => setBgColor(value)}
              value={bgColor}
              defaultValue='#e2e8f0'
              onChange={(e) => setBgColor(e.target.value)}
              placeholder='#e2e8f0'
              name='bg-color'
              id='bg-color'
            />
          </div>
          <div>
            <h5 className='font-medium mb-2'>Text color</h5>
            <ColorInput
              label='Hex value'
              setRandomColor={(value) => setTextColor(value)}
              value={textColor}
              defaultValue='#000000'
              onChange={(e) => setTextColor(e.target.value)}
              placeholder='#000000'
              name='text-color'
              id='text-color'
            />
          </div>
        </div>
        <div>
          <h5 className='font-medium mb-2'>Caption</h5>
          <TextInput
            label='Preview text'
            showCounter
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, 50))}
            placeholder='400x300'
            name='caption'
            id='caption'
          />
        </div>
        <div>
          <h5 className='font-medium mb-2'>Font</h5>
          <div className='grid grid-cols-1 sm:grid-cols-3 items-center gap-5'>
            <SelectInput<AcceptedFontType>
              data={fontList}
              value={font}
              label='Family'
              onChange={(value) => setFont(value)}
              placeholder='Arial'
            />
            <TextInput
              label='Size'
              value={fontSize?.toString() || ''}
              onChange={(e) => handleChangeFontsize(e.target.value)}
              placeholder='72'
              name='font-size'
              id='font-size'
            />
            <SelectInput<AcceptedFontWeightType>
              data={fontWeightList}
              label='Weight'
              value={fontWeight}
              onChange={(value) => setFontWeight(value)}
              placeholder='Bold'
            />
          </div>
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
  );
};

export default CustomizePlaceholder;
