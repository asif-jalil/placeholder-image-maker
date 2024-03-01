export type DimensionProps = {
  dimension: {
    width: number;
    height: number;
  };
  onChange: (key: 'width' | 'height', value: string) => void;
};
