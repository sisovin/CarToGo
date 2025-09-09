"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import RiderSignin from "@/components/auth/RiderSignin";
import RiderSignup from "@/components/auth/RiderSignup";
import DriverSignin from "@/components/auth/DriverSignin";
import DriverSignup from "@/components/auth/DriverSignup";
import { getCurrentUser, signOut } from "@/lib/auth";
import type { User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RideMap from "@/components/map/RideMap";
import RideRequestPanel from "@/components/ride/RideRequestPanel";
import RideTrackingCard from "@/components/ride/RideTrackingCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("rider");
  const [rideRequested, setRideRequested] = useState(false);
  const [rideInProgress, setRideInProgress] = useState(false);
  // Auth UI state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const openSignin = () => {
    setAuthMode("signin");
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  const router = useRouter();

  const handleSignedIn = (user: User) => {
    setCurrentUser(user);
    setAuthOpen(false);
    // Redirect based on role
    if (user.role === "rider") {
      router.push("/account");
    } else if (user.role === "driver") {
      router.push("/driver/dashboard");
    } else if (user.role === "admin") {
      router.push("/admin/dashboard");
    }
  };

  const handleSignedUp = (user: User) => {
    setCurrentUser(user);
    setAuthOpen(false);
    if (user.role === "rider") {
      router.push("/account");
    } else if (user.role === "driver") {
      router.push("/driver/dashboard");
    } else if (user.role === "admin") {
      router.push("/admin/dashboard");
    }
  };

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
  };

  const handleRequestRide = () => {
    setRideRequested(true);
    // Simulate finding a driver after 2 seconds
    setTimeout(() => {
      setRideRequested(false);
      setRideInProgress(true);
    }, 2000);
  };

  const handleCancelRide = () => {
    setRideRequested(false);
    setRideInProgress(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col min-h-screen"
      >
        {/* Header */}
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                CarToGo
              </h1>
            </div>
            <TabsList className="grid w-[300px] grid-cols-3 bg-gray-800">
              <TabsTrigger value="rider">Rider</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            {/* Auth controls */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-200 text-sm">
                  Hi, {currentUser.firstName || currentUser.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                  onClick={openSignin}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-teal-400 border-teal-400"
                  onClick={openSignup}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* Auth modal overlay */}
        {authOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md">
              {authMode === "signin" ? (
                activeTab === "driver" ? (
                  <DriverSignin
                    onSignin={handleSignedIn}
                    onSwitchToSignup={() => setAuthMode("signup")}
                    initialRole="driver"
                  />
                ) : (
                  <RiderSignin
                    onSignin={handleSignedIn}
                    onSwitchToSignup={() => setAuthMode("signup")}
                    initialRole="rider"
                  />
                )
              ) : authMode === "signup" ? (
                activeTab === "driver" ? (
                  <DriverSignup
                    onSignup={handleSignedUp}
                    onSwitchToLogin={() => setAuthMode("signin")}
                  />
                ) : (
                  <RiderSignup
                    onSignup={handleSignedUp}
                    onSwitchToLogin={() => setAuthMode("signin")}
                    initialRole="rider"
                  />
                )
              ) : null}
              <div className="mt-2 text-right">
                <button
                  onClick={() => setAuthOpen(false)}
                  className="text-sm text-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          <TabsContent value="rider" className="h-full m-0">
            <div className="h-full flex flex-col">
              {/* Map Component */}
              <div className="flex-1 relative">
                <RideMap
                  showDrivers={true}
                  showRoute={rideRequested || rideInProgress}
                  driverLocation={
                    rideInProgress ? { lat: 37.7855, lng: -122.4071 } : undefined
                  }
                />

                {/* Floating Panel */}
                <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center">
                  {!rideRequested && !rideInProgress && (
                    <RideRequestPanel onRequestRide={handleRequestRide} />
                  )}

                  {rideRequested && (
                    <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-md border-gray-800 text-white">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
                            <Clock className="w-8 h-8 text-teal-400 animate-pulse" />
                          </div>
                          <h3 className="text-xl font-semibold">
                            Finding your driver
                          </h3>
                          <p className="text-gray-400 text-center">
                            We&apos re connecting you with a nearby driver
                          </p>
                          <Button variant="outline" onClick={handleCancelRide}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {rideInProgress && (
                    <RideTrackingCard onCancel={handleCancelRide} />
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="driver" className="h-full m-0">
            {/* Map Component for Driver */}
            <div className="flex-1 relative">
              <RideMap showDrivers={false} showRoute={false} />

              {/* Driver Dashboard */}
              <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center">
                <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-md border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">
                      Driver Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-400">
                            Today&apos s Earnings
                          </p>
                          <p className="text-2xl font-bold text-teal-400">
                            $124.50
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-teal-400 border-teal-400"
                        >
                          Cash Out
                        </Button>
                      </div>

                      <div className="p-3 bg-teal-500/20 rounded-lg">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Go Online</p>
                          <Button className="bg-teal-500 hover:bg-teal-600">
                            Start Driving
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recent Activity</h4>
                        {[1, 2].map((item) => (
                          <div
                            key={item}
                            className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-purple-400" />
                              </div>
                              <div>
                                <p className="font-medium">Downtown Trip</p>
                                <p className="text-sm text-gray-400">
                                  $18.50 • 3.2 miles
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="h-full m-0">
            <div className="flex-1 flex flex-col">
              {/* Admin Login Section */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <Card className="w-full max-w-md bg-gray-900/90 border-gray-800">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-teal-400 mb-2">Admin Portal</h2>
                      <p className="text-gray-300 text-sm">Sign in to access administrative dashboard</p>
                    </div>

                    {/* Demo Credentials Display */}
                    <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                      <h3 className="text-sm font-semibold text-teal-400 mb-2">Demo Credentials:</h3>
                      <div className="text-xs text-gray-300 space-y-1">
                        <p><span className="text-gray-400">Email:</span> admin@cartogo.com</p>
                        <p><span className="text-gray-400">Password:</span> admin123</p>
                      </div>
                    </div>

                    {/* Direct Login Form */}
                    <RiderSignin
                      onSignin={handleSignedIn}
                      onSwitchToSignup={() => setIsSignup(true)}
                      initialRole="admin"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  CarToGo
                </h3>
                <p className="text-gray-400 text-sm">
                  Modern ride-sharing platform connecting drivers and riders for a
                  seamless transportation experience.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-teal-400"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/safety"
                      className="hover:text-teal-400"
                    >
                      Safety
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="hover:text-teal-400"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="hover:text-teal-400"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">
                  Legal
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-teal-400"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-teal-400"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="hover:text-teal-400"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} CarToGo. All rights reserved.
            </div>
          </div>
        </footer>
      </Tabs>
    </main>
  );
}