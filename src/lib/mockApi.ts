export type Trip = {
    id: string;
    date: string;
    amount: number;
    from: string;
    to: string;
};

export type Vehicle = {
    id: string;
    make: string;
    model: string;
    year: string;
    color?: string;
    plate: string;
    licenseNumber: string;
    nationalId: string;
};

export function getTrips(_userId?: string): Promise<Trip[]> {
    // Mocked trips for any user id
    const trips: Trip[] = [
        { id: "t1", date: "2025-03-21T12:34:00Z", amount: 7.2, from: "Central Market", to: "Phnom Penh Tower" },
        { id: "t2", date: "2025-03-18T09:12:00Z", amount: 14.0, from: "Airport", to: "Hotel Riverside" },
    ];
    return new Promise((resolve) => setTimeout(() => resolve(trips), 500));
}

export function getVehicles(_userId?: string): Promise<Vehicle[]> {
    const vehicles: Vehicle[] = [
        {
            id: "v1",
            make: "Toyota",
            model: "Prius",
            year: "2017",
            color: "White",
            plate: "KH-1234",
            licenseNumber: "D123456789",
            nationalId: "ID987654321",
        },
    ];
    return new Promise((resolve) => setTimeout(() => resolve(vehicles), 500));
}
