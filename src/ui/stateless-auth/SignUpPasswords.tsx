import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { PasswordInput } from "@repetitive-ui/primitives/input/PasswordInput";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
} from "../shared-auth/SharedAuth";

export type SignUpPasswords = {
  password?: string;
  confirmPassword?: string;
};

type SignUpPasswordsFormProps = {
  onSubmit: (e: React.FormEvent) => void;
};

export const SignUpPasswordsForm = ({ onSubmit }: SignUpPasswordsFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle> {"Choose Your Password"} </SharedCardTitle>
        <SharedCardDescription>
          {
            "Choose a safe password. We recommend using a mix of letters, numbers, and symbols."
          }
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit}>
          <Div className="flex flex-col gap-6">
            <PasswordInput name="password" autoFocus={true} />
            <PasswordInput
              name="confirm-password"
              placeholder="Confirm Password"
            />
            <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
    </SharedCardRoot>
  );
};
