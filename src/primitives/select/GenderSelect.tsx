import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../select/Select";

type GenderSelectProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

export const GenderSelect = ({ value, onChange }: GenderSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={value}>
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
