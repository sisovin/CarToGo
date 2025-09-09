"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, signOut, type User } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getTrips, getVehicles, type Trip, type Vehicle } from "@/lib/mockApi";

export default function MyRidingAccount() {
    const router = useRouter();
    const [user, setUser] = React.useState<User | null>(() => getCurrentUser());
    const [trips, setTrips] = React.useState<Trip[]>([]);
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const [editing, setEditing] = React.useState(false);
    const [profile, setProfile] = React.useState({ firstName: user?.firstName || "", lastName: user?.lastName || "", phone: user?.phone || "" });

    function handleSignOut() {
        signOut();
        setUser(null);
        router.push("/");
    }

    React.useEffect(() => {
        if (user) {
            getTrips(user.id).then(setTrips);
            if (user.role === "driver") getVehicles(user.id).then(setVehicles);
        }
    }, [user]);

    function handleSaveProfile() {
        // Since we don't have a backend, persist to localStorage via auth helper
        const updated = { ...user, firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone } as User;
        localStorage.setItem("ctg_current_user", JSON.stringify(updated));
        setUser(updated);
        setEditing(false);
    }

    return (
        <div className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <Card className="max-w-3xl mx-auto bg-gray-900/90 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl">My Riding Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Account</h3>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit Profile"}</Button>
                                            {user.role === "driver" ? <Button size="sm" onClick={() => router.push("/driver/dashboard")}>Driver Dashboard</Button> : null}
                                        </div>
                                    </div>
                                    {!editing ? (
                                        <div>
                                            <p className="text-gray-300">Name: {user.firstName || user.email}</p>
                                            <p className="text-gray-300">Email: {user.email}</p>
                                            <p className="text-gray-300">Phone: {user.phone}</p>
                                            <p className="text-gray-300">Role: {user.role}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div>
                                                <label htmlFor="firstNameInput" className="text-sm text-gray-300">First Name</label>
                                                <input id="firstNameInput" placeholder="First name" title="First name" className="w-full bg-gray-800 border border-gray-700 rounded p-2 mt-1" value={profile.firstName} onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label htmlFor="lastNameInput" className="text-sm text-gray-300">Last Name</label>
                                                <input id="lastNameInput" placeholder="Last name" title="Last name" className="w-full bg-gray-800 border border-gray-700 rounded p-2 mt-1" value={profile.lastName} onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label htmlFor="phoneInput" className="text-sm text-gray-300">Phone</label>
                                                <input id="phoneInput" placeholder="Phone number" title="Phone" className="w-full bg-gray-800 border border-gray-700 rounded p-2 mt-1" value={profile.phone} onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))} />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={handleSaveProfile}>Save</Button>
                                                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">Recent Trips</h3>
                                    <div className="mt-2 space-y-2">
                                        {trips.length === 0 ? (
                                            <p className="text-gray-400">No trips yet.</p>
                                        ) : (
                                            trips.map((t) => (
                                                <div key={t.id} className="p-3 bg-gray-800 rounded-md">
                                                    <p className="text-sm">{t.from} → {t.to} — ${t.amount.toFixed(2)}</p>
                                                    <p className="text-xs text-gray-400">{new Date(t.date).toLocaleString()}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {user.role === "driver" && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Vehicles & Documents</h3>
                                        <div className="mt-2 space-y-2">
                                            {vehicles.length === 0 ? (
                                                <p className="text-gray-400">No vehicles registered.</p>
                                            ) : (
                                                vehicles.map((v) => (
                                                    <div key={v.id} className="p-3 bg-gray-800 rounded-md">
                                                        <p className="text-sm">{v.make} {v.model} ({v.year}) — {v.color} • {v.plate}</p>
                                                        <p className="text-xs text-gray-400">License: {v.licenseNumber} • National ID: {v.nationalId}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => router.push("/")}>Home</Button>
                                    <Button onClick={handleSignOut}>Sign Out</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-300">No user signed in.</p>
                                <div className="mt-4">
                                    <Button onClick={() => router.push("/")}>Go Home</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
