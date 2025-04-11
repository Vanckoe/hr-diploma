import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerTokens } from './lib/auth/server-tokens';

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

    return NextResponse.next();
}

export const config = {
    // Указываем пути, для которых будет применяться middleware
    matcher: '/client/:path*',
};
