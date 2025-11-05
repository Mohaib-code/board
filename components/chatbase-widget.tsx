"use client";

import { useEffect } from "react";

export const ChatbaseWidget = () => {
    useEffect(() => {
        // Initialize chatbase
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args: any[]) => {
                if (!window.chatbase.q) {
                    window.chatbase.q = [];
                }
                window.chatbase.q.push(args);
            };

            window.chatbase = new Proxy(window.chatbase, {
                get(target: any, prop: string) {
                    if (prop === "q") {
                        return target.q;
                    }
                    return (...args: any[]) => target(prop, ...args);
                }
            });
        }

        const onLoad = () => {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "qOHlmoXa_qG893j4F1zSG";
            script.setAttribute("domain", "www.chatbase.co");
            script.defer = true;
            document.body.appendChild(script);
        };

        if (document.readyState === "complete") {
            onLoad();
        } else {
            window.addEventListener("load", onLoad);
        }

        // Cleanup function
        return () => {
            const existingScript = document.getElementById("qOHlmoXa_qG893j4F1zSG");
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return null;
};

// TypeScript declaration for window.chatbase
declare global {
    interface Window {
        chatbase: any;
    }
}

// Usage in app/layout.tsx:
//
// import { ChatbaseWidget } from "@/components/chatbase-widget";
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en">
//             <body className={inter.className}>
//                 <ConvexClientProvider>
//                     <Toaster />
//                     <ModalProvider />
//                     <ChatbaseWidget />
//                     {children}
//                 </ConvexClientProvider>
//             </body>
//         </html>
//     );
// }