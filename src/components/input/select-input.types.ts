export type SingleSelectedInput<T extends string> = { id: number | string; displayName: string; value: T };

export type SelectInputProps<T extends string> = {
  label: string;
  data: SingleSelectedInput<T>[];
  onChange: (value: SingleSelectedInput<T>) => void;
  value?: SingleSelectedInput<T>;
  placeholder?: string;
};
