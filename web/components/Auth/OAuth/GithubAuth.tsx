import { FC } from "react";

import { Button } from "@/components/ui/button";
import Github from "@/components/Icons/AuthForm/Github";

import styles from "./oauth.module.css";

const GithubAuth: FC = () => {
  return (
    <Button variant={"outline"} className={styles.button}>
      <Github className={styles.icon} /> Github
    </Button>
  );
};

export default GithubAuth;
