"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import { AuthType } from "@/types/auth";

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
import ArrowDownLeft from "../Icons/AuthForm/ArrowDownLeft";

import styles from "./index.module.css";
import {
  useValidateConfirmPass,
  useValidateEmail,
  useValidatePass,
} from "@/hooks/useValidateInput";
import AuthField from "./AuthField";

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { error, isPending, handleAuth } = useAuth(authType);

  const handleEmailInput = useValidateEmail(form);

  const {
    passFieldState,
    handlePassInput,
    toggleShowPassInput,
    validatePassword,
    isValidatePassword,
  } = useValidatePass(form, "password");

  const {
    confirmPassFieldState,
    handleConfirmPassInput,
    toggleShowConfirmPassInput,
  } = useValidateConfirmPass(form, "confirmPassword");

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleAuth(data.email, form.getValues("password"));

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
              <AuthField
                label="Email"
                form={form}
                field="email"
                handleInput={handleEmailInput}
              />

              <AuthField
                label="Password"
                form={form}
                field="password"
                handleInput={handlePassInput}
                toggleShowInput={toggleShowPassInput}
                fieldState={passFieldState}
              />

              <AuthField
                label="Confirm Password"
                form={form}
                field="confirmPassword"
                handleInput={handleConfirmPassInput}
                toggleShowInput={toggleShowConfirmPassInput}
                fieldState={confirmPassFieldState}
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
