export type ColorInputProps = {
  id: string;
  label: string;
  setRandomColor: (value: string) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
