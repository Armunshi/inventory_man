"use client";


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
// import { signIn } from "@/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { NextResponse } from "next/server";

export default function SignUp() {
    const router = useRouter();
    const [error,setError] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("")
        setIsLoading(true)
        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch('/api/auth/register',{
                method:"POST",
                headers:{"Content-Type":"application/json"}
                ,
                body:JSON.stringify({
                    Name : formData.get("Name"),
                    email : formData.get("email"),
                    password : formData.get("password"),
                    role : formData.get("role")
                })
                }
            )
            const data = await response.json()
            
            if (!response.ok){
                console.log('Api Error',data);
                setError(data.message ||data.error ||'Registration Failed')
                return
            }
            console.log('Registration Succesful')
            router.push('./')
        } catch (err) {
            console.log("Registration Error",err);
            setError(`${err}`)
            setIsLoading(false)
        }
        finally{
            setIsLoading(false)
        }
    }
    enum Role {
        ADMIN ='ADMIN',
        SUPPLIER='SUPPLIER',
        RETAILER='RETAILER' 
    }

    return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
        <CardDescription>
          Enter your email and password to SignUp
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Credentials Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              type="text"
              placeholder="You"
              required
            />
          </div>
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
            <Label htmlFor="role">Role</Label>
            <select id="role" name="role" required>
                {
                Object.values(Role).map((role)=>(
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))
                }
            </select>
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

          <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full mt-2">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <br />
      <CardFooter className="block justify-center">
        <hr className="border-black border-0.1 my-8" />
            <div className="text-center mb-4 mt-4"><b>Already A User</b></div>

         <Button
          variant="outline"
          className="w-full"
          onClick={()=>router.push(`/sign-in`)}
        >
          SignIn
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardFooter>

    </Card>
  );
}
