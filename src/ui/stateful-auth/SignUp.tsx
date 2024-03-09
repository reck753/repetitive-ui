import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { EmailInput } from "@repetitive-ui/primitives/input/EmailInput";
import { PhoneInput } from "@repetitive-ui/primitives/input/PhoneInput";
import { CardContent, CardFooter } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedSubmitButton,
  SharedFooterAction,
} from "./SharedAuth";

export type PhoneNumber = {
  countryCode: string;
  number: string;
};

export type SignUp = {
  email?: string;
  phone?: PhoneNumber;
};

type SignUpFormProps = {
  form: SignUp;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onCountryCodeChange: (countryCode: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSignInClick: () => void;
  checkingEmailOrPhone: boolean;
  disabled: boolean;
};

export const SignUpForm = ({
  form,
  onEmailChange,
  onPhoneChange,
  onCountryCodeChange,
  onSubmit,
  onSignInClick,
  checkingEmailOrPhone,
  disabled,
}: SignUpFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle> {"Sign Up"} </SharedCardTitle>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit} busy={checkingEmailOrPhone}>
          <Div className="flex flex-col gap-6">
            <EmailInput
              value={form.email ?? ""}
              onChange={onEmailChange}
              autoFocus={true}
            />
            <PhoneInput
              value={form.phone?.number ?? ""}
              onChange={onPhoneChange}
              countryCode={form.phone?.countryCode}
              onCountryCodeChange={onCountryCodeChange}
            />
            <SharedSubmitButton busy={checkingEmailOrPhone} disabled={disabled}>
              {"Continue"}
            </SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
      <CardFooter className="gap-4 flex-col items-stretch">
        <SharedFooterAction
          title={"Already have an account? "}
          action={"Sign In"}
          onClick={onSignInClick}
        />
      </CardFooter>
    </SharedCardRoot>
  );
};
