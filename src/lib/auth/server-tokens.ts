import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './tokens';

export const getServerTokens = async () => {
    const cookieStore = await cookies();

    return {
        refresh: (await cookieStore.get(REFRESH_TOKEN_KEY))?.value,
        access: (await cookieStore.get(ACCESS_TOKEN_KEY))?.value,
    };
};
