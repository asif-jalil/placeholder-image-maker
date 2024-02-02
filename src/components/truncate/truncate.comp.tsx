import { TruncateProps } from './truncate.types';

const Truncate = ({ text }: TruncateProps) => {
  if (text.length <= 30) return text;

  return (
    <span data-tooltip-id='tooltip' data-tooltip-content={text}>{`${text.slice(0, 20)}.....${text.slice(-8)}`}</span>
  );
};

export default Truncate;
