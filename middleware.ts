import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: ["/"],

    // Routes that can always be accessed
    ignoredRoutes: [],

    afterAuth(auth, req) {
        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            const signInUrl = new URL('/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            return NextResponse.redirect(signInUrl);
        }

        // If user is signed in and trying to access the homepage, redirect to dashboard
        if (auth.userId && req.nextUrl.pathname === "/") {
            const dashboard = new URL("/dashboard", req.url);
            return NextResponse.redirect(dashboard);
        }

        // Allow users to access dashboard and boards if authenticated
        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next();
        }

        return NextResponse.next();
    },
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};