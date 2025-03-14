import { FC } from "react";

import { Button } from "@/components/ui/button";
import Google from "@/components/Icons/AuthForm/Google";

import styles from "./index.module.css";

const GoogleAuth: FC = () => {
  return (
    <Button variant={"outline"} className={styles.button}>
      <Google className={styles.icon} /> Google
    </Button>
  );
};

export default GoogleAuth;
