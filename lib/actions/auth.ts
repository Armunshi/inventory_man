"use server";

// import { eq } from "drizzle-orm";
import  db  from "@/prisma/prisma";

import { hash } from "bcrypt";
import { signIn } from "@/lib/auth";
import { headers } from "next/headers";
// import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
// import { workflowClient } from "@/lib/workflow";

import { Role } from "@prisma/client";
type AuthCredentials={
    name:string,
    email:string,
    password:string,
    role:Role
}
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

//   const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
//   const { success } = await ratelimit.limit(ip);

//   if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { name, email,  password,role } = params;

//   const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
//   const { success } = await ratelimit.limit(ip);

//   if (!success) return redirect("/too-fast");

  const existingUser = await db.user.findFirst({
    where:{name:name}
  })

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.user.create({
        data:{name,
        email,
        password:hashedPassword,
        role,
    }
    })
    ;

    // await workflowClient.trigger({
    //   url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
    //   body: {
    //     email,
    //     name,
    //   },
    // });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
