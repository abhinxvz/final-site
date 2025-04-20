import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}

export default SignInButton;