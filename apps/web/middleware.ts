import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME!;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_COOKIE_NAME);

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

    if (false && isAuthPage) {
        if (token) {
            // If the cookie exists, assume the user is logged in. Redirect them.
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (false && !token) {
        // If there's no token, they must log in.
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If a token exists, let the request pass.
    // Client-side logic in AuthProvider will handle validating it.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};