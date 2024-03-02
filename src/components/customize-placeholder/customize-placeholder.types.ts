import { Dispatch, SetStateAction } from 'react';

export type CustomizePlaceholderProps = {
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
};
