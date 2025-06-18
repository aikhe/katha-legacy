"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServer } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithOtp(userData);

  console.log(data);

  if (error) {
    redirect("/error");
  }
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createServer();

  const { data, error } = await supabase.auth.verifyOtp({
    email: formData.get("email") as string,
    token: formData.get("otp") as string,
    type: "email",
  });

  console.log(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
