export type User = {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    password: string;
    role?: "rider" | "driver"; // added role
    createdAt: string;
};

const USERS_KEY = "ctg_users";
const CURRENT_USER_KEY = "ctg_current_user";

function readUsers(): User[] {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (raw) return JSON.parse(raw) as User[];

        // Seed some sample users for local testing: one rider and one driver
        const defaultUsers: User[] = [
            {
                id: `user_rider`,
                firstName: 'Rider',
                lastName: 'Test',
                email: 'rider@example.com',
                phone: '+85510000001',
                password: 'password',
                role: 'rider',
                createdAt: new Date().toISOString(),
            },
            {
                id: `user_driver`,
                firstName: 'Driver',
                lastName: 'Test',
                email: 'driver@example.com',
                phone: '+85510000002',
                password: 'password',
                role: 'driver',
                createdAt: new Date().toISOString(),
            },
        ];

        writeUsers(defaultUsers);
        return defaultUsers;
    } catch {
        return [];
    }
}

function writeUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(user: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
        try {
            const users = readUsers();
            if (!user.email || !user.password) {
                return reject(new Error("Missing email or password"));
            }
            const exists = users.find((u) => u.email === user.email);
            if (exists) return reject(new Error("User already exists"));

            const newUser: User = {
                id: `user_${Date.now()}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                password: user.password,
                role: user.role ?? "rider", // default to rider if not provided
                createdAt: new Date().toISOString(),
            };

            users.push(newUser);
            writeUsers(users);

            // also set as current user
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

            setTimeout(() => resolve(newUser), 700);
        } catch {
            reject(new Error("Failed to register user"));
        }
    });
}

export async function login({ email, password, role }: { email: string; password: string; role?: "rider" | "driver"; }) {
    return new Promise<User>((resolve, reject) => {
        try {
            const users = readUsers();
            const user = users.find((u) => u.email === email && u.password === password && (role ? u.role === role : true));
            setTimeout(() => {
                if (!user) return reject(new Error("Invalid email or password"));
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                resolve(user);
            }, 600);
        } catch {
            reject(new Error("Failed to login"));
        }
    });
}

export function getCurrentUser(): User | null {
    try {
        const raw = localStorage.getItem(CURRENT_USER_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
}

export function signOut() {
    localStorage.removeItem(CURRENT_USER_KEY);
}
