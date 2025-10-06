"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import {  useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignIn() {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") return;

  const result = await signIn("credentials", { email, password, redirect: false });
  
  
  console.log(result)

  if (result?.error) {
    console.log("Login failed", result.error);
  } else {
    router.push("/"); // or whatever page after login
  }
};

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Credentials Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        {/* Google Sign In */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Login with Google
        </Button>
      </CardFooter>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={()=>router.push(`/sign-up`)}
        >
          SignUp
        </Button>
      </CardFooter>
    </Card>
  );
}
