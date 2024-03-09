import { MockPostApiRequest } from "./api-mock";

type RegisterResponse =
  | {
      code: "error";
      message: string;
    }
  | {
      code: "success";
    };

type RegisterInput = {
  email: string;
  phone: string;
  raw_phone: string;
  password: string;
  confirm_password: string;
  name: string;
  surname: string;
  gender: string;
  date_of_birth: string;
  country: string | undefined;
  city: string | undefined;
  address: string | undefined;
  postal_code: string | undefined;
};

export const useSignUp = (): MockPostApiRequest<
  RegisterInput,
  RegisterResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "success" }),
    isMutating: false,
    error: null,
  };
};
