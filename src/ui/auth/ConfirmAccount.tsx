import { useState, useLayoutEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { H1 } from "@repetitive-ui/primitives/heading/Heading";
import { Spinner } from "@repetitive-ui/primitives/spinner/Spinner";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@repetitive-ui/shadcn/alert/alert";
import { ExternalLink } from "@repetitive-ui/primitives/link/ExternalLink";
import { Span } from "@repetitive-ui/primitives/span/Span";
import { Button } from "@repetitive-ui/primitives/button/Button";
import { CONTACT_SUPPORT_EMAIL } from "@repetitive-ui/constants";

export type ConfirmAccount = {
  token?: string;
};

type ConfirmAccountFormProps = {
  form: ConfirmAccount;
  verifyingEmail: boolean;
  onSubmit: ({
    onError,
    token,
  }: {
    onError: (message?: string) => void;
    token: string;
  }) => void;
};

const maxRetries = 3;

export const ConfirmAccountForm = ({
  form: { token },
  verifyingEmail,
  onSubmit,
}: ConfirmAccountFormProps) => {
  const [error, setError] = useState<{
    cause: string | undefined;
    message: string | undefined;
  }>();
  const [retryCount, setRetryCount] = useState(0);

  useLayoutEffect(() => {
    if (!verifyingEmail) {
      if (token) {
        onSubmit({
          token: token,
          onError: (message) => setError({ cause: "API Error", message }),
        });
      } else {
        setError({ cause: "Missing token", message: undefined });
      }
    }
  }, [token, verifyingEmail, onSubmit]);

  return (
    <Div className="flex flex-col gap-6">
      <Div className="flex flex-col gap-1 items-center">
        <H1 className="text-2xl font-bold text-center">
          {"Confirming Your Account"}
        </H1>
        <Span className="text-muted-foreground">
          {"We are confirming your account. Please wait a moment."}
        </Span>
      </Div>
      {error ? (
        <>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{"Error"}</AlertTitle>
            <AlertDescription>
              {error.cause === "API Error" ? (
                retryCount < maxRetries ? (
                  error.message ??
                  "An error occurred while confirming your account. Please try again."
                ) : (
                  <>
                    {
                      "Please try again by clicking the link in your email. If you continue to have issues, please contact support at "
                    }
                    <ExternalLink
                      href={`mailto:${CONTACT_SUPPORT_EMAIL}`}
                      className="underline font-medium"
                    >
                      {CONTACT_SUPPORT_EMAIL}
                    </ExternalLink>
                    {"."}
                  </>
                )
              ) : (
                "Invalid confirmation token. Please try again by clicking the link in your email."
              )}
            </AlertDescription>
          </Alert>
          {error.cause === "API Error" &&
            token &&
            (retryCount >= maxRetries ? null : (
              <Div className="pt-3 self-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setRetryCount((prev) => prev + 1);
                    setError(undefined);
                    onSubmit({
                      token: token,
                      onError: (message) =>
                        setError({ cause: "API Error", message }),
                    });
                  }}
                >
                  {"Try Again"}
                </Button>
              </Div>
            ))}
        </>
      ) : (
        <Spinner className="w-8 h-8 self-center" />
      )}
    </Div>
  );
};
