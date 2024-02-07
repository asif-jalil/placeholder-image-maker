export type ButtonProps = {
  bg?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'light';
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
