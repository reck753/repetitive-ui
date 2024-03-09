import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../select/Select";

type GenderSelectProps = {
  name?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
};

export const GenderSelect = ({
  name,
  value,
  defaultValue,
  onChange,
}: GenderSelectProps) => {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  );
};
