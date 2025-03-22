type InputControl = {
  name: string;
  label: string;
  unit: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  validate?: (value: number | string) => number | string;
  type: "number"
  options?: string[];
  shortcut?: string;
  className?: string;
};

export default InputControl;