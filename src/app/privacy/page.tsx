import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Privacy Policy</h1>

                    <section className="space-y-4 text-left bg-gray-900/60 p-6 rounded-lg border border-gray-800">
                        <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                        <p className="text-gray-300">We collect information you provide when creating an account, booking rides, and using the app, including name, email, phone number, location, payment information, and trip data.</p>

                        <h2 className="text-2xl font-semibold text-white">How We Use Information</h2>
                        <p className="text-gray-300">We use data to provide and improve the Service, process payments, ensure safety, and communicate with users. We do not sell personal data to third parties.</p>

                        <h2 className="text-2xl font-semibold text-white">Sharing & Disclosure</h2>
                        <p className="text-gray-300">We may share data with service providers and authorities when required by law. Drivers receive only the information necessary to complete trips.</p>

                        <h2 className="text-2xl font-semibold text-white">Security</h2>
                        <p className="text-gray-300">We employ reasonable security measures, but no system is completely secure. Keep your credentials private and report suspicious activity.</p>

                        <h2 className="text-2xl font-semibold text-white">Contact</h2>
                        <p className="text-gray-300">If you have questions about our privacy practices, contact: <a href="mailto:privacy@cartogo.example" className="text-teal-400 hover:underline">privacy@cartogo.example</a></p>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
