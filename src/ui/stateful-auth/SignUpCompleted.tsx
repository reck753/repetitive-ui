import { Div } from "@repetitive-ui/primitives/div/Div";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import { Span } from "@repetitive-ui/primitives/span/Span";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
} from "../shared-auth/SharedAuth";
import { MailboxSvg } from "@repetitive-ui/illustrations/MailboxSvg";

export const SignUpCompleted = () => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"We are almost done"}</SharedCardTitle>
        <SharedCardDescription>
          {"Please check your email to confirm your account."}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Div className="flex flex-col gap-6 items-center">
          <MailboxSvg className="size-[200px]" />
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
