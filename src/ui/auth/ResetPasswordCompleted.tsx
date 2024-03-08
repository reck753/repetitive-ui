import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
} from "./SharedAuth";
import { CompletingSvg } from "@repetitive-ui/illustrations/CompletingSvg";

type ResetPasswordCompletedFormProps = {
  onSubmit: () => void;
};

export const ResetPasswordCompletedForm = ({
  onSubmit,
}: ResetPasswordCompletedFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"Password Reset Completed"}</SharedCardTitle>
        <SharedCardDescription>
          {"Your password has been successfully reset."}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Div className="flex flex-col gap-6 items-center">
          <CompletingSvg className="size-[200px]" />
          <Form onSubmit={onSubmit}>
            <Div className="flex flex-col gap-6">
              <SharedSubmitButton className="min-w-[200px]">
                {"Sign In"}
              </SharedSubmitButton>
            </Div>
          </Form>
        </Div>
      </CardContent>
    </SharedCardRoot>
  );
};
