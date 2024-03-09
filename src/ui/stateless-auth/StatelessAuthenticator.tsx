"use client";

import { ConfirmAccountForm } from "./ConfirmAccount";
import { ForgotPasswordForm } from "./ForgotPassword";
import { ResetPasswordForm } from "./ResetPassword";
import { ResetPasswordRequestedForm } from "./ResetPasswordRequested";
import { SignInForm, rememberEmailStorageKey } from "./SignIn";
import { PhoneNumber, SignUpForm } from "./SignUp";
import { SignUpAdditionalInfoForm } from "./SignUpAdditionalInfo";
import { SignUpBasicInfoForm } from "./SignUpBasicInfo";
import { SignUpPasswordsForm } from "./SignUpPasswords";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  extractPhoneDigits,
  getSafeErrorMessage,
  getStringFromFormData,
  getStringParam,
  isValidEmail,
  toServerDateString,
} from "@repetitive-ui/utils";
import { ReactNode } from "react";
import { useSignIn } from "@repetitive-ui/hooks/api/useSignIn";
import { useCheckEmail } from "@repetitive-ui/hooks/api/useCheckEmail";
import { useCheckPhone } from "@repetitive-ui/hooks/api/useCheckPhone";
import { useForgotPassword } from "@repetitive-ui/hooks/api/useForgotPassword";
import { useResetPassword } from "@repetitive-ui/hooks/api/useResetPassword";
import { useSignUp } from "@repetitive-ui/hooks/api/useSignUp";
import { useVerifyEmail } from "@repetitive-ui/hooks/api/useVerifyEmail";
import { Span } from "@repetitive-ui/primitives/span/Span";
import { toast } from "@repetitive-ui/primitives/toast/Toast";
import { ResetPasswordCompletedForm } from "./ResetPasswordCompleted";
import { SignUpCompleted } from "./SignUpCompleted";
import parsePhoneNumber from "libphonenumber-js/core";
import metadata from "libphonenumber-js/min/metadata";
import { AuthError } from "@repetitive-ui/types";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { Logo } from "../logo/Logo";
import { Button } from "@repetitive-ui/primitives/button/Button";
import { Link } from "@repetitive-ui/primitives/link/Link";

type Step =
  | "SignIn"
  | "SignUp"
  | "SignUpPasswords"
  | "SignUpBasicInfo"
  | "SignUpAdditionalInfo"
  | "SignUpCompleted"
  | "ConfirmAccount"
  | "ForgotPassword"
  | "ResetPasswordRequested"
  | "ResetPassword"
  | "ResetPasswordCompleted";

const makeStep = (step: string | null): Step => {
  switch (step) {
    case null:
      return "SignIn";
    case "SignIn":
      return "SignIn";
    case "SignUp":
      return "SignUp";
    case "SignUpPasswords":
      return "SignUpPasswords";
    case "SignUpBasicInfo":
      return "SignUpBasicInfo";
    case "SignUpAdditionalInfo":
      return "SignUpAdditionalInfo";
    case "SignUpCompleted":
      return "SignUpCompleted";
    case "ConfirmAccount":
      return "ConfirmAccount";
    case "ForgotPassword":
      return "ForgotPassword";
    case "ResetPasswordRequested":
      return "ResetPasswordRequested";
    case "ResetPassword":
      return "ResetPassword";
    case "ResetPasswordCompleted":
      return "ResetPasswordCompleted";
    default:
      return "SignIn";
  }
};

type StatelessAuthenticatorProps = {
  onSuccessfulSignIn: () => void;
};

// const rememberedEmail =
//   typeof window !== "undefined"
//     ? localStorage.getItem(rememberEmailStorageKey)
//     : "";

export const StatelessAuthenticator = ({
  onSuccessfulSignIn,
}: StatelessAuthenticatorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = makeStep(searchParams.get("step"));
  const confirmAccountCode = getStringParam(searchParams, "code");
  const resetPasswordToken = getStringParam(searchParams, "token");
  const signIn = useSignIn();
  const checkEmail = useCheckEmail();
  const checkPhone = useCheckPhone();
  const signUp = useSignUp();
  const verifyEmail = useVerifyEmail();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();

  const updateStepParam = (value: Step) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("step", value);

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const handleGoToForgotPassword = () => {
    updateStepParam("ForgotPassword");
  };

  const handleGoToSignUp = () => {
    updateStepParam("SignUp");
  };

  const handleGoToSignIn = () => {
    updateStepParam("SignIn");
  };

  const handleGoToSignUpPasswords = () => {
    updateStepParam("SignUpPasswords");
  };

  const handleGoToSignUpBasicInfo = () => {
    updateStepParam("SignUpBasicInfo");
  };

  const handleGoToSignUpAdditionalInfo = () => {
    updateStepParam("SignUpAdditionalInfo");
  };

  const handleGoToSignUpCompleted = () => {
    updateStepParam("SignUpCompleted");
  };

  const handleGoToResetPasswordRequested = () => {
    updateStepParam("ResetPasswordRequested");
  };

  const handleGoToResetPasswordCompleted = () => {
    updateStepParam("ResetPasswordCompleted");
  };

  const handleSignIn = (
    email: string | undefined,
    password: string | undefined,
    rememberEmail: boolean
  ) => {
    const trimmedEmail = email?.trim();
    if (trimmedEmail && password) {
      if (rememberEmail) {
        localStorage.setItem(rememberEmailStorageKey, trimmedEmail);
      } else {
        localStorage.removeItem(rememberEmailStorageKey);
      }
      toast.promise(
        signIn.trigger({
          username: trimmedEmail,
          password: password,
        }),
        {
          loading: "Trying to sign in...",
          success: (response) => {
            if (response.code === "success") {
              onSuccessfulSignIn();
              return (
                <Span className="text-foreground">
                  {"Welcome "}
                  <Span className="text-primary">
                    {response.user.full_name}
                  </Span>
                  {"!"}
                </Span>
              );
            } else {
              throw new Error("[L-0001] Invalid credentials");
            }
          },
          error: (error) => {
            if (error instanceof Error) {
              if (error.message.startsWith("[L-0001]")) {
                return "Invalid email or password. Please try again.";
              }
              return "An unknown error occurred. Please try again.";
            } else {
              return getSafeErrorMessage(error);
            }
          },
          position: "top-center",
          duration: 2000,
        }
      );
    } else {
      toast.error("Please provide your credentials", {
        position: "top-center",
      });
    }
  };

  const handleCheckEmailAndPassword = (
    email: string | undefined,
    phone: string | undefined,
    countryCode: string | undefined
  ) => {
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedCountryCode = countryCode?.trim();
    if (!trimmedEmail) {
      toast.error("Please provide your email address", {
        position: "top-center",
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Invalid email address", {
        description:
          "This doesn't look like a valid email address, please check and try again",
        position: "top-center",
      });
      return;
    }

    if (!trimmedPhone) {
      toast.error("Please provide your phone number", {
        position: "top-center",
      });
      return;
    }

    if (!trimmedCountryCode) {
      toast.error("Please select calling country code", {
        position: "top-center",
      });
      return;
    }

    const fullPhone = trimmedCountryCode + extractPhoneDigits(trimmedPhone);

    const phoneNumber = parsePhoneNumber(fullPhone, metadata);

    if (!phoneNumber) {
      toast.error("Invalid phone number", {
        description:
          "This doesn't look like a valid phone number, please check and try again",
        position: "top-center",
      });
      return;
    }

    const internationalPhoneNumber = phoneNumber.format("E.164");

    Promise.all([
      checkEmail.trigger({
        email: trimmedEmail,
      }),
      checkPhone.trigger({
        phone: internationalPhoneNumber,
      }),
    ])
      .then(([emailResponse, phoneResponse]) => {
        // NOTE These are currently not used, but might be useful
        // in the future improve the API response, or might be
        // removed if we agree on 200 OK for valid and 4XX for invalid
        if (emailResponse.code !== "valid") {
          throw new Error("[CE-0001] Invalid email", {
            cause: emailResponse.message,
          });
        }
        if (phoneResponse.code !== "valid") {
          throw new Error("[CP-0001] Invalid phone", {
            cause: phoneResponse.message,
          });
        }
        handleGoToSignUpPasswords();
      })
      .catch((error) => {
        if (error instanceof Error) {
          const message = error.message.startsWith("[CE-0001]")
            ? "Invalid email"
            : error.message.startsWith("[CP-0001]")
            ? "Invalid phone"
            : "Unknown error";
          const cause =
            error.message.startsWith("[CE-0001]") ||
            error.message.startsWith("[CP-0001]")
              ? (error.cause as string | undefined)
              : undefined;
          toast.error(message, {
            position: "top-center",
            description: cause,
          });
        } else {
          toast.error(
            (error as AuthError).message ?? "An unknown error occurred",
            {
              position: "top-center",
            }
          );
        }
      });
  };

  const handleCheckSignUpPasswords = (
    password: string | undefined,
    confirmPassword: string | undefined
  ) => {
    if (!password) {
      toast.error("Please provide a password", {
        position: "top-center",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password is too short", {
        description: "Please provide a password of at least 8 characters",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one uppercase letter
    if (!/[A-Z]/.test(password)) {
      toast.error("Password is too weak", {
        description:
          "Please provide a password with at least one uppercase letter",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one lowercase letter
    if (!/[a-z]/.test(password)) {
      toast.error("Password is too weak", {
        description:
          "Please provide a password with at least one lowercase letter",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one digit
    if (!/\d/.test(password)) {
      toast.error("Password is too weak", {
        description: "Please provide a password with at least one digit",
        position: "top-center",
      });
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password", {
        position: "top-center",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }

    handleGoToSignUpBasicInfo();
  };

  const handleProceedToSignUpAdditionalInfo = (
    firstName: string | undefined,
    lastName: string | undefined,
    gender: string | undefined,
    dateOfBirth: string | undefined
  ) => {
    const trimmedFirstName = firstName?.trim();
    const trimmedLastName = lastName?.trim();
    const trimmedGender = gender?.trim();
    const trimmedDateOfBirth = dateOfBirth?.trim();

    if (!trimmedFirstName) {
      toast.error("Please provide your first name", {
        position: "top-center",
      });
      return;
    }

    if (!trimmedLastName) {
      toast.error("Please provide your last name", {
        position: "top-center",
      });
      return;
    }

    if (!trimmedGender) {
      toast.error("Please select your gender", {
        position: "top-center",
      });
      return;
    }

    if (!trimmedDateOfBirth) {
      toast.error("Please provide your date of birth", {
        position: "top-center",
      });
      return;
    }

    handleGoToSignUpAdditionalInfo();
  };

  const handleSubmitSignUp = (
    country: string | undefined,
    city: string | undefined,
    address: string | undefined,
    postalCode: string | undefined
  ) => {
    const trimmedCountry = country?.trim();
    const trimmedCity = city?.trim();
    const trimmedAddress = address?.trim();
    const trimmedPostalCode = postalCode?.trim();

    // FIXME AB sign up flow data
    const phone: PhoneNumber = {
      countryCode: "+1",
      number: "1234567890",
    };

    const rawPhone = phone.countryCode + extractPhoneDigits(phone.number);

    const phoneNumber = parsePhoneNumber(rawPhone, metadata);

    if (!phoneNumber) {
      toast.error("Invalid phone number", {
        description:
          "Phone number appears to be invalid, please go back and try again",
        position: "top-center",
      });
      return;
    }

    const internationalPhoneNumber = phoneNumber.format("E.164");

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      dateOfBirth,
    } = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      gender: "other",
      dateOfBirth: "1990-01-01",
    };

    toast.promise(
      signUp.trigger({
        email,
        phone: internationalPhoneNumber,
        raw_phone: rawPhone,
        password,
        confirm_password: confirmPassword,
        name: firstName,
        surname: lastName,
        gender: gender,
        date_of_birth: dateOfBirth,
        country: trimmedCountry,
        city: trimmedCity,
        address: trimmedAddress,
        postal_code: trimmedPostalCode,
      }),
      {
        loading: "Trying to sign up...",
        success: (response) => {
          if (response.code === "success") {
            handleGoToSignUpCompleted();
            return (
              <Span className="text-foreground">
                {"Confirmation email sent to " + email}
              </Span>
            );
          } else {
            throw new Error(response.message);
          }
        },
        error: (error) => {
          if (error instanceof Error) {
            return error.message;
          } else {
            return getSafeErrorMessage(error);
          }
        },
        position: "top-center",
        duration: 2000,
      }
    );
  };

  const handleVerifyEmail = (
    token: string,
    onError: (message?: string) => void
  ) => {
    verifyEmail
      .trigger({ code: token })
      .then((response) => {
        if (response.code === "success") {
          toast.success("Email verified", {
            description: "You can now sign in into your account",
            position: "top-center",
          });
          router.push(pathname);
        } else {
          onError(response.message);
        }
      })
      .catch((_error) => {
        onError();
      });
  };

  const handleForgotPassword = (email: string | undefined) => {
    const trimmedEmail = email?.trim();
    if (!trimmedEmail) {
      toast.error("Please provide your email address", {
        position: "top-center",
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Invalid email address", {
        description:
          "This doesn't look like a valid email address, please check and try again",
        position: "top-center",
      });
      return;
    }

    toast.promise(forgotPassword.trigger({ username: trimmedEmail }), {
      loading: "Requesting password reset...",
      success: (response) => {
        if (response.code === "success") {
          handleGoToResetPasswordRequested();
          return (
            <Span className="text-foreground">
              {"Password reset instructions sent to " + trimmedEmail}
            </Span>
          );
        } else {
          throw new Error(response.message);
        }
      },
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        } else {
          return getSafeErrorMessage(error);
        }
      },
      position: "top-center",
      duration: 2000,
    });
  };

  const handleResetPassword = (
    newPassword: string | undefined,
    confirmPassword: string | undefined,
    token: string | undefined
  ) => {
    if (!newPassword) {
      toast.error("Please provide a new password", {
        position: "top-center",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password is too short", {
        description: "Please provide a password of at least 8 characters",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one uppercase letter
    if (!/[A-Z]/.test(newPassword)) {
      toast.error("Password is too weak", {
        description:
          "Please provide a password with at least one uppercase letter",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one lowercase letter
    if (!/[a-z]/.test(newPassword)) {
      toast.error("Password is too weak", {
        description:
          "Please provide a password with at least one lowercase letter",
        position: "top-center",
      });
      return;
    }

    // Check if password contains one digit
    if (!/\d/.test(newPassword)) {
      toast.error("Password is too weak", {
        description: "Please provide a password with at least one digit",
        position: "top-center",
      });
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password", {
        position: "top-center",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }

    if (!token) {
      toast.error("Invalid reset password token", {
        position: "top-center",
      });
      return;
    }

    toast.promise(
      resetPassword.trigger({
        new_password: newPassword,
        confirm_password: confirmPassword,
        token,
      }),
      {
        loading: "Resetting your password...",
        success: (response) => {
          if (response.code === "success") {
            handleGoToResetPasswordCompleted();
            return (
              <Span className="text-foreground">
                {"Password reset successfully"}
              </Span>
            );
          } else {
            throw new Error(response.message);
          }
        },
        error: (error) => {
          if (error instanceof Error) {
            return error.message;
          } else {
            return getSafeErrorMessage(error);
          }
        },
        position: "top-center",
        duration: 2000,
      }
    );
  };

  switch (step) {
    case "SignIn":
      return (
        <SignInForm
          signingIn={signIn.isMutating}
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);

            handleSignIn(
              getStringFromFormData(formData, "email"),
              getStringFromFormData(formData, "password"),
              getStringFromFormData(formData, "remember-email") === "on"
            );
          }}
          onForgotPasswordClick={handleGoToForgotPassword}
          onSignUpClick={handleGoToSignUp}
        />
      );
    case "SignUp":
      return (
        <SignUpForm
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);
            handleCheckEmailAndPassword(
              getStringFromFormData(formData, "email"),
              getStringFromFormData(formData, "phone"),
              getStringFromFormData(formData, "country-code")
            );
          }}
          // FIXME AB How to do this disabled state?
          disabled={false}
          // disabled={
          //   (state.email?.trim() ?? "") === "" ||
          //   (state.phone?.number.trim() ?? "") === ""
          // }
          checkingEmailOrPhone={checkEmail.isMutating || checkPhone.isMutating}
          onSignInClick={handleGoToSignIn}
        />
      );
    case "SignUpPasswords":
      return (
        <SignUpPasswordsForm
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);
            handleCheckSignUpPasswords(
              getStringFromFormData(formData, "password"),
              getStringFromFormData(formData, "confirm-password")
            );
          }}
        />
      );
    case "SignUpBasicInfo":
      return (
        <SignUpBasicInfoForm
          onSubmit={(data) => {
            handleProceedToSignUpAdditionalInfo(
              data["first-name"],
              data["last-name"],
              data.gender,
              toServerDateString(data["date-of-birth"])
            );
          }}
        />
      );
    case "SignUpAdditionalInfo":
      return (
        <SignUpAdditionalInfoForm
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);
            handleSubmitSignUp(
              getStringFromFormData(formData, "country"),
              getStringFromFormData(formData, "city"),
              getStringFromFormData(formData, "address"),
              getStringFromFormData(formData, "postal-code")
            );
          }}
        />
      );
    case "SignUpCompleted":
      return <SignUpCompleted />;
    case "ConfirmAccount":
      return (
        <ConfirmAccountForm
          token={confirmAccountCode}
          verifyingEmail={verifyEmail.isMutating}
          onSubmit={({ onError, token }) => {
            handleVerifyEmail(token, onError);
          }}
        />
      );
    case "ForgotPassword":
      return (
        <ForgotPasswordForm
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);
            handleForgotPassword(getStringFromFormData(formData, "email"));
          }}
          onSignInClick={handleGoToSignIn}
        />
      );
    case "ResetPasswordRequested":
      return <ResetPasswordRequestedForm />;

    case "ResetPassword":
      return (
        <ResetPasswordForm
          token={resetPasswordToken}
          resettingPassword={resetPassword.isMutating}
          onSubmit={(e) => {
            const formData = new FormData(e.target as any);
            handleResetPassword(
              getStringFromFormData(formData, "password"),
              getStringFromFormData(formData, "confirm-password"),
              resetPasswordToken
            );
          }}
        />
      );
    case "ResetPasswordCompleted":
      return (
        <ResetPasswordCompletedForm
          onSubmit={() => {
            router.push(pathname);
          }}
        />
      );
  }
};

type AuthenticatorContainerProps = {
  children: ReactNode;
};

const AuthenticatorContainer = ({ children }: AuthenticatorContainerProps) => {
  return (
    <Div className="flex flex-1 min-h-dvh justify-center py-12">
      <Div className="flex flex-col flex-1 max-w-md gap-6">
        <Link href={"/"} className="flex flex-col relative">
          <Logo />
          <Span className="text-sm font-bold text-destructive text-center absolute -bottom-5 left-0 right-0">
            Work in Progress
          </Span>
        </Link>
        {children}
      </Div>
    </Div>
  );
};

type StatelessAuthenticatorPageProps = {
  children: ReactNode;
};

export const StatelessAuthenticatorPage = ({
  children,
}: StatelessAuthenticatorPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = searchParams.get("auth-status") ?? "unauthenticated";

  if (status === "authenticated") {
    return (
      <Div className="flex flex-col gap-10 py-12">
        {children}
        <Button
          onClick={() => {
            // now you got a read/write object
            const current = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            current.delete("auth-status");

            // cast to string
            const search = current.toString();
            // or const query = `${'?'.repeat(search.length && 1)}${search}`;
            const query = search ? `?${search}` : "";

            router.replace(`${pathname}${query}`);
          }}
          className="self-center"
        >
          Sign Out
        </Button>
      </Div>
    );
  }

  return (
    <AuthenticatorContainer>
      <StatelessAuthenticator
        onSuccessfulSignIn={() => {
          // now you got a read/write object
          const current = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          current.set("auth-status", "authenticated");

          // cast to string
          const search = current.toString();
          // or const query = `${'?'.repeat(search.length && 1)}${search}`;
          const query = search ? `?${search}` : "";

          router.push(`${pathname}${query}`);
        }}
      />
    </AuthenticatorContainer>
  );
};
