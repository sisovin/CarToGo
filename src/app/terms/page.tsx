import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Terms of Service</h1>

                    <section className="space-y-4 text-left bg-gray-900/60 p-6 rounded-lg border border-gray-800">
                        <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
                        <p className="text-gray-300">By using CarToGo (the &quot;Service&quot;), you agree to these Terms of Service. If you do not agree, do not use the Service.</p>

                        <h2 className="text-2xl font-semibold text-white">2. Using the Service</h2>
                        <p className="text-gray-300">You may use the Service to request or provide transportation in accordance with local laws and regulations. All accounts must provide accurate information and keep credentials secure.</p>

                        <h2 className="text-2xl font-semibold text-white">3. Driver Requirements</h2>
                        <p className="text-gray-300">Drivers are responsible for maintaining valid licenses, insurance, and complying with local regulations. CarToGo may require verification and documentation before approving driver accounts.</p>

                        <h2 className="text-2xl font-semibold text-white">4. Payments</h2>
                        <p className="text-gray-300">Fare calculations, payment processing, and payouts will be handled according to the policies in the app. CarToGo is not responsible for payment disputes between users and drivers beyond facilitating support and investigation.</p>

                        <h2 className="text-2xl font-semibold text-white">5. Liability & Disclaimers</h2>
                        <p className="text-gray-300">The Service is provided &quot;as is&quot; and CarToGo disclaims warranties to the fullest extent permitted by law. To the extent permitted by law, CarToGo will not be liable for indirect, incidental, or consequential damages.</p>

                        <h2 className="text-2xl font-semibold text-white">6. Termination</h2>
                        <p className="text-gray-300">CarToGo may suspend or terminate accounts that violate these Terms or applicable laws.</p>

                        <h2 className="text-2xl font-semibold text-white">7. Changes to Terms</h2>
                        <p className="text-gray-300">We may update these Terms from time to time. Continued use after changes constitutes acceptance.</p>

                        <h2 className="text-2xl font-semibold text-white">8. Contact</h2>
                        <p className="text-gray-300">For questions about these Terms, contact: <a href="mailto:support@cartogo.example" className="text-teal-400 hover:underline">support@cartogo.example</a></p>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
