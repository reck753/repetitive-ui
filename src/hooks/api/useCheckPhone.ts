import { MockPostApiRequest } from "./api-mock";

type CheckPhoneInput = {
  phone: string;
};

type CheckPhoneResponse = {
  code: "valid" | "invalid";
  message: string;
};

export const useCheckPhone = (): MockPostApiRequest<
  CheckPhoneInput,
  CheckPhoneResponse
> => {
  return {
    trigger: () => Promise.resolve({ code: "valid", message: "valid" }),
    isMutating: false,
    error: null,
  };
};
