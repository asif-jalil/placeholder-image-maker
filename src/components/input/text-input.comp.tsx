import { TextInputProps } from './text-input.types';

const TextInput = ({ label, showCounter = false, value, ...rest }: TextInputProps) => (
  <div className='flex-1 rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
    <label htmlFor={rest.id} className='block text-xs font-medium text-slate-900'>
      <span className='flex justify-between'>
        {label}
        {showCounter && <span className='text-sm'>{value.length}/50</span>}
      </span>
      <input
        type='text'
        value={value}
        className='block w-full border-0 p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
        {...rest}
      />
    </label>
  </div>
);

export default TextInput;
