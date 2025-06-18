import { login, signup, verifyOtp } from "./actions";

export default function LoginPage() {
  return (
    <main>
      <section>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" />
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>

          <label htmlFor="otp">OTP:</label>
          <input id="otp" name="otp" type="text" />
          <button formAction={verifyOtp}>Verify Otp</button>
        </form>
      </section>
    </main>
  );
}
