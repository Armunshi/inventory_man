import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Role } from "@prisma/client";

export type SessionUser = {
  id: number;
  role: Role;
  businessId: number | null;
  email: string;
  name: string;
};

export class AuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function apiError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Resolves the current user from the verified server session — never from a
 * client-supplied query param or body field. Throws AuthError(401) if there
 * is no session.
 */
export async function getSessionUser(): Promise<SessionUser> {
  const session = await auth();

  if (!session?.user?.id || !session.user.role) {
    throw new AuthError(401, "Not authenticated");
  }

  return {
    id: Number(session.user.id),
    role: session.user.role as Role,
    businessId:
      session.user.businessId !== undefined && session.user.businessId !== null
        ? Number(session.user.businessId)
        : null,
    email: session.user.email ?? "",
    name: session.user.name ?? "",
  };
}

export function requireRole(user: SessionUser, roles: Role[]) {
  if (!roles.includes(user.role)) {
    throw new AuthError(403, "You do not have permission to perform this action");
  }
}

/**
 * Ownership guard for single-tenant-for-now deployments: not real multi-tenant
 * isolation, just a check that a user isn't acting on another business's
 * resource by tampering with a URL/body id.
 */
export function requireSameBusiness(user: SessionUser, resourceBusinessId: number | null | undefined) {
  if (user.businessId == null || resourceBusinessId == null) return;
  if (user.businessId !== resourceBusinessId) {
    throw new AuthError(403, "This resource belongs to a different business");
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AuthError) {
    return apiError(error.status, error.message);
  }
  console.error(error);
  return apiError(500, "Internal Server Error");
}
