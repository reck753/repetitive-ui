// swr-like api mock
export type MockPostApiRequest<Input, Response> = {
  trigger: (input: Input) => Promise<Response>;
  isMutating: boolean;
  error: Error | null;
};
