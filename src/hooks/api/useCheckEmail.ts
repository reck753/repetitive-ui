import { MockPostApiRequest } from "./api-mock";

type CheckEmailInput = {
  email: string;
};

type CheckEmailResponse = {
  code: "valid" | "invalid";
  message: string;
};

export const useCheckEmail = (): MockPostApiRequest<
  CheckEmailInput,
  CheckEmailResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "valid", message: "valid" }),
    isMutating: false,
    error: null,
  };
};
