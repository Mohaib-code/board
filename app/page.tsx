"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layout, Users, Zap, Palette } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    // Redirect to dashboard if already signed in
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push("/dashboard");
        }
    }, [isLoaded, isSignedIn, router]);

    // Show loading state while checking auth
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if signed in (will redirect)
    if (isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">B</span>
                        </div>
                        <span className="font-semibold text-2xl">Board</span>
                    </div>
                    <Link href="/dashboard">
                        <Button size="lg">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Your Creative Whiteboard
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Collaborate in real-time, visualize ideas, and bring your team together with our powerful whiteboard platform.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link href="/dashboard">
                        <Button size="lg" className="text-lg px-8">
                            Start Creating
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-lg px-8">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Everything You Need to Collaborate
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-blue-600" />}
                        title="Real-Time Collaboration"
                        description="Work together with your team in real-time. See changes instantly as they happen."
                    />
                    <FeatureCard
                        icon={<Layout className="h-8 w-8 text-purple-600" />}
                        title="Infinite Canvas"
                        description="Never run out of space. Create, organize, and connect ideas freely."
                    />
                    <FeatureCard
                        icon={<Palette className="h-8 w-8 text-pink-600" />}
                        title="Rich Drawing Tools"
                        description="Express your ideas with shapes, text, sticky notes, and free drawing."
                    />
                    <FeatureCard
                        icon={<Zap className="h-8 w-8 text-orange-600" />}
                        title="Lightning Fast"
                        description="Experience smooth, lag-free collaboration with optimized performance."
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Transform Your Collaboration?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of teams already using Board to bring their ideas to life.
                    </p>
                    <Link href="/dashboard">
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            Get Started for Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 border-t">
                <div className="text-center text-gray-600">
                    <p>© 2024 Board. Built with Next.js, Convex, and Liveblocks.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}