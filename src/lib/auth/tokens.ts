import Cookies from 'js-cookie';

export const REFRESH_TOKEN_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken';

export const saveTokens = (tokens: { refresh: string; access: string }) => {
    // Сохраняем оба токена в куки
    Cookies.set(REFRESH_TOKEN_KEY, tokens.refresh, {
        expires: 7, // срок действия 7 дней
        secure: true,
        sameSite: 'strict',
    });

    Cookies.set(ACCESS_TOKEN_KEY, tokens.access, {
        expires: 1, // срок действия 1 день
        secure: true,
        sameSite: 'strict',
    });
};

export const getTokens = () => {
    return {
        refresh: Cookies.get(REFRESH_TOKEN_KEY),
        access: Cookies.get(ACCESS_TOKEN_KEY),
    };
};

export const removeTokens = () => {
    Cookies.remove(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};
