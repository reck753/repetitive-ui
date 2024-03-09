import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toServerDateString = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

type Query = ReadonlyURLSearchParams;

export const getStringParam = (
  query: Query,
  key: string
): string | undefined => {
  const value = query.get(key);
  if (typeof value === "string") {
    return value;
  }
  return undefined;
};

const fallbackErrorMessage = "An unknown error occurred. Please try again.";

export const getSafeErrorMessage = (error: any): string | undefined => {
  if (error) {
    if (
      typeof error === "object" &&
      Object.hasOwn(error, "message") &&
      error.message
    ) {
      return error.message;
    } else {
      return fallbackErrorMessage;
    }
  } else {
    return fallbackErrorMessage;
  }
};

const emailRegex =
  /^[A-Za-z0-9]([A-Za-z0-9_.+-]*[A-Za-z0-9])*@[A-Za-z0-9]([A-Za-z0-9_.-]*[A-Za-z0-9])*\.[A-Za-z0-9]{2,}$/;

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

export const extractPhoneDigits = (phone: string) => {
  return phone.replace(/\D/g, "");
};

export const getStringFromFormData = (formData: FormData, key: string) => {
  const value = formData.get(key);
  if (typeof value === "string") {
    return value;
  }
  return undefined;
};
