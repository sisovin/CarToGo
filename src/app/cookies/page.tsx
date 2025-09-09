import Link from "next/link";

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Cookie Policy</h1>

                    <section className="space-y-4 text-left bg-gray-900/60 p-6 rounded-lg border border-gray-800">
                        <p className="text-gray-300">This Cookie Policy explains how CarToGo uses cookies and similar technologies to recognize you and remember your preferences.</p>

                        <h2 className="text-2xl font-semibold text-white">What are cookies?</h2>
                        <p className="text-gray-300">Cookies are small data files stored on your device that help websites remember information about your visit. They enable features and improve your experience.</p>

                        <h2 className="text-2xl font-semibold text-white">Types of cookies we use</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Essential cookies: required for core functionality like authentication and security.</li>
                            <li>Performance cookies: collect anonymous usage data to help us improve the app.</li>
                            <li>Functional cookies: remember preferences such as language or theme.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-white">Managing cookies</h2>
                        <p className="text-gray-300">Most browsers allow you to control cookies via settings. You can block or delete cookies, but some features of the Service may not function properly if cookies are disabled.</p>

                        <h2 className="text-2xl font-semibold text-white">Third-party cookies</h2>
                        <p className="text-gray-300">We may allow third-party services to set cookies for analytics or other purposes. Their use of cookies is governed by their privacy policies.</p>

                        <h2 className="text-2xl font-semibold text-white">Changes to this policy</h2>
                        <p className="text-gray-300">We may update this Cookie Policy from time to time. Continued use of the Service after changes constitutes acceptance.</p>

                        <h2 className="text-2xl font-semibold text-white">Contact</h2>
                        <p className="text-gray-300">If you have questions about our Cookie Policy, contact: <a href="mailto:privacy@cartogo.example" className="text-teal-400 hover:underline">privacy@cartogo.example</a></p>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
