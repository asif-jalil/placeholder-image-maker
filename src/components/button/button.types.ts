export type ButtonProps = {
  children: React.ReactNode;
  bg?: 'blue' | 'green' | 'red' | 'gray' | 'yellow';
  onClick?: () => void;
  className?: string;
};
