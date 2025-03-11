import { FC, PropsWithChildren } from "react";

import WithKathaLogo from "@/components/withKathaLogo";

import styles from "./layouts.module.css";
import Link from "next/link";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className={styles.authLayout}>
        <WithKathaLogo />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
