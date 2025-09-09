import Link from "next/link";

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Careers — Drive with CarToGo (Cambodia)</h1>
                    <p className="text-gray-300 mb-6">Join CarToGo and start earning a steady income as a professional taxi driver in Cambodia. We&apos;re building opportunities for local drivers to support their families while providing safe, reliable transport to their communities.</p>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Why drive with CarToGo?</h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Flexible hours — drive when it fits your schedule.</li>
                            <li>Competitive earnings and transparent fares.</li>
                            <li>Support for drivers with in-app tools and local support.</li>
                            <li>Trusted community — we prioritize rider and driver safety.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Open Roles</h2>
                        <div className="space-y-4 text-gray-300">
                            <div className="p-4 bg-gray-800 rounded-md">
                                <h3 className="font-semibold">Full-time Taxi Driver — Phnom Penh</h3>
                                <p className="text-sm">Full-time position offering consistent ride volume across the city.</p>
                                <ul className="list-disc list-inside mt-2">
                                    <li>Requirements: Valid Cambodian driving license, vehicle in good condition, smartphone.</li>
                                    <li>Benefits: Weekly payouts, priority access to high-demand zones, driver support.</li>
                                </ul>
                                <div className="mt-3">
                                    <Link href="/" className="inline-block px-3 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Apply Now</Link>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-800 rounded-md">
                                <h3 className="font-semibold">Part-time Driver — Siem Reap &amp; Coastal Areas</h3>
                                <p className="text-sm">Perfect for drivers seeking supplemental income with flexible hours.</p>
                                <ul className="list-disc list-inside mt-2">
                                    <li>Requirements: Valid license, clean driving record preferred, smartphone.</li>
                                    <li>Benefits: Flexible shifts, seasonal bonuses during tourist peaks.</li>
                                </ul>
                                <div className="mt-3">
                                    <Link href="/" className="inline-block px-3 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Apply Now</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">How to Apply</h2>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li>Create a CarToGo driver account (Sign Up) or visit a local onboarding center.</li>
                            <li>Prepare documents: driving license, vehicle registration, and insurance (if available).</li>
                            <li>Complete a short in-app onboarding and training on safety and service quality.</li>
                            <li>Start driving and earn — payouts are processed weekly.</li>
                        </ol>
                    </section>

                    <section className="bg-gray-900/60 p-6 rounded-lg border border-gray-800 mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-2">Support & Contact</h2>
                        <p className="text-gray-300">If you have questions about joining, please contact our Cambodia driver support team:</p>
                        <ul className="text-gray-300 mt-3">
                            <li>Email: <a href="mailto:drivers-kh@cartogo.example" className="text-teal-400 hover:underline">drivers-kh@cartogo.example</a></li>
                            <li>Phone/WhatsApp: <a href="tel:+85512345678" className="text-teal-400 hover:underline">+855 12 345 678</a></li>
                        </ul>
                    </section>

                    <div className="mt-8 flex justify-between">
                        <Link href="/" className="inline-block px-4 py-2 bg-gray-700 rounded-md text-gray-200 hover:bg-gray-600">Back to Home</Link>
                        <Link href="/about" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black hover:bg-teal-600">Learn more about CarToGo</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
