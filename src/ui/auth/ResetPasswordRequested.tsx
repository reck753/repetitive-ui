import { MailSentSvg } from "@repetitive-ui/illustrations/MailSentSvg";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import { Span } from "@repetitive-ui/primitives/span/Span";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
} from "./SharedAuth";

export type ResetPasswordRequested = {
  email?: string;
};

export const ResetPasswordRequestedForm = () => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"Password Reset Requested"}</SharedCardTitle>
        <SharedCardDescription>
          {
            "We have sent you an email with instructions to reset your password."
          }
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Div className="flex flex-col gap-6 items-center">
          <MailSentSvg className="size-[200px]" />
          <Span className="text-center text-muted-foreground">
            {
              "If you don't see the email, check other places it might be, like your junk, spam, social, or other folders."
            }
          </Span>
        </Div>
      </CardContent>
    </SharedCardRoot>
  );
};
