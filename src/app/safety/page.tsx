import Link from "next/link";

export default function SafetyPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Safety at CarToGo</h1>
                    <p className="text-gray-300 mb-6">Your safety is our top priority. Below you&apos;ll find tips, features, and policies designed to keep riders and drivers protected on every trip.</p>

                    <section className="space-y-4 text-left bg-gray-900/60 p-6 rounded-lg border border-gray-800">
                        <h2 className="text-2xl font-semibold text-white">Rider Safety</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Verify the driver and vehicle details before you get in.</li>
                            <li>Share your trip with friends or family using the share feature.</li>
                            <li>Only request rides to public, well-lit pickup locations when possible.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-4 text-white">Driver Safety</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Confirm the rider&apos;s name and destination before starting the trip.</li>
                            <li>Keep communication in-app for traceability.</li>
                            <li>Report any suspicious behavior to support immediately.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-4 text-white">Background Checks & Verification</h2>
                        <p className="text-gray-300">All drivers go through identity verification. In a production system we would also run background checks and require valid insurance and license documents.</p>

                        <h2 className="text-2xl font-semibold mt-4 text-white">Emergency Features</h2>
                        <p className="text-gray-300">Features like an in-app emergency button and one-tap contact with local authorities are important for real-world deployments. This prototype focuses on UX — please ensure you have local emergency plans in place.</p>

                        <h2 className="text-2xl font-semibold mt-4 text-white">Reporting & Support</h2>
                        <p className="text-gray-300">If an incident occurs, please report it through the app so our team can take appropriate action.</p>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
