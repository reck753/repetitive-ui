"use client";

import { useState, useLayoutEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { PasswordInput } from "@repetitive-ui/primitives/input/PasswordInput";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@repetitive-ui/primitives/alert/Alert";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
} from "../shared-auth/SharedAuth";

export type ResetPassword = {
  password?: string;
  confirmPassword?: string;
  token?: string;
};

type ResetPasswordFormProps = {
  token: string | undefined;
  resettingPassword: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export const ResetPasswordForm = ({
  token,
  resettingPassword,
  onSubmit,
}: ResetPasswordFormProps) => {
  const [error, setError] = useState<string | undefined>();

  useLayoutEffect(() => {
    if (!token) {
      setError("Missing token");
    }
  }, [token]);

  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"Reset Password"}</SharedCardTitle>
        <SharedCardDescription>
          {"Enter and confirm your new password below"}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        {error ? (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{"Error"}</AlertTitle>
            <AlertDescription>
              {error === "Missing token"
                ? "Invalid reset password token. Please try again by clicking the link in your email."
                : "An error occurred while resetting your password. Please try again."}
            </AlertDescription>
          </Alert>
        ) : (
          <Form onSubmit={onSubmit}>
            <Div className="flex flex-col gap-6">
              <PasswordInput name="password" autoFocus={true} />
              <PasswordInput
                name="confirm-password"
                placeholder="Confirm Password"
              />
              <SharedSubmitButton busy={resettingPassword}>
                {"Continue"}
              </SharedSubmitButton>
            </Div>
          </Form>
        )}
      </CardContent>
    </SharedCardRoot>
  );
};
