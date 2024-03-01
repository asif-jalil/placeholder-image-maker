import { CaptionProps } from './caption.types';

const Caption = ({ text, onChange }: CaptionProps) => (
  <div>
    <h5 className='font-medium mb-2'>Caption</h5>
    <div className='flex-1 rounded-xl mb-1 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
      <label htmlFor='capiton' className='block text-xs font-medium text-slate-900'>
        <span className='flex justify-between'>
          Preview text
          <span className='text-sm'>{text.length}/50</span>
        </span>
        <input
          type='text'
          value={text}
          onChange={(e) => onChange(e.target.value.slice(0, 50))}
          placeholder='400x300'
          name='capiton'
          id='capiton'
          className='block w-full border-0 p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
        />
      </label>
    </div>
  </div>
);

export default Caption;
