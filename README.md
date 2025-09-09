# CarToGo App

A modern ride-hailing web platform built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Shadcn UI. CarToGo is designed for scalability, onboarding clarity, and rapid development. Below you'll find an annotated project structure, folder purpose breakdown, onboarding notes, and essential setup instructions.

---

## 🚀 Tech Stack

- **Next.js 15.5.1 (App Router)**
- **React 19 (TSX)**
- **Tailwind CSS v4**
- **Shadcn UI Components**
- **Kafka (Event Streaming)**
- **WebSockets (Real-Time Updates)**
- **Custom Hooks & TypeScript Types**

---

## 🏗️ Project Structure

```
car-to-go/
├── app/                          # App Router structure
│   ├── layout.tsx               # Root layout with global styles
│   ├── page.tsx                 # Landing page
│   ├── rider/                   # Rider-specific routes
│   │   ├── page.tsx            # Rider dashboard
│   │   └── ride.tsx            # Ride request flow
│   ├── driver/                  # Driver-specific routes
│   │   ├── page.tsx            # Driver dashboard
│   │   └── assignment.tsx      # Ride assignment view
│   ├── api/                     # Route handlers (Next.js API)
│   │   ├── ride/route.ts       # POST/GET ride data
│   │   ├── driver/route.ts     # Driver status updates
│   │   └── websocket/route.ts  # WebSocket endpoint
│   └── _components/            # Shared layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── components/                  # UI components (Shadcn + custom)
│   ├── RideCard.tsx
│   ├── DriverStatus.tsx
│   ├── NotificationToast.tsx
│   └── MapView.tsx
│
├── lib/                         # Utility functions and services
│   ├── kafka.ts                # Kafka producer/consumer setup
│   ├── mapping.ts              # Third-party map API integration
│   ├── websocket.ts            # WebSocket client logic
│   └── locks.ts                # Distributed lock logic
│
├── hooks/                       # Custom React hooks
│   ├── useDriverLocation.ts
│   ├── useRideStatus.ts
│   └── useNotifications.ts
│
├── types/                       # Global TypeScript types
│   ├── ride.ts
│   ├── driver.ts
│   └── user.ts
│
├── styles/                      # Tailwind and global styles
│   ├── globals.css
│   └── tailwind.config.ts
│
├── public/                      # Static assets
│   ├── icons/
│   └── images/
│
├── middleware.ts                # Auth and route protection
├── shadcn.json                  # Shadcn component config
├── tailwind.config.ts           # Tailwind v4 setup
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js config
└── README.md                    # Project overview and onboarding
```

---

## 🧩 Folder Purpose Breakdown

| Folder        | Purpose |
|---------------|---------|
| **app/**        | App Router structure with pages, layouts, and API routes |
| **components/** | Reusable UI components (Shadcn + custom TSX) |
| **lib/**        | Service logic: Kafka, WebSocket, Mapping, Locking |
| **hooks/**      | Custom hooks for real-time data and state |
| **types/**      | Centralized TypeScript interfaces and types |
| **styles/**     | Tailwind v4 config and global styles |
| **public/**     | Static assets like icons and images |

---

## 🧭 Onboarding Notes

- **Visual-first onboarding:** Each folder maps directly to a system function for rapid comprehension. For example, `lib/kafka.ts` handles Kafka broker logic, and `app/rider/ride.tsx` implements the ride request flow.
- **Cross-team clarity:** Designers, PMs, and engineers can trace user journeys and backend integrations easily. Example: User flow from `app/rider/ride.tsx` → `lib/mapping.ts` for map interactions.
- **Extensible UI:** Shadcn UI components are configured in `shadcn.json` for easy updates and additions.

---

## ⚡ Getting Started

### Prerequisites

- **Node.js 20+**
- **Yarn or npm**
- **Kafka broker** (local or cloud)
- **Map API credentials** (e.g., Mapbox, Google Maps)

### Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/sisovin/CarToGo.git
   cd CarToGo
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.local` file and add keys for the Kafka broker, Map API, etc.

   ```
   KAFKA_BROKER_URL=your-kafka-broker-url
   MAP_API_KEY=your-map-api-key
   NEXT_PUBLIC_WS_URL=ws://localhost:3000/api/websocket
   ```

4. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Access the app:**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Key Features

- **Rider and Driver Flows:** Separate dashboards and flows for riders (`app/rider`) and drivers (`app/driver`).
- **Real-time Ride Updates:** WebSocket and Kafka integration for instant notifications and ride status updates.
- **Map Integration:** Interactive map view using third-party APIs.
- **Shadcn UI:** Modern, accessible components for rapid prototyping and production.
- **Role-based Routing:** Middleware protects routes and manages user roles.
- **Custom Hooks:** Real-time location, notifications, and status updates via TypeScript hooks.

---

## 📦 Deployment

- **Vercel:** ([Next.js best supported](https://vercel.com/))
- **Docker:** (Add Dockerfile if needed for self-hosted deployments)
- **Kafka:** Ensure broker is reachable from your deployment environment.
- **Map API:** Set up billing and security for map services.

---

## 👥 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request.

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation)
- [Shadcn UI](https://ui.shadcn.com/)
- [Kafka JS Client](https://kafka.js.org/)
- [Mapbox](https://docs.mapbox.com/) / [Google Maps](https://developers.google.com/maps/documentation)

---

## 🖼️ Visual System Mapping (Legend)

For onboarding, visualize each folder as a system node:
- **app/** → User flows, routing, API endpoints
- **lib/** → Distributed services (Kafka, WebSocket, Map)
- **components/** → UI building blocks
- **hooks/** → Real-time/reactive logic
- **types/** → Data contracts/interfaces

*(Color-coded diagram available upon request.)*

---

## 🏷️ License

MIT

---

**Contact:** [github.com/sisovin](https://github.com/sisovin)

Happy coding! 🚗✨
