import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: ["/"],
    // Routes that can always be accessed, and have
    // no authentication information
    ignoredRoutes: [],

    afterAuth(auth, req) {
        // If user is signed in and trying to access the homepage, redirect to dashboard
        if (auth.userId && req.nextUrl.pathname === "/") {
            const dashboard = new URL("/dashboard", req.url);
            return NextResponse.redirect(dashboard);
        }

        // If user is not signed in and trying to access protected routes, 
        // Clerk will handle the redirect to sign-in
        return NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};