"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageCircle, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RideTrackingCardProps {
  driver?: {
    name: string;
    photo: string;
    rating: number;
    car: {
      model: string;
      color: string;
      licensePlate: string;
    };
  };
  ride?: {
    status: "matching" | "accepted" | "arriving" | "inProgress" | "completed";
    eta: number; // in minutes
    progress: number; // percentage 0-100
    pickup: string;
    destination: string;
  };
  // Allow parent components to cancel the ride UI interaction
  onCancel?: () => void;
}

const RideTrackingCard = ({
  driver = {
    name: "Michael Chen",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 4.8,
    car: {
      model: "Toyota Camry",
      color: "Silver",
      licensePlate: "ABC 123",
    },
  },
  ride = {
    status: "inProgress",
    eta: 12,
    progress: 45,
    pickup: "Current Location",
    destination: "Tech Park, Innovation Street",
  },
  onCancel,
}: RideTrackingCardProps) => {
  const getStatusText = () => {
    switch (ride.status) {
      case "matching":
        return "Finding your driver...";
      case "accepted":
        return "Driver accepted your ride";
      case "arriving":
        return `Arriving in ${ride.eta} minutes`;
      case "inProgress":
        return `${ride.eta} minutes to destination`;
      case "completed":
        return "Ride completed";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-md bg-background border-cyan-800/30 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge
            variant="outline"
            className={`${ride.status === "inProgress" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"} border-none`}
          >
            {getStatusText()}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{driver.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-cyan-500/30">
            <AvatarImage src={driver.photo} alt={driver.name} />
            <AvatarFallback className="bg-cyan-900 text-cyan-200">
              {driver.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{driver.name}</h3>
            <p className="text-sm text-muted-foreground">
              {driver.car.color} {driver.car.model}
            </p>
            <div className="mt-1">
              <Badge variant="secondary" className="bg-slate-800 text-white">
                {driver.car.licensePlate}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10 border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-400"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10 border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-400"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Separator className="my-4 bg-slate-700/50" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-full">
              <Clock className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Time</p>
              <p className="font-medium">{ride.eta} minutes</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trip Progress</span>
              <span className="font-medium">{ride.progress}%</span>
            </div>
            <Progress value={ride.progress} className="h-2 bg-slate-700" />
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-cyan-500/20 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium truncate">{ride.pickup}</p>
                </div>
                <Separator className="bg-slate-700/50" />
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium truncate">{ride.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {onCancel && (
        <div className="p-4 border-t border-slate-800 flex justify-center">
          <Button variant="outline" onClick={onCancel} className="text-red-400 border-red-400">
            Cancel Ride
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RideTrackingCard;
