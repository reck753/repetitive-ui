import { Div } from "../div/Div";
import { Span } from "../span/Span";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";

type Country = {
  code: string;
  name: string;
  flag: string;
};

export const countries: Country[] = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪" },
];

type CountrySelectProps = {
  value: string | undefined;
  onChange: (value: Country | undefined) => void;
};

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const country = countries.find((country) => country.name === value);
  return (
    <Select
      value={country?.code}
      onValueChange={(v) =>
        onChange(countries.find((country) => country.code === v))
      }
      defaultValue={value}
    >
      <SelectTrigger>
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <Div className="flex gap-2 items-center">
              <Span className="pt-[2px]">{country.flag}</Span>
              <Span>{country.name}</Span>
            </Div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
