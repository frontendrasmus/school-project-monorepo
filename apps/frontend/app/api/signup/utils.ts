export type SignupPayload = {
  email: string;
};

export function isSignupPayload(x: unknown): x is SignupPayload {
  return (
    typeof x === 'object' &&
    x !== null &&
    typeof (x as Record<string, unknown>).email === 'string'
  );
}
