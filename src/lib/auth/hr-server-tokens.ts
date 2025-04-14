import { cookies } from 'next/headers';
import { HR_ACCESS_TOKEN_KEY, HR_REFRESH_TOKEN_KEY } from './tokens';

export const getHrServerTokens = async () => {
    const cookieStore = await cookies();

    return {
        refresh: (await cookieStore.get(HR_REFRESH_TOKEN_KEY))?.value,
        access: (await cookieStore.get(HR_ACCESS_TOKEN_KEY))?.value,
    };
};
