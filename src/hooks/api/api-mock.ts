export type MockApiRequest<Input, Response> = {
  trigger: (input: Input) => Promise<Response>;
  loading: boolean;
  error: Error | null;
};
