export type DimentionProps = {
  dimentions: {
    width: number;
    height: number;
  };
  onChange: (key: 'width' | 'height', value: string) => void;
};
