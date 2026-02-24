import { auth } from "@/auth";
import { NextResponse } from "next/server";

// These paths are accessible without login
const publicPaths = ["/", "/children", "/login", "/register", "/api/auth"];

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // Allow public paths
    const isPublicPath = publicPaths.some(p =>
        pathname === p || pathname.startsWith(p + "/")
    );

    if (isPublicPath) {
        return NextResponse.next();
    }

    // Allow static files and Next.js internals
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/uploads") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // If not logged in, redirect to login
    if (!req.auth) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Admin routes require admin role
    if (pathname.startsWith("/admin") && req.auth.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads).*)"],
};
