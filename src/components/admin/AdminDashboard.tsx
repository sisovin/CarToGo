"use client";

import { useState } from "react";
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
  Filter,
  Download,
  Bell,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminDashboardProps {
  onViewDetails?: (type: string, id: string) => void;
}

export default function AdminDashboard({ 
  onViewDetails = () => {} 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const stats = {
    totalRiders: 12847,
    totalDrivers: 3421,
    activeRides: 156,
    totalRevenue: 284750,
    riderGrowth: 12.5,
    driverGrowth: 8.3,
    rideGrowth: 15.2,
    revenueGrowth: 18.7
  };

  const recentRides = [
    {
      id: "R001",
      rider: "John Doe",
      driver: "Mike Johnson",
      pickup: "Downtown",
      destination: "Airport",
      status: "completed",
      fare: 28.50,
      time: "2 min ago"
    },
    {
      id: "R002",
      rider: "Sarah Smith",
      driver: "David Wilson",
      pickup: "Mall",
      destination: "University",
      status: "in-progress",
      fare: 15.75,
      time: "5 min ago"
    },
    {
      id: "R003",
      rider: "Alex Brown",
      driver: "Lisa Garcia",
      pickup: "Hotel",
      destination: "Stadium",
      status: "cancelled",
      fare: 22.00,
      time: "8 min ago"
    }
  ];

  const topDrivers = [
    {
      id: "D001",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      rating: 4.9,
      rides: 234,
      earnings: 4580
    },
    {
      id: "D002",
      name: "David Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4.8,
      rides: 198,
      earnings: 3920
    },
    {
      id: "D003",
      name: "Lisa Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      rating: 4.9,
      rides: 187,
      earnings: 3740
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "in-progress":
        return <Clock className="w-3 h-3" />;
      case "cancelled":
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertTriangle className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              CarToGo Admin
            </h1>
            <Badge variant="outline" className="border-teal-500/30 text-teal-400">
              Live Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search rides, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Total Riders
                  </CardTitle>
                  <Users className="h-4 w-4 text-teal-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stats.totalRiders.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats.riderGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Active Drivers
                  </CardTitle>
                  <Car className="h-4 w-4 text-teal-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stats.totalDrivers.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats.driverGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Active Rides
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-teal-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stats.activeRides}
                  </div>
                  <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats.rideGrowth}% from last hour
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-teal-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${stats.totalRevenue.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats.revenueGrowth}% from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Rides */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">
                    Recent Rides
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-teal-400">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-white">
                              {ride.rider}
                            </span>
                            <Badge className={`text-xs ${getStatusColor(ride.status)}`}>
                              {getStatusIcon(ride.status)}
                              <span className="ml-1">{ride.status}</span>
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-400">
                            {ride.pickup} → {ride.destination}
                          </div>
                          <div className="text-xs text-gray-500">
                            Driver: {ride.driver}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-teal-400">
                          ${ride.fare}
                        </div>
                        <div className="text-xs text-gray-500">
                          {ride.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Drivers */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">
                    Top Drivers
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-teal-400">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topDrivers.map((driver, index) => (
                    <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-teal-400">
                            #{index + 1}
                          </span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={driver.avatar} />
                            <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {driver.name}
                          </span>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>⭐ {driver.rating}</span>
                            <span>•</span>
                            <span>{driver.rides} rides</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-teal-400">
                          ${driver.earnings}
                        </div>
                        <div className="text-xs text-gray-500">
                          This month
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-white">
                    All Rides
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed ride management interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>User management interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  Analytics & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Advanced analytics and reporting would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}