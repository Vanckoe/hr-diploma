import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerTokens } from './lib/auth/server-tokens';
import { getHrServerTokens } from './lib/auth/hr-server-tokens';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Проверяем, является ли текущий путь частью клиентской зоны
    if (pathname.startsWith('/client')) {
        const tokens = await getServerTokens();

        // Если токены отсутствуют, перенаправляем на страницу входа
        if (!tokens.access || !tokens.refresh) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Проверяем, является ли текущий путь частью HR зоны
    if (pathname.startsWith('/hr')) {
        const hrTokens = await getHrServerTokens();

        // Если HR токены отсутствуют, перенаправляем на страницу входа HR
        if (!hrTokens.access || !hrTokens.refresh) {
            return NextResponse.redirect(new URL('/start/getEmployee/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Указываем пути, для которых будет применяться middleware
    matcher: ['/client/:path*', '/hr/:path*'],
};
