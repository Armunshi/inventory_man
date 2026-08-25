"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { inviteUser, type InviteUserPayload } from "@/services/userService";

type InviteUserProps = {
    onCreated?: () => void;
};

const ROLES: InviteUserPayload["role"][] = ["SUPPLIER", "RETAILER", "WAREHOUSE_MANAGER"];

const InviteUser = ({ onCreated }: InviteUserProps) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<InviteUserPayload>({
        name: "",
        email: "",
        password: "",
        role: "SUPPLIER",
        contact: "",
        address: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setForm({ name: "", email: "", password: "", role: "SUPPLIER", contact: "", address: "" });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await inviteUser(form);
            onCreated?.();
            reset();
            setOpen(false);
        } catch (err) {
            console.error("Error inviting user", err);
            setError("Could not create this account. Check the details and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) reset(); }}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Invite Supplier / Retailer</DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            className="border p-2 w-full rounded"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="border p-2 w-full rounded"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            className="border p-2 w-full rounded"
                            value={form.role}
                            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as InviteUserPayload["role"] }))}
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Initial Password</label>
                        <input
                            type="password"
                            className="border p-2 w-full rounded"
                            value={form.password}
                            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                            minLength={8}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Share this with them directly — there&apos;s no email invite yet.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact (optional)</label>
                        <input
                            className="border p-2 w-full rounded"
                            value={form.contact}
                            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address (optional)</label>
                        <input
                            className="border p-2 w-full rounded"
                            value={form.address}
                            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Account"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InviteUser;
