"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import InviteUser from "@/components/inviteUser";
import { getBusinessUsers } from "@/services/userService";

type BusinessUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    contact: string | null;
    address: string | null;
};

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<BusinessUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            const data = await getBusinessUsers();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (session?.user?.role === "ADMIN") {
            fetchUsers();
        }
    }, [session?.user?.role, fetchUsers]);

    if (status === "loading") return <div className="p-6">Loading...</div>;
    if (!session) return <div className="p-6">Please log in.</div>;
    if (session.user?.role !== "ADMIN") {
        return (
            <LayoutWithSidebar>
                <main className="p-6">Only administrators can manage accounts.</main>
            </LayoutWithSidebar>
        );
    }

    return (
        <LayoutWithSidebar>
            <main className="flex-1 p-4 overflow-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Suppliers &amp; Retailers</h2>
                    <InviteUser onCreated={fetchUsers} />
                </div>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading accounts...</p>
                ) : (
                    <div className="bg-white rounded-md border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b text-left">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                            No supplier or retailer accounts yet.
                                        </td>
                                    </tr>
                                )}
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-4 py-3">{u.name}</td>
                                        <td className="px-4 py-3">{u.email}</td>
                                        <td className="px-4 py-3">{u.role}</td>
                                        <td className="px-4 py-3">{u.contact ?? "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </LayoutWithSidebar>
    );
}
