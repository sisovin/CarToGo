"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Car, FileText, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DriverSignupProps {
  onSignup?: (userData: any) => void;
  onSwitchToLogin?: () => void;
}

export default function DriverSignup({ 
  onSignup = () => {}, 
  onSwitchToLogin = () => {} 
}: DriverSignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
    insuranceProvider: "",
    agreeToTerms: false,
    agreeToBackgroundCheck: false,
    agreeToMarketing: false
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
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "Driver's license number is required";
    }
    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = "Vehicle make is required";
    }
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = "Vehicle model is required";
    }
    if (!formData.vehicleYear.trim()) {
      newErrors.vehicleYear = "Vehicle year is required";
    }
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = "License plate is required";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    if (!formData.agreeToBackgroundCheck) {
      newErrors.agreeToBackgroundCheck = "You must consent to background check";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignup(formData);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-md border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              CarToGo
            </h1>
          </div>
          <CardTitle className="text-2xl font-semibold">
            Become a driver
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Start earning money by driving with CarToGo
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-400 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                  />
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
            </div>

            {/* Driver License */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-400 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Driver's License
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-300">
                  License Number
                </Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  placeholder="D123456789"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                {errors.licenseNumber && (
                  <p className="text-red-400 text-xs">{errors.licenseNumber}</p>
                )}
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-400 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleMake" className="text-sm font-medium text-gray-300">
                    Make
                  </Label>
                  <Input
                    id="vehicleMake"
                    type="text"
                    placeholder="Toyota"
                    value={formData.vehicleMake}
                    onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                  />
                  {errors.vehicleMake && (
                    <p className="text-red-400 text-xs">{errors.vehicleMake}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleModel" className="text-sm font-medium text-gray-300">
                    Model
                  </Label>
                  <Input
                    id="vehicleModel"
                    type="text"
                    placeholder="Camry"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                  />
                  {errors.vehicleModel && (
                    <p className="text-red-400 text-xs">{errors.vehicleModel}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleYear" className="text-sm font-medium text-gray-300">
                    Year
                  </Label>
                  <Select value={formData.vehicleYear} onValueChange={(value) => handleInputChange("vehicleYear", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()} className="text-white hover:bg-gray-700">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.vehicleYear && (
                    <p className="text-red-400 text-xs">{errors.vehicleYear}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleColor" className="text-sm font-medium text-gray-300">
                    Color
                  </Label>
                  <Input
                    id="vehicleColor"
                    type="text"
                    placeholder="Silver"
                    value={formData.vehicleColor}
                    onChange={(e) => handleInputChange("vehicleColor", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensePlate" className="text-sm font-medium text-gray-300">
                  License Plate
                </Label>
                <Input
                  id="licensePlate"
                  type="text"
                  placeholder="ABC123"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
                {errors.licensePlate && (
                  <p className="text-red-400 text-xs">{errors.licensePlate}</p>
                )}
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-400 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Insurance Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider" className="text-sm font-medium text-gray-300">
                  Insurance Provider (Optional)
                </Label>
                <Input
                  id="insuranceProvider"
                  type="text"
                  placeholder="State Farm, Geico, etc."
                  value={formData.insuranceProvider}
                  onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-400 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Account Security
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
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
                  I agree to CarToGo's{" "}
                  <span className="text-teal-400 hover:underline cursor-pointer">
                    Driver Terms of Service
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
                  id="agreeToBackgroundCheck"
                  checked={formData.agreeToBackgroundCheck}
                  onCheckedChange={(checked) => handleInputChange("agreeToBackgroundCheck", checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor="agreeToBackgroundCheck" className="text-xs text-gray-400 leading-relaxed">
                  I consent to a background check and vehicle inspection as required by law
                </Label>
              </div>
              {errors.agreeToBackgroundCheck && (
                <p className="text-red-400 text-xs">{errors.agreeToBackgroundCheck}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor="agreeToMarketing" className="text-xs text-gray-400 leading-relaxed">
                  Send me driver tips, earnings updates, and promotional offers
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
                  <span>Creating Driver Account...</span>
                </div>
              ) : (
                "Become a Driver"
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Already have a driver account?{" "}
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