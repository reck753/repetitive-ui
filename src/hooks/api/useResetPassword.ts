import { MockPostApiRequest } from "./api-mock";

type ResetPasswordResponse =
  | {
      code: "error";
      message: string;
    }
  | {
      code: "success";
    };

type ResetPasswordInput = {
  new_password: string;
  confirm_password: string;
  token: string;
};

export const useResetPassword = (): MockPostApiRequest<
  ResetPasswordInput,
  ResetPasswordResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    isMutating: false,
    error: null,
  };
};
