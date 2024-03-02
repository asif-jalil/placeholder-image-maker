export type ColorInputProps = { label: string; setRandomColor: (value: string) => void } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
