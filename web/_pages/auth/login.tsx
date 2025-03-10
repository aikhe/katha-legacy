import AuthForm from "@/components/Auth/AuthForm";

import styles from "./auth.module.css";

const loginPage = () => {
  return (
    <section className={styles.authPage}>
      <AuthForm authType="login" />
    </section>
  );
};

export default loginPage;
