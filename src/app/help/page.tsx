import Link from "next/link";

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Help Center</h1>
                    <p className="text-gray-300 mb-6">Find answers to common questions, troubleshooting steps, and ways to contact our support team.</p>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Getting Started</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>To request a ride, open the app, set your pickup and destination, then tap Request.</li>
                            <li>To drive with CarToGo, sign up as a driver and complete the onboarding steps.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Frequently Asked Questions</h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="font-medium">How do I pay for a trip?</h3>
                                <p className="text-sm">We support in-app card payments and cash depending on your region and settings.</p>
                            </div>

                            <div>
                                <h3 className="font-medium">What if I lost something in a vehicle?</h3>
                                <p className="text-sm">Use the trip details to contact your driver or reach out to support so we can help recover items.</p>
                            </div>

                            <div>
                                <h3 className="font-medium">How do I report an issue?</h3>
                                <p className="text-sm">Use the in-app reporting flow on the trip or contact support via email or phone below.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Troubleshooting</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>If the map is not updating, check your location permissions and internet connection.</li>
                            <li>If you can&apos;t sign in, try resetting your password or contact support.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Contact Support</h2>
                        <p className="text-gray-300">If you need help, contact our support team:</p>
                        <ul className="text-gray-300 mt-3">
                            <li>Email: <a href="mailto:support@cartogo.example" className="text-teal-400 hover:underline">support@cartogo.example</a></li>
                            <li>Driver support (Cambodia): <a href="mailto:drivers-kh@cartogo.example" className="text-teal-400 hover:underline">drivers-kh@cartogo.example</a></li>
                            <li>Emergency: Dial your local emergency number</li>
                        </ul>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
