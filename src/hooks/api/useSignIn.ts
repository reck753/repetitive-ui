import { MockPostApiRequest } from "./api-mock";

type User = {
  id: string;
  email: string;
  full_name: string;
};

type LoginResponse =
  | {
      code: "error";
      message: string;
    }
  | {
      code: "success";
      token_type: string;
      expires_in: number;
      access_token: string;
      refresh_token: string;
      user: User;
    };

type LoginInput = {
  username: string;
  password: string;
};

export const useSignIn = (): MockPostApiRequest<LoginInput, LoginResponse> => {
  return {
    trigger: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: "success",
            token_type: "Bearer",
            expires_in: 3600,
            access_token: "token",
            refresh_token: "refresh",
            user: {
              id: "1",
              email: "user@repetitive.ui",
              full_name: "User",
            },
          });
        }, 2000); // Resolve after 2 seconds
      });
    },
    isMutating: false,
    error: null,
  };
};
