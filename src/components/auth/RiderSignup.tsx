"use client";

import { useState } from "react";
import { Eye, EyeOff, User as UserIcon, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { register, type User } from "@/lib/auth";

interface RiderSignupProps {
  onSignup?: (userData: User) => void;
  onSwitchToLogin?: () => void;
  initialRole?: "rider" | "driver";
}

export default function RiderSignup({
  onSignup = () => { },
  onSwitchToLogin = () => { },
  initialRole = "rider",
}: RiderSignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
    role: initialRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const user = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role as "rider" | "driver",
      });

      onSignup(user);
    } catch (err: unknown) {
      setErrors({ general: err instanceof Error ? err.message : "Failed to create account" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
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
            Sign up to ride
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Join thousands of riders using CarToGo
          </p>

          {/* Role selector: Rider or Driver */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => handleInputChange("role", "rider")}
              className={`px-3 py-1 rounded-md ${formData.role === "rider" ? "bg-teal-500 text-black" : "bg-gray-800 text-gray-300"}`}
            >
              Rider
            </button>
            <button
              type="button"
              onClick={() => handleInputChange("role", "driver")}
              className={`px-3 py-1 rounded-md ${formData.role === "driver" ? "bg-purple-500 text-black" : "bg-gray-800 text-gray-300"}`}
            >
              Driver
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                  First Name
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-xs">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor="agreeToTerms" className="text-xs text-gray-400 leading-relaxed">
                  I agree to CarToGo&apos;s{" "}
                  <span className="text-teal-400 hover:underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-teal-400 hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor="agreeToMarketing" className="text-xs text-gray-400 leading-relaxed">
                  Send me promotional emails and ride updates
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            {errors.general && (
              <p className="text-red-400 text-sm mt-2">{errors.general}</p>
            )}

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-teal-400 hover:text-teal-300 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}