import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { ChatbaseWidget } from "@/components/chatbase-widget"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nexus Board",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConvexClientProvider>
                    <Toaster />
                    <ModalProvider />
                    <ChatbaseWidget /> {/* Add this line */}
                    {children}
                </ConvexClientProvider>
            </body>
        </html>
    );
}