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
} from "../shared-auth/SharedAuth";

export type SignUpAdditionalInfo = {
  country?: string | undefined;
  city?: string;
  address?: string;
  postalCode?: string;
};

type SignUpAdditionalInfoFormProps = {
  onSubmit: (e: React.FormEvent) => void;
};

export const SignUpAdditionalInfoForm = ({
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
            <CountrySelect name="country" />
            <Input name="city" placeholder="City" />
            <Input name="address" placeholder="Address" />
            <Input name="postal-code" placeholder="Postal Code" />
            <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
    </SharedCardRoot>
  );
};
