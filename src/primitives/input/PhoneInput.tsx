import { cn } from "@repetitive-ui/utils";
import { Div } from "../div/Div";
import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/Select";
import { countries } from "../select/CountrySelect";
import { Span } from "../span/Span";

type PhoneInputProps = {
  name?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
  defaultCountryCode?: string | undefined;
  countrySelectName?: string | undefined;
  countryCode?: string | undefined;
  onCountryCodeChange?: (value: string) => void;
  className?: string;
  inputClassName?: string;
};

const defaultCountry = countries[0];

export const PhoneInput = ({
  name,
  value,
  defaultValue,
  onChange,
  className,
  inputClassName,
  defaultCountryCode,
  countrySelectName,
  countryCode,
  onCountryCodeChange,
}: PhoneInputProps) => {
  const selectedCountry = countryCode
    ? countries.find((c) => c.code === countryCode) ?? defaultCountry
    : undefined;
  const defaultSelectedCountry = defaultCountryCode
    ? countries.find((c) => c.code === defaultCountryCode) ?? defaultCountry
    : defaultCountry;
  return (
    <Div className={cn("flex gap-2", className)}>
      <Select
        name={countrySelectName}
        value={selectedCountry?.code}
        onValueChange={onCountryCodeChange}
        defaultValue={defaultSelectedCountry?.code}
      >
        <SelectTrigger
          className="group w-[80px] min-w-[80px]"
          data-trigger={true}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <Div className="flex group-data-[trigger=true]:hidden gap-2 items-center">
                <Span className="pt-[2px]">{country.flag}</Span>
                <Span>{country.name}</Span>
              </Div>
              <Span className="hidden group-data-[trigger=true]:flex pt-[2px]">
                {country.code}
              </Span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Phone number"
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        className={inputClassName}
      />
    </Div>
  );
};
