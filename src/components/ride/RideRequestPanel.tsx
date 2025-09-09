"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Car,
  X,
  User,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface RideOption {
  id: string;
  name: string;
  price: number;
  time: string;
  capacity: number;
  icon: React.ReactNode;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  car: string;
  licensePlate: string;
  photoUrl: string;
  eta: string;
}

interface RideRequestPanelProps {
  onRequestRide?: (rideOption: RideOption) => void;
  onCancel?: () => void;
  currentLocation?: string;
  driver?: Driver | null;
}

const RideRequestPanel = ({
  onRequestRide = () => { },
  onCancel = () => { },
  currentLocation = "Current Location",
  driver = null,
}: RideRequestPanelProps) => {
  const [destination, setDestination] = useState("");
  const [selectedRideOption, setSelectedRideOption] = useState<string | null>(
    null,
  );
  const [requestState, setRequestState] = useState<
    "search" | "options" | "requesting" | "matched"
  >("search");

  const rideOptions: RideOption[] = [
    {
      id: "standard",
      name: "Standard",
      price: 12.99,
      time: "5 min",
      capacity: 4,
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "premium",
      name: "Premium",
      price: 18.99,
      time: "4 min",
      capacity: 4,
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "xl",
      name: "XL",
      price: 24.99,
      time: "7 min",
      capacity: 6,
      icon: <Car className="h-5 w-5" />,
    },
  ];

  const defaultDriver: Driver = {
    id: "driver-123",
    name: "Alex Johnson",
    rating: 4.8,
    car: "Toyota Camry (2020)",
    licensePlate: "ABC 123",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    eta: "3 min",
  };

  const activeDriver = driver || defaultDriver;

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleDestinationSubmit = () => {
    if (destination.trim()) {
      setRequestState("options");
    }
  };

  const handleRideOptionSelect = (optionId: string) => {
    setSelectedRideOption(optionId);
  };

  const handleRequestRide = () => {
    if (selectedRideOption) {
      const selectedOption = rideOptions.find(
        (option) => option.id === selectedRideOption,
      );
      if (selectedOption) {
        setRequestState("requesting");
        // Simulate driver matching after 2 seconds
        setTimeout(() => {
          setRequestState("matched");
          onRequestRide(selectedOption);
        }, 2000);
      }
    }
  };

  const handleCancel = () => {
    setRequestState("search");
    setDestination("");
    setSelectedRideOption(null);
    onCancel();
  };

  return (
    <Card className="w-full max-w-md bg-background border-border shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">
            {requestState === "matched" ? "Your Ride" : "Request a Ride"}
          </h3>
          {requestState !== "search" && (
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {requestState === "search" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-muted/50 p-3 rounded-md">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{currentLocation}</p>
                <p className="text-xs text-muted-foreground">
                  Current Location
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 border rounded-md p-3">
              <Search className="h-5 w-5 text-primary" />
              <Input
                type="text"
                placeholder="Where to?"
                className="border-0 p-0 focus-visible:ring-0 bg-transparent"
                value={destination}
                onChange={handleDestinationChange}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleDestinationSubmit()
                }
              />
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleDestinationSubmit}
              disabled={!destination.trim()}
            >
              Find Rides
            </Button>
          </div>
        )}

        {requestState === "options" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  From: {currentLocation}
                </span>
                <span className="text-sm font-medium">To: {destination}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Edit
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Select Ride Type</p>
              {rideOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${selectedRideOption === option.id ? "bg-primary/10 border border-primary" : "bg-muted/50 hover:bg-muted"}`}
                  onClick={() => handleRideOptionSelect(option.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.time} arrival · {option.capacity} seats
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">${option.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleRequestRide}
              disabled={!selectedRideOption}
            >
              Request{" "}
              {selectedRideOption
                ? rideOptions.find((o) => o.id === selectedRideOption)?.name
                : "Ride"}
            </Button>
          </div>
        )}

        {requestState === "requesting" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Car className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Finding your driver</h4>
              <p className="text-sm text-muted-foreground">
                This wo&apos t take long...
              </p>
            </div>
          </div>
        )}

        {requestState === "matched" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  From: {currentLocation}
                </span>
                <span className="text-sm font-medium">To: {destination}</span>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary"
              >
                <Clock className="mr-1 h-3 w-3" /> {activeDriver.eta}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <Image
                  src={activeDriver.photoUrl}
                  alt={activeDriver.name}
                  width={64}
                  height={64}
                  className="object-cover rounded-full"
                  unoptimized
                />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-semibold">{activeDriver.name}</h4>
                  <div className="flex items-center ml-2">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs ml-1">{activeDriver.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activeDriver.car}
                </p>
                <p className="text-sm font-medium">
                  {activeDriver.licensePlate}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <User className="mr-2 h-4 w-4" /> Contact
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
              >
                Cancel Ride
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {requestState === "matched" && (
        <CardFooter className="bg-muted/30 pt-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Ride Details</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Estimated arrival</span>
                  <span className="font-medium">{activeDriver.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment method</span>
                  <span className="font-medium">Visa •••• 4242</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="safety" className="pt-2">
              <div className="text-sm space-y-2">
                <p>
                  Share your trip details with a trusted contact for added
                  safety.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Share Trip Status
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardFooter>
      )}
    </Card>
  );
};

export default RideRequestPanel;
