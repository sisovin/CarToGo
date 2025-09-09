"use client";

import React, { useState, useEffect } from "react";
import { Car, MapPin, Navigation } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  rating: number;
  carModel: string;
  licensePlate: string;
  location: {
    lat: number;
    lng: number;
  };
  heading: number; // in degrees, 0 is north, 90 is east
}

interface RideMapProps {
  currentLocation?: {
    lat: number;
    lng: number;
  };
  destination?: {
    lat: number;
    lng: number;
  };
  nearbyDrivers?: Driver[];
  selectedDriver?: Driver;
  isRideActive?: boolean;
  onDriverSelect?: (driver: Driver) => void;
  // Optional compatibility props used by page.tsx
  showDrivers?: boolean;
  showRoute?: boolean;
  driverLocation?: {
    lat: number;
    lng: number;
  };
}

const RideMap = ({
  currentLocation = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  destination,
  nearbyDrivers = [
    {
      id: "driver-1",
      name: "John Doe",
      rating: 4.8,
      carModel: "Toyota Prius",
      licensePlate: "ABC123",
      location: { lat: 37.7739, lng: -122.4212 },
      heading: 45,
    },
    {
      id: "driver-2",
      name: "Jane Smith",
      rating: 4.9,
      carModel: "Honda Civic",
      licensePlate: "XYZ789",
      location: { lat: 37.7769, lng: -122.4174 },
      heading: 270,
    },
    {
      id: "driver-3",
      name: "Sam Wilson",
      rating: 4.7,
      carModel: "Tesla Model 3",
      licensePlate: "TES123",
      location: { lat: 37.7729, lng: -122.4154 },
      heading: 180,
    },
  ],
  selectedDriver,
  isRideActive = false,
  onDriverSelect = () => { },
  // New compatibility props with defaults
  showDrivers = true,
  showRoute = false,
  driverLocation,
}: RideMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [driverPositions, setDriverPositions] = useState(nearbyDrivers);

  // Determine which destination to use for route/rendering
  const effectiveDestination = showRoute ? driverLocation ?? destination : destination;

  // Simulate driver movement
  useEffect(() => {
    if (!isRideActive) return;

    const interval = setInterval(() => {
      setDriverPositions((prev) =>
        prev.map((driver) => {
          // Only move the selected driver if in active ride
          if (selectedDriver && driver.id === selectedDriver.id) {
            // Move driver slightly toward destination if it exists
            if (effectiveDestination) {
              const moveTowardDestination = {
                lat:
                  driver.location.lat +
                  (effectiveDestination.lat - driver.location.lat) * 0.01,
                lng:
                  driver.location.lng +
                  (effectiveDestination.lng - driver.location.lng) * 0.01,
              };

              // Calculate new heading
              const deltaY = effectiveDestination.lat - driver.location.lat;
              const deltaX = effectiveDestination.lng - driver.location.lng;
              const heading = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

              return {
                ...driver,
                location: moveTowardDestination,
                heading: heading,
              };
            }
          }
          return driver;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isRideActive, selectedDriver, effectiveDestination]);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[700px] bg-slate-800 overflow-hidden rounded-lg">
      {/* Map placeholder - in a real app, this would be replaced with Google Maps API */}
      <div className="absolute inset-0 bg-slate-800 z-0">
        {/* Map grid lines for visual effect */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-700/30" />
          ))}
        </div>

        {/* Map loading indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 z-10">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-t-cyan-500 border-cyan-500/20 animate-spin"></div>
              <p className="mt-4 text-cyan-500 font-medium">Loading map...</p>
            </div>
          </div>
        )}

        {/* Current location marker */}
        <div
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${50 + currentLocation.lng * 0.1}%`,
            top: `${50 - currentLocation.lat * 0.1}%`,
          }}
        >
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-cyan-500/20 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* Destination marker (if set) */}
        {effectiveDestination && (
          <div
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + effectiveDestination.lng * 0.1}%`,
              top: `${50 - effectiveDestination.lat * 0.1}%`,
            }}
          >
            <MapPin className="h-8 w-8 text-purple-500 -mt-8" />
          </div>
        )}

        {/* Route line between current location and destination */}
        {effectiveDestination && (
          <svg
            className="absolute inset-0 z-5 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            <path
              d={`M ${50 + currentLocation.lng * 0.1}% ${50 - currentLocation.lat * 0.1}% L ${50 + effectiveDestination.lng * 0.1}% ${50 - effectiveDestination.lat * 0.1}%`}
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="5,5"
              fill="none"
            />
          </svg>
        )}

        {/* Driver markers */}
        {showDrivers && driverPositions.map((driver) => (
          <div
            key={driver.id}
            className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out cursor-pointer
              ${selectedDriver?.id === driver.id ? "scale-125" : "hover:scale-110"}`}
            style={{
              left: `${50 + driver.location.lng * 0.1}%`,
              top: `${50 - driver.location.lat * 0.1}%`,
            }}
            onClick={() => onDriverSelect(driver)}
          >
            <div
              className="relative"
              style={{
                transform: `rotate(${driver.heading}deg)`,
              }}
            >
              <Car
                className={`h-6 w-6 ${selectedDriver?.id === driver.id ? "text-purple-500" : "text-cyan-500"}`}
                fill={
                  selectedDriver?.id === driver.id
                    ? "rgba(147, 51, 234, 0.2)"
                    : "rgba(6, 182, 212, 0.2)"
                }
              />
            </div>
            {selectedDriver?.id === driver.id && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                {driver.name}
              </div>
            )}
          </div>
        ))}

        {/* Navigation compass */}
        <div className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-full z-30">
          <Navigation className="h-6 w-6 text-cyan-500" />
        </div>

        {/* Map attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-slate-500 z-30">
          CarToGo Maps | Interactive Ride Sharing
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-30">
        <button className="w-10 h-10 bg-slate-900/80 rounded-full flex items-center justify-center text-cyan-500 hover:bg-slate-900 transition-colors">
          <span className="text-xl font-bold">+</span>
        </button>
        <button className="w-10 h-10 bg-slate-900/80 rounded-full flex items-center justify-center text-cyan-500 hover:bg-slate-900 transition-colors">
          <span className="text-xl font-bold">-</span>
        </button>
      </div>
    </div>
  );
};

export default RideMap;
