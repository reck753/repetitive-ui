import { MockPostApiRequest } from "./api-mock";

type ForgotPasswordResponse =
  | {
      code: "error";
      message: string;
    }
  | {
      code: "success";
    };

type ForgotPasswordInput = {
  username: string;
};

export const useForgotPassword = (): MockPostApiRequest<
  ForgotPasswordInput,
  ForgotPasswordResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    isMutating: false,
    error: null,
  };
};
