export type TextInputProps = {
  label: string;
  showCounter?: boolean;
  value: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
