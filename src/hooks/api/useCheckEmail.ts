import { MockApiRequest } from "./api-mock";

type CheckEmailInput = {
  email: string;
};

type CheckEmailResponse = {
  code: "valid" | "invalid";
  message: string;
};

export const useCheckEmail = (): MockApiRequest<
  CheckEmailInput,
  CheckEmailResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "valid", message: "valid" }),
    loading: false,
    error: null,
  };
};
