import { hash } from "bcryptjs";
import db from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request): Promise<Response> {
    try {
        const body = await request.json();
        const parsed = signupSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid registration data" },
                { status: 400 }
            );
        }

        const { Name, email, password, role, contact, address } = parsed.data;

        // Public/anonymous self-registration may only create RETAILER accounts.
        // Any other role requires an authenticated ADMIN (see the Phase 2 invite flow).
        if (role !== "RETAILER") {
            let requester;
            try {
                requester = await getSessionUser();
            } catch {
                requester = null;
            }
            if (!requester || requester.role !== "ADMIN") {
                return NextResponse.json(
                    { error: "Only an administrator can create this type of account" },
                    { status: 403 }
                );
            }
        }

        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
        }

        const hashedpassword = await hash(password, 10);
        const user = await db.user.create({
            data: {
                name: Name,
                email,
                password: hashedpassword,
                role,
                contact: contact ? BigInt(contact) : null,
                address: address || null,
            },
        });

        return NextResponse.json(
            {
                message: "User created Succesfully",
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
            },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}
