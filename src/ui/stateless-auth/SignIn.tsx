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
} from "../shared-auth/SharedAuth";

export type SignIn = {
  email?: string;
  password?: string;
};

type SignInFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  onForgotPasswordClick: () => void;
  onSignUpClick: () => void;
  signingIn?: boolean;
};

export const rememberEmailStorageKey = "repetitive-ui::remember-email";

const rememberedEmail =
  typeof window !== "undefined"
    ? !!localStorage.getItem(rememberEmailStorageKey)
    : false;

export const SignInForm = ({
  onSubmit,
  onForgotPasswordClick,
  onSignUpClick,
  signingIn,
}: SignInFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle> {"Welcome!"} </SharedCardTitle>
        <SharedCardDescription>
          {"Enter your email and password to sign in"}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit} busy={signingIn}>
          <Div className="flex flex-col gap-6">
            <EmailInput
              name="email"
              // defaultValue={form.email ?? ""}
              // autoFocus={form.email ? false : true}
            />
            <PasswordInput
              name="password"
              // defaultValue={form.password ?? ""}
              // autoFocus={form.email ? true : false}
            />
            <CheckboxWithTitle
              id="remember-email"
              htmlFor="remember-email"
              name="remember-email"
              defaultChecked={rememberedEmail}
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
