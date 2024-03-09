"use client";

import { countries } from "@repetitive-ui/primitives/select/CountrySelect";
import { ConfirmAccount, ConfirmAccountForm } from "./ConfirmAccount";
import { ForgotPassword, ForgotPasswordForm } from "./ForgotPassword";
import { ResetPassword, ResetPasswordForm } from "./ResetPassword";
import {
  ResetPasswordRequested,
  ResetPasswordRequestedForm,
} from "./ResetPasswordRequested";
import { SignIn, SignInForm, rememberEmailStorageKey } from "./SignIn";
import { PhoneNumber, SignUp, SignUpForm } from "./SignUp";
import {
  SignUpAdditionalInfo,
  SignUpAdditionalInfoForm,
} from "./SignUpAdditionalInfo";
import { SignUpBasicInfo, SignUpBasicInfoForm } from "./SignUpBasicInfo";
import { SignUpPasswords, SignUpPasswordsForm } from "./SignUpPasswords";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  extractPhoneDigits,
  getSafeErrorMessage,
  getStringParam,
  isValidEmail,
} from "@repetitive-ui/utils";
import { ReactNode, useLayoutEffect, useReducer, useState } from "react";
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

type State =
  | ({
      step: "SignIn";
    } & SignIn)
  | ({
      step: "SignUp";
    } & SignUp)
  | ({
      step: "SignUpPasswords";
    } & SignUpPasswords)
  | ({
      step: "SignUpBasicInfo";
    } & SignUpBasicInfo)
  | ({
      step: "SignUpAdditionalInfo";
    } & SignUpAdditionalInfo)
  | {
      step: "SignUpCompleted";
    }
  | ({
      step: "ConfirmAccount";
    } & ConfirmAccount)
  | ({
      step: "ForgotPassword";
    } & ForgotPassword)
  | ({
      step: "ResetPasswordRequested";
    } & ResetPasswordRequested)
  | ({
      step: "ResetPassword";
    } & ResetPassword)
  | {
      step: "ResetPasswordCompleted";
    };

type Action =
  | { type: "ChangeSignInEmail"; payload: { email: string } }
  | { type: "ChangeSignInPassword"; payload: { password: string } }
  | { type: "ChangeSignUpEmail"; payload: { email: string } }
  | { type: "ChangeSignUpPhoneNumber"; payload: { number: string } }
  | { type: "ChangeSignUpPhoneCountryCode"; payload: { countryCode: string } }
  | { type: "ChangeSignUpPassword"; payload: { password: string } }
  | {
      type: "ChangeSignUpConfirmPassword";
      payload: { confirmPassword: string };
    }
  | { type: "ChangeSignUpFirstName"; payload: { firstName: string } }
  | { type: "ChangeSignUpLastName"; payload: { lastName: string } }
  | { type: "ChangeSignUpGender"; payload: { gender: string } }
  | { type: "ChangeSignUpDateOfBirth"; payload: { dateOfBirth: string } }
  | { type: "ChangeSignUpCountry"; payload: { country: string | undefined } }
  | { type: "ChangeSignUpCity"; payload: { city: string } }
  | { type: "ChangeSignUpAddress"; payload: { address: string } }
  | { type: "ChangeSignUpPostalCode"; payload: { postalCode: string } }
  | { type: "ChangeForgotPasswordEmail"; payload: { email: string } }
  | { type: "ChangeResetPasswordPassword"; payload: { password: string } }
  | {
      type: "ChangeResetPasswordConfirmPassword";
      payload: { confirmPassword: string };
    }
  | { type: "ResetPasswordCompletedResetPasswordFields" }
  | { type: "ForceStepChange"; payload: { step: State["step"] } };

const defaultCountry = countries[0];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ChangeSignInEmail": {
      return {
        step: "SignIn",
        email: action.payload.email,
        password: state.step === "SignIn" ? state.password : "",
      };
    }
    case "ChangeSignInPassword": {
      return {
        step: "SignIn",
        email: state.step === "SignIn" ? state.email : "",
        password: action.payload.password,
      };
    }
    case "ChangeSignUpEmail": {
      return {
        step: "SignUp",
        email: action.payload.email,
        phone:
          state.step === "SignUp"
            ? state.phone
            : { number: "", countryCode: defaultCountry.code },
      };
    }
    case "ChangeSignUpPhoneNumber": {
      return {
        step: "SignUp",
        email: state.step === "SignUp" ? state.email : "",
        phone: {
          number: action.payload.number,
          countryCode:
            state.step === "SignUp" && state.phone
              ? state.phone.countryCode
              : defaultCountry.code,
        },
      };
    }
    case "ChangeSignUpPhoneCountryCode": {
      return {
        step: "SignUp",
        email: state.step === "SignUp" ? state.email : "",
        phone: {
          number:
            state.step === "SignUp" && state.phone ? state.phone.number : "",
          countryCode: action.payload.countryCode,
        },
      };
    }
    case "ChangeSignUpPassword": {
      return {
        ...state,
        step: "SignUpPasswords",
        password: action.payload.password,
        confirmPassword:
          state.step === "SignUpPasswords" ? state.confirmPassword : "",
      };
    }
    case "ChangeSignUpConfirmPassword": {
      return {
        ...state,
        step: "SignUpPasswords",
        password: state.step === "SignUpPasswords" ? state.password : "",
        confirmPassword: action.payload.confirmPassword,
      };
    }
    case "ChangeSignUpFirstName": {
      return {
        ...state,
        step: "SignUpBasicInfo",
        firstName: action.payload.firstName,
        lastName: state.step === "SignUpBasicInfo" ? state.lastName : "",
        gender: state.step === "SignUpBasicInfo" ? state.gender : undefined,
        dateOfBirth:
          state.step === "SignUpBasicInfo" ? state.dateOfBirth : undefined,
      };
    }
    case "ChangeSignUpLastName": {
      return {
        ...state,
        step: "SignUpBasicInfo",
        firstName: state.step === "SignUpBasicInfo" ? state.firstName : "",
        lastName: action.payload.lastName,
        gender: state.step === "SignUpBasicInfo" ? state.gender : undefined,
        dateOfBirth:
          state.step === "SignUpBasicInfo" ? state.dateOfBirth : undefined,
      };
    }
    case "ChangeSignUpGender": {
      return {
        ...state,
        step: "SignUpBasicInfo",
        firstName: state.step === "SignUpBasicInfo" ? state.firstName : "",
        lastName: state.step === "SignUpBasicInfo" ? state.lastName : "",
        gender: action.payload.gender,
        dateOfBirth:
          state.step === "SignUpBasicInfo" ? state.dateOfBirth : undefined,
      };
    }
    case "ChangeSignUpDateOfBirth": {
      return {
        ...state,
        step: "SignUpBasicInfo",
        firstName: state.step === "SignUpBasicInfo" ? state.firstName : "",
        lastName: state.step === "SignUpBasicInfo" ? state.lastName : "",
        gender: state.step === "SignUpBasicInfo" ? state.gender : undefined,
        dateOfBirth: action.payload.dateOfBirth,
      };
    }
    case "ChangeSignUpCountry": {
      return {
        ...state,
        step: "SignUpAdditionalInfo",
        country: action.payload.country,
        city: state.step === "SignUpAdditionalInfo" ? state.city : "",
        address: state.step === "SignUpAdditionalInfo" ? state.address : "",
        postalCode:
          state.step === "SignUpAdditionalInfo" ? state.postalCode : "",
      };
    }
    case "ChangeSignUpCity": {
      return {
        ...state,
        step: "SignUpAdditionalInfo",
        country:
          state.step === "SignUpAdditionalInfo" ? state.country : undefined,
        city: action.payload.city,
        address: state.step === "SignUpAdditionalInfo" ? state.address : "",
        postalCode:
          state.step === "SignUpAdditionalInfo" ? state.postalCode : "",
      };
    }
    case "ChangeSignUpAddress": {
      return {
        ...state,
        step: "SignUpAdditionalInfo",
        country:
          state.step === "SignUpAdditionalInfo" ? state.country : undefined,
        city: state.step === "SignUpAdditionalInfo" ? state.city : "",
        address: action.payload.address,
        postalCode:
          state.step === "SignUpAdditionalInfo" ? state.postalCode : "",
      };
    }
    case "ChangeSignUpPostalCode": {
      return {
        ...state,
        step: "SignUpAdditionalInfo",
        country:
          state.step === "SignUpAdditionalInfo" ? state.country : undefined,
        city: state.step === "SignUpAdditionalInfo" ? state.city : "",
        address: state.step === "SignUpAdditionalInfo" ? state.address : "",
        postalCode: action.payload.postalCode,
      };
    }
    case "ChangeForgotPasswordEmail": {
      return { step: "ForgotPassword", email: action.payload.email };
    }
    case "ChangeResetPasswordPassword": {
      return {
        step: "ResetPassword",
        password: action.payload.password,
        confirmPassword:
          state.step === "ResetPassword" ? state.confirmPassword : "",
        token: state.step === "ResetPassword" ? state.token : "",
      };
    }
    case "ChangeResetPasswordConfirmPassword": {
      return {
        step: "ResetPassword",
        password: state.step === "ResetPassword" ? state.password : "",
        confirmPassword: action.payload.confirmPassword,
        token: state.step === "ResetPassword" ? state.token : "",
      };
    }
    case "ResetPasswordCompletedResetPasswordFields": {
      return {
        ...(state as any),
        step: "ResetPasswordCompleted",
        password: "",
        confirmPassword: "",
      };
    }
    case "ForceStepChange": {
      return { ...(state as any), step: action.payload.step };
    }
  }
};

const makeStep = (step: string | null): State["step"] => {
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

type StatefulAuthenticatorProps = {
  onSuccessfulSignUp: () => void;
  initialState?: State;
};

const rememberedEmail =
  typeof window !== "undefined"
    ? localStorage.getItem(rememberEmailStorageKey)
    : "";

export const StatefulAuthenticator = ({
  onSuccessfulSignUp,
  initialState = {
    step: "SignIn",
    email: rememberedEmail ?? "",
    password: "",
  },
}: StatefulAuthenticatorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = makeStep(searchParams.get("step"));
  const confirmAccountCode = getStringParam(searchParams, "code");
  const resetPasswordToken = getStringParam(searchParams, "token");
  const [state, dispatch] = useReducer(reducer, initialState);
  const signIn = useSignIn();
  const checkEmail = useCheckEmail();
  const checkPhone = useCheckPhone();
  const signUp = useSignUp();
  const verifyEmail = useVerifyEmail();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();

  useLayoutEffect(() => {
    dispatch({ type: "ForceStepChange", payload: { step } });
  }, [step]);

  const updateStepParam = (value: State["step"]) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("step", value);

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const removeStepParam = () => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("step");

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
              onSuccessfulSignUp();
              removeStepParam();
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
        // Update the state with trimmed values as whitespace
        // are not usually found in email and phone
        dispatch({
          type: "ChangeSignUpEmail",
          payload: { email: trimmedEmail },
        });
        dispatch({
          type: "ChangeSignUpPhoneNumber",
          payload: { number: trimmedPhone },
        });
        dispatch({
          type: "ChangeSignUpPhoneCountryCode",
          payload: { countryCode: trimmedCountryCode },
        });
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

    dispatch({
      type: "ChangeSignUpPassword",
      payload: { password },
    });

    dispatch({
      type: "ChangeSignUpConfirmPassword",
      payload: { confirmPassword },
    });

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

    dispatch({
      type: "ChangeSignUpFirstName",
      payload: { firstName: trimmedFirstName },
    });

    dispatch({
      type: "ChangeSignUpLastName",
      payload: { lastName: trimmedLastName },
    });

    dispatch({
      type: "ChangeSignUpGender",
      payload: { gender: trimmedGender },
    });

    dispatch({
      type: "ChangeSignUpDateOfBirth",
      payload: { dateOfBirth: trimmedDateOfBirth },
    });

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

    const phone = (state as any).phone as PhoneNumber;

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
    } = state as Record<string, string>;

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

  switch (state.step) {
    case "SignIn":
      return (
        <SignInForm
          form={state}
          onEmailChange={(email) =>
            dispatch({ type: "ChangeSignInEmail", payload: { email } })
          }
          onPasswordChange={(password) =>
            dispatch({ type: "ChangeSignInPassword", payload: { password } })
          }
          signingIn={signIn.isMutating}
          onSubmit={(_e, rememberEmail) =>
            handleSignIn(state.email, state.password, rememberEmail)
          }
          onForgotPasswordClick={handleGoToForgotPassword}
          onSignUpClick={handleGoToSignUp}
        />
      );
    case "SignUp":
      return (
        <SignUpForm
          form={state}
          onEmailChange={(email) =>
            dispatch({ type: "ChangeSignUpEmail", payload: { email } })
          }
          onPhoneChange={(number) =>
            dispatch({ type: "ChangeSignUpPhoneNumber", payload: { number } })
          }
          onCountryCodeChange={(countryCode) =>
            dispatch({
              type: "ChangeSignUpPhoneCountryCode",
              payload: { countryCode },
            })
          }
          onSubmit={() => {
            handleCheckEmailAndPassword(
              state.email,
              state.phone?.number,
              state.phone?.countryCode
            );
          }}
          disabled={
            (state.email?.trim() ?? "") === "" ||
            (state.phone?.number.trim() ?? "") === ""
          }
          checkingEmailOrPhone={checkEmail.isMutating || checkPhone.isMutating}
          onSignInClick={handleGoToSignIn}
        />
      );
    case "SignUpPasswords":
      return (
        <SignUpPasswordsForm
          form={state}
          onPasswordChange={(password) =>
            dispatch({ type: "ChangeSignUpPassword", payload: { password } })
          }
          onConfirmPasswordChange={(confirmPassword) =>
            dispatch({
              type: "ChangeSignUpConfirmPassword",
              payload: { confirmPassword },
            })
          }
          onSubmit={() => {
            handleCheckSignUpPasswords(state.password, state.confirmPassword);
          }}
        />
      );
    case "SignUpBasicInfo":
      return (
        <SignUpBasicInfoForm
          form={state}
          onFirstNameChange={(firstName) =>
            dispatch({ type: "ChangeSignUpFirstName", payload: { firstName } })
          }
          onLastNameChange={(lastName) =>
            dispatch({ type: "ChangeSignUpLastName", payload: { lastName } })
          }
          onGenderChange={(gender) =>
            dispatch({ type: "ChangeSignUpGender", payload: { gender } })
          }
          onDateOfBirthChange={(dateOfBirth) =>
            dispatch({
              type: "ChangeSignUpDateOfBirth",
              payload: { dateOfBirth },
            })
          }
          onSubmit={() => {
            handleProceedToSignUpAdditionalInfo(
              state.firstName,
              state.lastName,
              state.gender,
              state.dateOfBirth
            );
          }}
        />
      );
    case "SignUpAdditionalInfo":
      return (
        <SignUpAdditionalInfoForm
          form={state}
          onCountryChange={(country) =>
            dispatch({ type: "ChangeSignUpCountry", payload: { country } })
          }
          onCityChange={(city) =>
            dispatch({ type: "ChangeSignUpCity", payload: { city } })
          }
          onAddressChange={(address) =>
            dispatch({ type: "ChangeSignUpAddress", payload: { address } })
          }
          onPostalCodeChange={(postalCode) =>
            dispatch({
              type: "ChangeSignUpPostalCode",
              payload: { postalCode },
            })
          }
          onSubmit={() => {
            handleSubmitSignUp(
              state.country,
              state.city,
              state.address,
              state.postalCode
            );
          }}
        />
      );
    case "SignUpCompleted":
      return <SignUpCompleted />;
    case "ConfirmAccount":
      return (
        <ConfirmAccountForm
          form={{ token: confirmAccountCode }}
          verifyingEmail={verifyEmail.isMutating}
          onSubmit={({ onError, token }) => {
            handleVerifyEmail(token, onError);
          }}
        />
      );
    case "ForgotPassword":
      return (
        <ForgotPasswordForm
          form={state}
          onEmailChange={(email) =>
            dispatch({ type: "ChangeForgotPasswordEmail", payload: { email } })
          }
          onSubmit={() => {
            handleForgotPassword(state.email);
          }}
          onSignInClick={handleGoToSignIn}
        />
      );
    case "ResetPasswordRequested":
      return <ResetPasswordRequestedForm />;

    case "ResetPassword":
      return (
        <ResetPasswordForm
          form={{ ...state, token: resetPasswordToken }}
          resettingPassword={resetPassword.isMutating}
          onPasswordChange={(password) =>
            dispatch({
              type: "ChangeResetPasswordPassword",
              payload: { password },
            })
          }
          onConfirmPasswordChange={(confirmPassword) =>
            dispatch({
              type: "ChangeResetPasswordConfirmPassword",
              payload: { confirmPassword },
            })
          }
          onSubmit={() => {
            handleResetPassword(
              state.password,
              state.confirmPassword,
              resetPasswordToken
            );
          }}
        />
      );
    case "ResetPasswordCompleted":
      return (
        <ResetPasswordCompletedForm
          onSubmit={() => {
            dispatch({ type: "ResetPasswordCompletedResetPasswordFields" });
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
        <Logo />
        {children}
      </Div>
    </Div>
  );
};

type StatefulAuthenticatorPageProps = {
  children: ReactNode;
  initialState?: State;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const StatefulAuthenticatorPage = ({
  initialState,
  children,
}: StatefulAuthenticatorPageProps) => {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <Div className="flex flex-col gap-10 py-12">
        {children}
        <Button
          onClick={() => setStatus("unauthenticated")}
          className="self-center"
        >
          Sign Out
        </Button>
      </Div>
    );
  }

  return (
    <AuthenticatorContainer>
      <StatefulAuthenticator
        initialState={initialState}
        onSuccessfulSignUp={() => setStatus("authenticated")}
      />
    </AuthenticatorContainer>
  );
};
