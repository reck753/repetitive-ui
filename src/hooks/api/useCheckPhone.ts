import { MockApiRequest } from "./api-mock";

type CheckPhoneInput = {
  phone: string;
};

type CheckPhoneResponse = {
  code: "valid" | "invalid";
  message: string;
};

export const useCheckPhone = (): MockApiRequest<
  CheckPhoneInput,
  CheckPhoneResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "valid", message: "valid" }),
    loading: false,
    error: null,
  };
};
