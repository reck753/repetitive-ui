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
  value: string | undefined;
  onChange: (value: string) => void;
  countryCode: string | undefined;
  onCountryCodeChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
};

const defaultCountry = countries[0];

export const PhoneInput = ({
  value,
  onChange,
  className,
  inputClassName,
  countryCode,
  onCountryCodeChange,
}: PhoneInputProps) => {
  const selectedCountry =
    countries.find((c) => c.code === countryCode) ?? defaultCountry;
  return (
    <Div className={cn("flex gap-2", className)}>
      <Select
        value={selectedCountry.code}
        onValueChange={onCountryCodeChange}
        defaultValue={selectedCountry.code}
      >
        <SelectTrigger className="w-[80px] min-w-[80px]">
          <SelectValue placeholder="Select">{selectedCountry.code}</SelectValue>
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
      <Input
        placeholder="Phone number"
        type="tel"
        value={value}
        onChange={(value) => onChange(value)}
        className={inputClassName}
      />
    </Div>
  );
};
