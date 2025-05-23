'use client';

import { useState } from 'react';
import { useHr } from '@/api/auth/hooks';
import { useRouter } from 'next/navigation';
import { login as loginSchema } from '@/api/post/types';
import { z } from 'zod';
import { saveHrTokens, getHrTokens } from '@/lib/auth/tokens';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { mutate: login, isPending } = useHr();

    const formatPhoneForView = (digits: string): string => {
        const cleaned = digits.slice(0, 11);

        let result = '';

        if (cleaned.length >= 1) {
            result += cleaned.slice(0, 1); // первая цифра (например, 7)
        }

        if (cleaned.length >= 2) {
            result += `(${cleaned.slice(1, 4)}`;
        }

        if (cleaned.length >= 5) {
            result += `)${cleaned.slice(4, 7)}`;
        }

        if (cleaned.length >= 8) {
            result += `-${cleaned.slice(7, 9)}`;
        }

        if (cleaned.length >= 10) {
            result += `-${cleaned.slice(9, 11)}`;
        }

        return result;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
        setPhone(digits);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            loginSchema.parse({ phone_number: phone, password });

            login(
                { phone_number: phone, password },
                {
                    onSuccess: (data) => {
                        saveHrTokens(data);
                        const savedTokens = getHrTokens();
                        console.log('Сохраненные HR токены:', savedTokens);
                        router.push('/hr');
                    },
                    onError: (error: any) => {
                        const errorMessage =
                            error?.response?.data?.detail ||
                            error?.message ||
                            'Неверный номер телефона или пароль';
                        setError(errorMessage);
                        console.error('Login error:', error);
                    },
                },
            );
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message);
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6">
                <div className="rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-center text-2xl font-bold">Вход</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Номер телефона
                            </label>
                            <input
                                required
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                value={formatPhoneForView(phone)} // красиво отображаем
                                onChange={handlePhoneChange} // сохраняем только цифры
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Пароль
                            </label>
                            <input
                                required
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
