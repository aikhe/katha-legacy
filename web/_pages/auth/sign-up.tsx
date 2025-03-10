import AuthForm from "@/components/Auth/AuthForm";

import styles from "./auth.module.css";

export default function SignInPage() {
  return (
    <section className={styles.authPage}>
      <AuthForm authType="signup" />
    </section>
  );
}
