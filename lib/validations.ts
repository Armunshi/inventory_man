import { z } from "zod"

export const signupSchema =z.object({
    fullname:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(8),
    contact:z.string().min(10).max(15),
    address:z.string().min(5)
})
export const SignInSchema =z.object({
    email:z.string().email(),
    password:z.string().min(8),
})