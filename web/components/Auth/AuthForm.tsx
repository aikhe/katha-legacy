"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import OtpForm from "./OtpForm";
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
import { AuthType } from "@/types/auth";
import Email from "../Icons/AuthForm/Email";
import Lock from "../Icons/AuthForm/Lock";
import ArrowDownLeft from "../Icons/AuthForm/ArrowDownLeft";
import GoogleAuth from "./OAuth/GoogleAuth";
import GithubAuth from "./OAuth/GithubAuth";

import styles from "./index.module.css";
import { Eye, EyeOff } from "lucide-react";
import { maskInput } from "@/util/maskInput";

let passArray: string[] = [];
let passShadowArray: string[] = [];
let confirmPassArray: string[] = [];

const FormSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(8, { message: "Password is too short" }),
    passwordShadow: z.string().min(8, { message: "Password is too short" }),
    confirmPassword: z.string().min(8, { message: "Password is too short" }),
  })
  .refine(() => passArray.join("") === confirmPassArray.join(""), {
    message: "Password does't match",
    path: ["confirmPassword"],
  });

type AuthFormProp = { authType: AuthType };

const AuthForm: FC<AuthFormProp> = ({ authType }) => {
  const [isVerify, setIsVerify] = useState(false);
  const [showPassword, setIsShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordShadow: "",
      confirmPassword: "",
    },
  });

  const { error, isPending, handleAuth } = useAuth(authType);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleAuth(data.email, passArray.join());
    if (authType === "signup") {
      setIsVerify(!isVerify);
    }
  };

  useEffect(() => {
    const passInput =
      (document.getElementById("passInput") as HTMLInputElement) || null;

    if (showPassword) {
      passInput.value = passArray.join("");
    } else {
      passInput.value = "•".repeat(passArray.length);
    }
  }, [showPassword]);

  return (
    <>
      {isVerify && !isPending && !error ? (
        <OtpForm />
      ) : (
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
                        <FormLabel className={styles.formLabel}>
                          Email
                        </FormLabel>

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
                        <FormLabel className={styles.formLabel}>
                          Password
                        </FormLabel>

                        <FormControl className={styles.formControl}>
                          <div className={styles.inputContainer}>
                            <Lock className={styles.inputIcon} />
                            <Input
                              id="passInput"
                              onInput={(e) => {
                                if (showPassword === false) {
                                  const updatedArray = maskInput(e, passArray);
                                  passArray = updatedArray;

                                  console.log("pass array:", passArray);
                                } else {
                                  const target = e.target as HTMLInputElement;
                                  const numAdded =
                                    target.value.length - passArray.length;
                                  console.log("numAdded", numAdded);

                                  if (numAdded > 0) {
                                    const charsAdded = target.value.slice(
                                      target.selectionStart! - numAdded,
                                      target.selectionStart!,
                                    );
                                    console.log("CharsAdded", charsAdded);
                                    console.log(
                                      `${target.selectionStart! - numAdded}, ${target.selectionStart!}`,
                                    );

                                    passArray.splice(
                                      target.selectionStart! - numAdded,
                                      0,
                                      ...charsAdded.split(""),
                                    );
                                  } else if (numAdded < 0) {
                                    passArray.splice(
                                      target.selectionStart!,
                                      numAdded * -1,
                                    );
                                  }

                                  console.log(passArray);
                                  console.log(passArray.join(""));
                                }
                              }}
                              className={styles.inputField}
                              {...form.register("password")}
                            />
                            <button
                              type="button"
                              onClick={() => setIsShowPassword(!showPassword)}
                              className={styles.inputPasswordReveal}
                            >
                              <Eye size={16} color="#98A2B3" />
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
                              onInput={(e) => {
                                const updatedArray = maskInput(
                                  e,
                                  confirmPassArray,
                                );
                                confirmPassArray = updatedArray;

                                console.log(
                                  "confirm pass array:",
                                  confirmPassArray,
                                );
                              }}
                              className={styles.inputField}
                              {...form.register("confirmPassword")}
                            />
                            <button className={styles.inputPasswordReveal}>
                              <EyeOff size={16} color="#98A2B3" />
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
                  onClick={() => console.log(passArray, confirmPassArray)}
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
      )}
    </>
  );
};

export default AuthForm;
