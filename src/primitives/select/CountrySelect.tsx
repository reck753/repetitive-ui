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
  name?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: (value: Country | undefined) => void;
};

export const CountrySelect = ({
  name,
  value,
  defaultValue,
  onChange,
}: CountrySelectProps) => {
  const country =
    value !== undefined
      ? countries.find((country) => country.name === value)
      : undefined;
  const defaultCountry = countries.find(
    (country) => country.name === defaultValue
  );
  return (
    <Select
      name={name}
      value={country?.name}
      onValueChange={
        onChange
          ? (v) => onChange(countries.find((country) => country.name === v))
          : undefined
      }
      defaultValue={(country ?? defaultCountry)?.name}
    >
      <SelectTrigger>
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.name} value={country.name}>
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
