"use client";

import { FC, useState } from "react";
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
  const [isVerify, setIsVerify] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { error, isPending, handleAuth } = useAuth(authType);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleAuth(data.email, data.password);
    if (authType === "signup") {
      setIsVerify(!isVerify);
    }
  };

  return (
    <>
      {isVerify && !isPending && !error ? (
        <OtpForm />
      ) : (
        <Card className="w-[444px] rounded-none font-helvetica">
          <CardHeader className="pt-[26px] pb-0 gap-[3px] px-[30px]">
            <CardTitle className="text-2xl leading-none tracking-[-2%] font-bold text-[#0C0D0E]">
              {authType === "login" ? "Log in" : "Sign up"}
            </CardTitle>
            <CardDescription className="text-[14px] font-normal leading-none tracking-[2%] text-[#99A0AE]">
              {authType === "login" ? (
                <p>Enter your details below to sign into your account.</p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <a
                    className="text-[#0C0D0E] font-medium underline underline-offset-4"
                    href="/auth/login"
                  >
                    Log in
                  </a>
                </p>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-[30px] pb-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-[10px] py-[26px]">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] tracking-[2%] font-normal text-[#0C0D0E]">
                          Email
                        </FormLabel>
                        <FormControl className="mt-[6px]">
                          <div className="relative">
                            <Email className="absolute z-10 top-1/2 -translate-y-1/2 left-[12px]" />
                            <Input
                              className="text-[14px] rounded-none px-[12px] py-[6px] pl-[34px] text-[#0C0D0E] font-normal border-[#E1E4EA] tracking-[2%] focus-visible:ring-[#667085] focus-visible:ring-[1px] focus-visible:ring-offset-0 placeholder:text-[#99A0AE] drop-shadow-[0_1px_3px_rgba(143,143,143,0.20)]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] tracking-[2%] font-normal text-[#0C0D0E]">
                          Password
                        </FormLabel>
                        <FormControl className="mt-[6px]">
                          <div className="relative">
                            <Lock className="absolute z-10 top-1/2 -translate-y-1/2 left-[12px]" />
                            <Input
                              className="text-[14px] rounded-none px-[12px] py-[6px] pl-[34px] text-[#0C0D0E] font-normal border-[#E1E4EA] tracking-[2%] focus-visible:ring-[#667085] focus-visible:ring-[1px] focus-visible:ring-offset-0 placeholder:text-[#99A0AE] drop-shadow-[0_1px_3px_rgba(143,143,143,0.20)]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] tracking-[2%] font-normal text-[#0C0D0E]">
                          Confirm Password
                        </FormLabel>
                        <FormControl className="mt-[6px]">
                          <div className="relative">
                            <Lock className="absolute z-10 top-1/2 -translate-y-1/2 left-[12px]" />
                            <Input
                              className="text-[14px] rounded-none px-[12px] py-[6px] pl-[34px] text-[#0C0D0E] font-normal border-[#E1E4EA] tracking-[2%] focus-visible:ring-[#667085] focus-visible:ring-[1px] focus-visible:ring-offset-0 placeholder:text-[#99A0AE] drop-shadow-[0_1px_3px_rgba(143,143,143,0.20)]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <Button
                  className="rounded-none font-normal text-[14px] tracking-[2%] bg-[#0C0D0E] w-full"
                  type="submit"
                >
                  {isPending
                    ? authType === "login"
                      ? "Logging in..."
                      : "Signing up..."
                    : authType === "login"
                      ? "Log in"
                      : "Create account"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      )}
    </>
  );
};

export default AuthForm;
