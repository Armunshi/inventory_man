import { hash } from "bcryptjs";
import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";
import { inviteUserSchema } from "@/lib/validations";

// Admin-only: create a SUPPLIER / RETAILER / WAREHOUSE_MANAGER account tied
// to this business. There is no transactional-email infra in this app yet,
// so the admin sets the initial password directly and shares it out of band
// — a real invite-link/email flow is a known follow-up, not a blocker.
export async function POST(req: NextRequest) {
    try {
        const admin = await getSessionUser();
        requireRole(admin, ["ADMIN"]);

        const body = await req.json();
        const parsed = inviteUserSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid user data" },
                { status: 400 }
            );
        }
        const { name, email, password, role, contact, address } = parsed.data;

        const existing = await db.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                businessId: admin.businessId,
                contact: contact ? BigInt(contact) : null,
                address: address || null,
            },
        });

        return NextResponse.json(
            {
                message: "Account created",
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
            },
            { status: 201 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}

export async function GET(req: NextRequest) {
    try {
        const admin = await getSessionUser();
        requireRole(admin, ["ADMIN"]);

        const role = req.nextUrl.searchParams.get("role");

        const users = await db.user.findMany({
            where: {
                businessId: admin.businessId,
                role: role ? (role as "SUPPLIER" | "RETAILER" | "WAREHOUSE_MANAGER") : { in: ["SUPPLIER", "RETAILER", "WAREHOUSE_MANAGER"] },
            },
            select: { id: true, name: true, email: true, role: true, contact: true, address: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });

        const data = users.map((u) => ({ ...u, contact: u.contact != null ? u.contact.toString() : null }));

        return NextResponse.json({ users: data });
    } catch (error) {
        return handleApiError(error);
    }
}
