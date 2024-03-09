import { useState } from "react";
import { CheckboxWithTitle } from "@repetitive-ui/primitives/checkbox/Checkbox";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { EmailInput } from "@repetitive-ui/primitives/input/EmailInput";
import { PasswordInput } from "@repetitive-ui/primitives/input/PasswordInput";
import { CardContent, CardFooter } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
  SharedFooterAction,
} from "./SharedAuth";

export type SignIn = {
  email?: string;
  password?: string;
};

type SignInFormProps = {
  form: SignIn;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent, rememberEmail: boolean) => void;
  onForgotPasswordClick: () => void;
  onSignUpClick: () => void;
  signingIn?: boolean;
};

export const rememberEmailStorageKey = "repetitive-ui::remember-email";

export const SignInForm = ({
  form,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPasswordClick,
  onSignUpClick,
  signingIn,
}: SignInFormProps) => {
  const [rememberEmail, setRememberEmail] = useState(
    () => !!localStorage.getItem(rememberEmailStorageKey)
  );

  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle> {"Welcome!"} </SharedCardTitle>
        <SharedCardDescription>
          {"Enter your email and password to sign in"}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form
          onSubmit={(event) => onSubmit(event, rememberEmail)}
          busy={signingIn}
        >
          <Div className="flex flex-col gap-6">
            <EmailInput
              value={form.email ?? ""}
              onChange={onEmailChange}
              autoFocus={form.email ? false : true}
            />
            <PasswordInput
              value={form.password ?? ""}
              onChange={onPasswordChange}
              autoFocus={form.email ? true : false}
            />
            <CheckboxWithTitle
              id="remember-email"
              htmlFor="remember-email"
              checked={rememberEmail}
              onCheckedChange={(state) =>
                setRememberEmail(state === "indeterminate" ? false : state)
              }
              title="Remember my email on this device"
              className="self-center"
              textClassName="select-none font-normal text-foreground/80"
            />
            <SharedSubmitButton disabled={signingIn}>
              {"Sign In"}
            </SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
      <CardFooter className="gap-2 flex-col items-stretch">
        <SharedFooterAction
          title={"Don't have an account? "}
          action={"Sign Up"}
          onClick={onSignUpClick}
        />
        <SharedFooterAction
          title={"Forgot your password? "}
          action={"Reset"}
          onClick={onForgotPasswordClick}
        />
      </CardFooter>
    </SharedCardRoot>
  );
};
