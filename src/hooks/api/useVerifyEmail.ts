import { MockApiRequest } from "./api-mock";

type VerifyEmailResponse =
  | {
      code: "error";
      message: string;
    }
  | {
      code: "success";
    };

type VerifyEmailInput = {
  code: string;
};

export const useVerifyEmail = (): MockApiRequest<
  VerifyEmailInput,
  VerifyEmailResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    loading: false,
    error: null,
  };
};
