"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import { maskInput } from "@/util/maskInput";

import { AuthPassFields, AuthType } from "@/types/auth";

import OtpForm from "./OtpForm";
import GoogleAuth from "./OAuth/GoogleAuth";
import GithubAuth from "./OAuth/GithubAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Email from "../Icons/AuthForm/Email";
import Lock from "../Icons/AuthForm/Lock";
import ArrowDownLeft from "../Icons/AuthForm/ArrowDownLeft";
import { Eye, EyeOff } from "lucide-react";

import styles from "./index.module.css";

const FormSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(8, { message: "Password is too short" }),
    confirmPassword: z.string().min(8, { message: "Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does't match",
    path: ["confirmPassword"],
  });

type AuthFormProp = { authType: AuthType };

const AuthForm: FC<AuthFormProp> = ({ authType }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [passState, setPassState] = useState({
    fieldArray: [] as string[],
    showPlainText: false,
  });
  const [confirmPassState, setConfirmPassState] = useState({
    fieldArray: [] as string[],
    showPlainText: false,
  });
  const [validatePassword, isValidatePassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const toggleFieldDisplay = (
      fieldId: string,
      fieldArray: string[],
      showPlainText: boolean,
    ) => {
      const field = document.getElementById(fieldId) as HTMLInputElement;
      if (field) {
        field.value = showPlainText
          ? fieldArray.join("")
          : "•".repeat(fieldArray.length);
      }
    };

    toggleFieldDisplay(
      "pass-field",
      passState.fieldArray,
      passState.showPlainText,
    );
    toggleFieldDisplay(
      "confirm-pass-field",
      confirmPassState.fieldArray,
      confirmPassState.showPlainText,
    );
  }, [passState.showPlainText, confirmPassState.showPlainText]);

  const { error, isPending, handleAuth } = useAuth(authType);

  const handlePassInput = (e: any) => {
    const updatedArray = maskInput(
      e,
      passState.fieldArray,
      passState.showPlainText,
    );
    setPassState((prev) => ({ ...prev, fieldArray: updatedArray }));

    console.log("pass array:", passState.fieldArray);
    form.setValue("password", updatedArray.join(""), { shouldValidate: true });

    if (validatePassword) {
      form.setValue("confirmPassword", confirmPassState.fieldArray.join(""), {
        shouldValidate: true,
      });
    }
  };

  const handleConfirmPassInput = (e: any) => {
    const updatedArray = maskInput(
      e,
      confirmPassState.fieldArray,
      confirmPassState.showPlainText,
    );
    setConfirmPassState((prev) => ({ ...prev, fieldArray: updatedArray }));

    console.log("confirm pass array:", confirmPassState.fieldArray);

    form.setValue("confirmPassword", updatedArray.join(""), {
      shouldValidate: true,
    });
  };

  const toggleShowPass = (field: AuthPassFields) => {
    if (field === "pass") {
      setPassState((prev) => ({
        ...prev,
        showPlainText: !passState.showPlainText,
      }));
    } else {
      setConfirmPassState((prev) => ({
        ...prev,
        showPlainText: !confirmPassState.showPlainText,
      }));
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleAuth(data.email, passState.fieldArray.join(""));

    if (authType === "signup") {
      setIsVerifying(!isVerifying);
    }
  };

  if (isVerifying && !isPending && !error) {
    return <OtpForm />;
  }

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          {authType === "login" ? "Log in" : "Sign up"}
        </CardTitle>
        <CardDescription className={styles.cardDescription}>
          {authType === "login" ? (
            <p>Enter your details below to sign into your account.</p>
          ) : (
            <p>
              Already have an account?{" "}
              <a className={styles.cardDescriptionLink} href="/auth/login">
                Log in
              </a>
            </p>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={styles.formFieldContainer}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={styles.formLabel}>Email</FormLabel>

                    <FormControl className={styles.formControl}>
                      <div className={styles.inputContainer}>
                        <Email className={styles.inputIcon} />
                        <Input className={styles.inputField} {...field} />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={() => (
                  <FormItem>
                    <FormLabel className={styles.formLabel}>Password</FormLabel>

                    <FormControl className={styles.formControl}>
                      <div className={styles.inputContainer}>
                        <Lock className={styles.inputIcon} />
                        <Input
                          id="pass-field"
                          onInput={(e) => {
                            handlePassInput(e);
                          }}
                          className={styles.inputField}
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowPass("pass")}
                          className={styles.inputPasswordReveal}
                        >
                          {passState.showPlainText ? (
                            <EyeOff size={16} color="#98A2B3" />
                          ) : (
                            <Eye size={16} color="#98A2B3" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />

                    <li className={styles.passwordRule}>
                      Minimum 8 characters long
                    </li>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={() => (
                  <FormItem>
                    <FormLabel className={styles.formLabel}>
                      Confirm Password
                    </FormLabel>

                    <FormControl className={styles.formControl}>
                      <div className={styles.inputContainer}>
                        <Lock className={styles.inputIcon} />
                        <Input
                          id="confirm-pass-field"
                          onInput={(e) => {
                            handleConfirmPassInput(e);
                          }}
                          className={styles.inputField}
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowPass("confirmPass")}
                          className={styles.inputPasswordReveal}
                        >
                          {confirmPassState.showPlainText ? (
                            <EyeOff size={16} color="#98A2B3" />
                          ) : (
                            <Eye size={16} color="#98A2B3" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <Button
              onClick={() =>
                !validatePassword && isValidatePassword(!validatePassword)
              }
              className={styles.formButton}
              type="submit"
            >
              {isPending
                ? authType === "login"
                  ? "Logging in..."
                  : "Signing up..."
                : authType === "login"
                  ? "Log in"
                  : "Create account"}
              <div className={styles.buttonIconWrapper}>
                <ArrowDownLeft className={styles.buttonIcon} />
              </div>
            </Button>
          </form>
        </Form>

        <p className={styles.continueWithOAuth}>Or continue with</p>

        <div className={styles.oauthContainer}>
          <GoogleAuth />
          <GithubAuth />
        </div>
      </CardContent>

      <CardFooter className={styles.cardFooter}>
        <span>Katha @2025</span>
        <p>A vault system to keep me sane.</p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
