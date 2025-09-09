"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, type User } from "@/lib/auth";
import { getTrips, getVehicles, type Trip, type Vehicle } from "@/lib/mockApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DriverDashboardPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<User | null>(() => getCurrentUser());
    const [trips, setTrips] = React.useState<Trip[]>([]);
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const u = getCurrentUser();
        setUser(u);
        // Protect route: redirect if not signed in or not a driver
        if (!u) {
            router.push("/");
            return;
        }

        if (u.role !== "driver") {
            router.push("/account");
            return;
        }

        if (u && u.role === "driver") {
            setLoading(true);
            Promise.all([getTrips(), getVehicles()])
                .then(([t, v]) => {
                    setTrips(t);
                    setVehicles(v);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [router]);

    const totalEarnings = trips.reduce((s, t) => s + t.amount, 0);

    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Driver Dashboard</h1>
                    {!user ? (
                        <Card className="mb-4 bg-gray-900/60 border border-gray-800">
                            <CardContent>
                                <p className="text-gray-300">No driver signed in. Please sign in as a driver to view dashboard.</p>
                                <div className="mt-3">
                                    <Link href="/" className="px-3 py-2 bg-teal-500 rounded text-black">Home</Link>
                                </div>
                            </CardContent>
                        </Card>
                    ) : user.role !== "driver" ? (
                        <Card className="mb-4 bg-gray-900/60 border border-gray-800">
                            <CardContent>
                                <p className="text-gray-300">Your account is not a driver account. Switch to the Driver tab or sign up as a driver.</p>
                                <div className="mt-3">
                                    <Link href="/" className="px-3 py-2 bg-teal-500 rounded text-black">Home</Link>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-gray-900/60 border border-gray-800">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Today&apos;s Earnings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-teal-400 text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                                        <div className="text-gray-400 text-sm">From {trips.length} trips</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-900/60 border border-gray-800 md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Recent Trips</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {loading ? (
                                            <p className="text-gray-400">Loading trips...</p>
                                        ) : trips.length === 0 ? (
                                            <p className="text-gray-400">No trips yet.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                {trips.map((t) => (
                                                    <div key={t.id} className="p-3 bg-gray-800 rounded-md">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <div className="text-sm">{t.from} → {t.to}</div>
                                                                <div className="text-xs text-gray-400">{new Date(t.date).toLocaleString()}</div>
                                                            </div>
                                                            <div className="text-sm font-semibold">${t.amount.toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="bg-gray-900/60 border border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-sm">Vehicles & Documents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <p className="text-gray-400">Loading vehicles...</p>
                                    ) : vehicles.length === 0 ? (
                                        <p className="text-gray-400">No vehicles on file. Add your vehicle in the account page.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {vehicles.map((v) => (
                                                <div key={v.id} className="p-3 bg-gray-800 rounded-md">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="text-sm">{v.make} {v.model} ({v.year})</div>
                                                            <div className="text-xs text-gray-400">Plate: {v.plate} • Color: {v.color}</div>
                                                        </div>
                                                        <div className="text-xs text-gray-400 text-right">
                                                            <div>License: {v.licenseNumber}</div>
                                                            <div>National ID: {v.nationalId}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex gap-2">
                                <Link href="/account" className="px-3 py-2 bg-gray-700 rounded text-gray-200">My Account</Link>
                                <Link href="/" className="px-3 py-2 bg-teal-500 rounded text-black">Home</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
