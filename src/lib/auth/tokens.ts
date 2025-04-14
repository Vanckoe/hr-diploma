import Cookies from 'js-cookie';

export const REFRESH_TOKEN_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken';

// 1. Исправляем функцию сохранения токенов
export const saveTokens = (tokens: { refresh: string; access: string }) => {
    // Сохраняем в оба хранилища
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    
    Cookies.set(REFRESH_TOKEN_KEY, tokens.refresh, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    });

    Cookies.set(ACCESS_TOKEN_KEY, tokens.access, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    });
};

// 2. Используем getTokens для получения токена
export const getTokens = () => ({
    access: localStorage.getItem(ACCESS_TOKEN_KEY) || Cookies.get(ACCESS_TOKEN_KEY),
    refresh: localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY)
});

export const removeTokens = () => {
    // Добавляем полную очистку
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY); // Добавляем
};