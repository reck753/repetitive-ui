import { MockApiRequest } from "./api-mock";

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

export const useForgotPassword = (): MockApiRequest<
  ForgotPasswordInput,
  ForgotPasswordResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    loading: false,
    error: null,
  };
};
