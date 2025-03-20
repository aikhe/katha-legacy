import { FC } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import Lock from "../../Icons/AuthForm/Lock";
import { Eye, EyeOff } from "lucide-react";

import styles from "../index.module.css";
import { AuthPassFields } from "@/types/auth";

type AuthFieldProps = {
  label: string;
  form: any;
  field: "email" | AuthPassFields;
  handleInput: any;
  toggleShowPass: any;
  fieldState: any;
};

const AuthField: FC<AuthFieldProps> = ({
  label,
  form,
  field,
  handleInput,
  toggleShowPass,
  fieldState,
}) => {
  return (
    <FormField
      control={form.control}
      name={field}
      render={() => (
        <FormItem>
          <FormLabel className={styles.formLabel}>{label}</FormLabel>

          <FormControl className={styles.formControl}>
            <div className={styles.inputContainer}>
              <Lock className={styles.inputIcon} />
              <Input
                id={field}
                onInput={(e) => {
                  handleInput(e);
                }}
                className={styles.inputField}
              />
              <button
                type="button"
                onClick={() => toggleShowPass(field)}
                className={styles.inputPasswordReveal}
              >
                {fieldState.showPlainText ? (
                  <EyeOff size={16} color="#98A2B3" />
                ) : (
                  <Eye size={16} color="#98A2B3" />
                )}
              </button>
            </div>
          </FormControl>

          <FormMessage />

          {field === "password" && (
            <li className={styles.passwordRule}>Minimum 8 characters long</li>
          )}
        </FormItem>
      )}
    />
  );
};

export default AuthField;
