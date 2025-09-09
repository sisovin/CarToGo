"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, type User } from "@/lib/auth";

interface RiderSigninProps {
  onSignin?: (userData: User) => void;
  onSwitchToSignup?: () => void;
  initialRole?: "rider" | "driver" | "admin";
}

export default function RiderSignin({
  onSignin = () => { },
  onSwitchToSignup = () => { },
  initialRole = "rider",
}: RiderSigninProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [role, setRole] = useState<"rider" | "driver" | "admin">(initialRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!email || !password) {
      setErrors({ general: "Email and password are required" });
      return;
    }

    setIsLoading(true);
    try {
      const user = await login({ email, password, role });
      onSignin(user);
    } catch (err: unknown) {
      const message = (err as Error)?.message || "Sign in failed";
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-md border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              CarToGo
            </h1>
          </div>
          <CardTitle className="text-2xl font-semibold">
            Sign in
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Access your account
          </p>

          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => setRole("rider")}
              className={`px-3 py-1 rounded-md ${role === "rider" ? "bg-teal-500 text-black" : "bg-gray-800 text-gray-300"}`}
            >
              Rider
            </button>
            <button
              type="button"
              onClick={() => setRole("driver")}
              className={`px-3 py-1 rounded-md ${role === "driver" ? "bg-purple-500 text-black" : "bg-gray-800 text-gray-300"}`}
            >
              Driver
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 transition-all duration-200"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-teal-400 hover:text-teal-300 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}