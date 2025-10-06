"use client";

import React from "react";

import { SignInSchema } from "@/lib/validations";
import { signInWithCredentials} from "@/lib/actions/auth";
import SignIn from "@/components/sign-in";

const Page = () => (
  <SignIn/>
);

export default Page;
