'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
// First install the package:
// npm install @hookform/resolvers zod
import { zodResolver } from '@hookform/resolvers/zod';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useRegister } from '@/api/auth/hooks';
import { registration, type Registration } from '@/api/post/types';

const StepsWrapper = () => {
    const router = useRouter();
    const register = useRegister();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<Registration>({
        resolver: zodResolver(registration),
        defaultValues: {
            full_name: '',
            phone_number: '',
            password: '',
        },
    });

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
        const digits = e.target.value.replace(/\D/g, '');
        const formattedValue = formatPhoneForView(digits);
        setValue('phone_number', formattedValue);
    };

    const onSubmit = async (data: Registration) => {
        try {
            const cleanPhoneNumber = data.phone_number.replace(/\D/g, '');
            await register.mutateAsync({
                ...data,
                phone_number: cleanPhoneNumber,
            });
            router.push('/client');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
                <LogoHr color="#814BFF" />
                <p className="text-center text-[32px] font-semibold">
                    Давайте познакомимся <br /> с вами и найдем <br /> вам работу
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-1/3 flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Введите ваше имя"
                            {...registerField('full_name')}
                            error={errors.full_name?.message}
                        />
                        {errors.full_name && (
                            <span className="text-xs text-red-500">{errors.full_name.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input
                            label="+7 ( ___ ) ___ - __ - __"
                            {...registerField('phone_number')}
                            value={watch('phone_number')}
                            onChange={handlePhoneChange}
                            error={errors.phone_number?.message}
                        />
                        {errors.phone_number && (
                            <span className="text-xs text-red-500">
                                {errors.phone_number.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Придумайте пароль"
                            type="password"
                            {...registerField('password')}
                            error={errors.password?.message}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">{errors.password.message}</span>
                        )}
                    </div>
                    <Button type="submit" className="" disabled={register.isPending}>
                        {register.isPending ? 'Загрузка...' : 'Пройти далее'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default StepsWrapper;
