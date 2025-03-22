import { FC } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import Email from "../../Icons/AuthForm/Email";
import Lock from "../../Icons/AuthForm/Lock";
import { Eye, EyeOff } from "lucide-react";

import styles from "../index.module.css";

type AuthFieldProps<T extends FieldValues> = {
  label: string;
  form: {
    control: Control<FieldValues, T>;
  };
  field: Path<T>;
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  toggleShowInput?: (field: Path<T>) => void;
  fieldState?: {
    showPlainText: boolean;
  };
};

const AuthField: FC<AuthFieldProps<any>> = ({
  label,
  form,
  field,
  handleInput,
  toggleShowInput,
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
              {field === "email" ? (
                <Email className={styles.inputIcon} />
              ) : (
                <Lock className={styles.inputIcon} />
              )}

              <Input
                id={field ?? ""}
                onInput={(e) => {
                  handleInput(e);
                }}
                className={styles.inputField}
              />

              {field !== "email" && toggleShowInput && (
                <button
                  type="button"
                  onClick={() => toggleShowInput(field)}
                  className={styles.inputPasswordReveal}
                >
                  {fieldState?.showPlainText ? (
                    <EyeOff size={16} color="#98A2B3" />
                  ) : (
                    <Eye size={16} color="#98A2B3" />
                  )}
                </button>
              )}
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
