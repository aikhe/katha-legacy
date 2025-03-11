import { FC } from "react";
import Link from "next/link";

import Katha from "@/components/Icons/Logos/Katha";

import styles from "./index.module.css";

const KathaLogo: FC = () => {
  return (
    <Link href="/" className={styles.logoContainer}>
      <Katha />

      <span className={styles.kathaText}>Katha</span>
    </Link>
  );
};

export default KathaLogo;
