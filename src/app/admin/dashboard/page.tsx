"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type User } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<User | null>(() => getCurrentUser());

    React.useEffect(() => {
        const u = getCurrentUser();
        setUser(u);

        // Protect route: redirect if not signed in or not an admin
        if (!u) {
            router.push("/");
            return;
        }

        if (u.role !== "admin") {
            router.push("/account");
            return;
        }
    }, [router]);

    if (!user || user.role !== "admin") {
        return (
            <main className="min-h-screen bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <Card className="max-w-md mx-auto bg-gray-900/60 border border-gray-800">
                        <CardContent className="p-6 text-center">
                            <p className="text-gray-300 mb-4">Access denied. Admin privileges required.</p>
                            <Link href="/" className="inline-block">
                                <Button>Go Home</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.firstName} {user.lastName}</p>
                    <div className="mt-4">
                        <Link href="/account" className="text-teal-400 hover:underline text-sm">
                            ← Back to Account
                        </Link>
                    </div>
                </div>
                <AdminDashboard />
            </div>
        </main>
    );
}
