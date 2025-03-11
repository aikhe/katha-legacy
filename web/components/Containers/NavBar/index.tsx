import type { FC } from "react";

import WithKathaLogo from "@/components/withKathaLogo";

import styles from "./index.module.css";

const NavBar: FC = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.kathaIcon}>
        <WithKathaLogo />
      </div>
    </nav>
  );
};

export default NavBar;
