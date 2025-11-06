import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: ["/"],

    // Routes that can always be accessed
    ignoredRoutes: [],

    afterAuth(auth, req) {
        const isPublicRoute = req.nextUrl.pathname === "/";
        const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
        const isBoardRoute = req.nextUrl.pathname.startsWith("/board");

        // If user is NOT authenticated and trying to access protected routes
        if (!auth.userId && (isDashboardRoute || isBoardRoute)) {
            const homeUrl = new URL('/', req.url);
            return NextResponse.redirect(homeUrl);
        }

        // If user IS authenticated and trying to access the homepage
        if (auth.userId && isPublicRoute) {
            const dashboard = new URL("/dashboard", req.url);
            return NextResponse.redirect(dashboard);
        }

        return NextResponse.next();
    },
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};