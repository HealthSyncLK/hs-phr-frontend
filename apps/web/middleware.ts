import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware reads its configuration directly from environment variables.
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME!;
const JWT_SECRET = process.env.JWT_SECRET!;

// This check is important to prevent the app from running without critical configuration.
if (!JWT_SECRET || !AUTH_COOKIE_NAME) {
    throw new Error(
        'Missing required environment variables: JWT_SECRET or AUTH_COOKIE_NAME'
    );
}

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_COOKIE_NAME);

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

    // If the user is trying to access a login/signup page
    if (isAuthPage) {
        if (token) {
            try {
                // If they have a valid token, they are already logged in. Redirect to the dashboard.
                await jwtVerify(token.value, SECRET_KEY);
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } catch (error) {
                // If the token is invalid, clear it and let them proceed to the login page.
                const response = NextResponse.next();
                response.cookies.delete(AUTH_COOKIE_NAME);
                return response;
            }
        }
        return NextResponse.next();
    }

    // For any other page (protected routes)
    if (!token) {
        // If there's no token, they must log in.
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify the token for the protected route
    try {
        await jwtVerify(token.value, SECRET_KEY);
        // Token is valid, allow access.
        return NextResponse.next();
    } catch (error) {
        // Token is invalid (expired, etc.), send them to login and clear the bad cookie.
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete(AUTH_COOKIE_NAME);
        return response;
    }
}

// This config specifies which routes the middleware will run on.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes are handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};