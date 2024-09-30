export { auth as middleware } from "@/auth"
import { NextRequest, NextResponse } from 'next/server';

export function auth(req: NextRequest) {
    // Example: Log the request URL
    console.log('Request URL:', req.url);

    // Proceed with the request
    return NextResponse.next();
}

// Optional: Configure the middleware to apply to specific paths
export const config = {
    matcher: '/((?!api|_next/static|_next/image).*)',
};
