"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServer } from "@/lib/supabase/server";
import supabaseAdmin from "@/lib/supabase/admin";
import { GenerateLinkParams } from "@supabase/supabase-js";

export async function login(formData: FormData) {
  const supabase = await createServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = supabaseAdmin();

  const userData: GenerateLinkParams = {
    type: "signup",
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.admin.generateLink(userData);

  console.log(data);

  if (error) {
    console.log(error);
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

export async function signOut() {
  const supabase = await createServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
