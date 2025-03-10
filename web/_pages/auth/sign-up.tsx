import AuthForm from "@/components/Auth/AuthForm";

export default function SignInPage() {
  return (
    <main className="flex flex-col w-full h-[100svh] items-center justify-center">
      <AuthForm authType="signup" />

    </main>
  );
}
