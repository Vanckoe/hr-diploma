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

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
        let formattedPhone = '';

        if (digits.length > 0) {
            formattedPhone = '+7';
            if (digits.length > 0) formattedPhone += ' (';
            if (digits.length > 0) formattedPhone += digits.slice(0, 3);
            if (digits.length >= 3) formattedPhone += ')';
            if (digits.length > 3) formattedPhone += ' ' + digits.slice(3, 6);
            if (digits.length > 6) formattedPhone += '-' + digits.slice(6, 8);
            if (digits.length > 8) formattedPhone += '-' + digits.slice(8, 10);
        }

        return formattedPhone;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setValue('phone_number', formattedValue);
    };

    const onSubmit = async (data: Registration) => {
        try {
            console.log(data);
            const cleanPhoneNumber = '7' + data.phone_number.replace(/\D/g, '').slice(1);
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
