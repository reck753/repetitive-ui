import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { EmailInput } from "@repetitive-ui/primitives/input/EmailInput";
import { CardContent, CardFooter } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedSubmitButton,
  SharedFooterAction,
} from "../shared-auth/SharedAuth";

export type ForgotPassword = {
  email?: string;
};

type ForgotPasswordFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  onSignInClick: () => void;
};

export const ForgotPasswordForm = ({
  onSubmit,
  onSignInClick,
}: ForgotPasswordFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"Forgot Password?"}</SharedCardTitle>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit}>
          <Div className="flex flex-col gap-6">
            <EmailInput
              name="email"
              // defaultValue={form.email}
              autoFocus={true}
            />
            <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
      <CardFooter className="gap-4 flex-col items-stretch">
        <SharedFooterAction
          title={"Remembered your password? "}
          action={"Sign In"}
          onClick={onSignInClick}
        />
      </CardFooter>
    </SharedCardRoot>
  );
};
