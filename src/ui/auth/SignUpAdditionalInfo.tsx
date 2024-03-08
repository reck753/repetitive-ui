import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { CountrySelect } from "@repetitive-ui/primitives/select/CountrySelect";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import { Input } from "@repetitive-ui/primitives/input/Input";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
} from "./SharedAuth";

export type SignUpAdditionalInfo = {
  country?: string | undefined;
  city?: string;
  address?: string;
  postalCode?: string;
};

type SignUpAdditionalInfoFormProps = {
  form: SignUpAdditionalInfo;
  onCountryChange: (country: string | undefined) => void;
  onCityChange: (city: string) => void;
  onAddressChange: (address: string) => void;
  onPostalCodeChange: (postalCode: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const SignUpAdditionalInfoForm = ({
  form,
  onCountryChange,
  onCityChange,
  onAddressChange,
  onPostalCodeChange,
  onSubmit,
}: SignUpAdditionalInfoFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"Where are you from?"}</SharedCardTitle>
        <SharedCardDescription>
          {
            "This data is not mandatory, but it will help us to serve you better"
          }
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit}>
          <Div className="flex flex-col gap-6">
            <CountrySelect
              value={form.country ?? ""}
              onChange={(country) => onCountryChange(country?.name)}
            />
            <Input
              placeholder="City"
              value={form.city ?? ""}
              onChange={onCityChange}
            />
            <Input
              placeholder="Address"
              value={form.address ?? ""}
              onChange={onAddressChange}
            />
            <Input
              placeholder="Postal Code"
              value={form.postalCode ?? ""}
              onChange={onPostalCodeChange}
            />
            <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
    </SharedCardRoot>
  );
};
