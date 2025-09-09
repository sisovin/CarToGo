import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">About CarToGo</h1>
                    <p className="text-gray-300 mb-6">CarToGo is a modern, lightweight ride-sharing prototype built to connect riders and drivers. Our focus is on a simple, pleasant experience that makes getting where you need to go effortless.</p>

                    <section className="space-y-4 text-left bg-gray-900/60 p-6 rounded-lg border border-gray-800">
                        <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
                        <p className="text-gray-300">To provide fast, safe and reliable transportation by leveraging modern web technologies and intuitive UX.</p>

                        <h3 className="text-xl font-semibold mt-4">What we value</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Safety and trust for riders and drivers</li>
                            <li>Fast and reliable matching</li>
                            <li>Clear pricing and transparent operations</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">Join us</h3>
                        <p className="text-gray-300">Whether you want to ride or drive, create an account to get started. If you have questions, visit our <Link href="/" className="text-teal-400 hover:underline">home page</Link> or reach out.</p>
                    </section>

                    <div className="mt-8">
                        <Link href="/" className="inline-block px-4 py-2 bg-teal-500 rounded-md text-black font-medium hover:bg-teal-600">Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
