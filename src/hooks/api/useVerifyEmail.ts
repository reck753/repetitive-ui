import { MockPostApiRequest } from "./api-mock";

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

export const useVerifyEmail = (): MockPostApiRequest<
  VerifyEmailInput,
  VerifyEmailResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    isMutating: false,
    error: null,
  };
};
