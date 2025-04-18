'use client';

import React, { useState } from 'react';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Link from 'next/link';

interface IFormData {
    full_name: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
}
interface IFormErrors {
    full_name: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
}

interface StepOneProps {
    onNext: (data: IFormData) => void;
}

const StepOne = ({ onNext }: StepOneProps) => {
    const [formData, setFormData] = useState<IFormData>({
        full_name: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<IFormErrors>({
        full_name: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            full_name: '',
            phone_number: '',
            password: '',
            confirmPassword: '',
        };

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Пожалуйста, введите ваше имя';
            isValid = false;
        } else if (formData.full_name.length < 2) {
            newErrors.full_name = 'Имя должно содержать минимум 2 символа';
            isValid = false;
        }

        const phone_numberRegex = /^\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
        if (!formData.phone_number.trim()) {
            newErrors.phone_number = 'Пожалуйста, введите номер телефона';
            isValid = false;
        } else if (!phone_numberRegex.test(formData.phone_number)) {
            newErrors.phone_number = 'Неверный формат номера. Используйте: 0(000)000-00-00';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Пожалуйста, введите пароль';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Пожалуйста, подтвердите пароль';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

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

    const handleInputChange = (field: keyof IFormData, value: string) => {
        if (field === 'phone_number') {
            const digits = value.replace(/\D/g, '');
            value = formatPhoneForView(digits);
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const submissionData = {
                ...formData,
                phone_number: formData.phone_number.replace(/\D/g, ''),
            };
            onNext(submissionData);
        }
    };

    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
            <LogoHr color="#814BFF" />
            <p className="text-center text-[32px] font-semibold">
                Давайте познакомимся <br />
                вами и вашей компании
            </p>
            <div className="flex w-1/3 flex-col gap-2.5">
                <div className="flex w-full flex-row items-center gap-3">
                    <div className="flex w-1/2 flex-col items-center">
                        <p className="text-base">Этап 1</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#814BFF] bg-[#814BFF]"></div>
                    </div>
                    <div className="flex w-1/2 flex-col items-center">
                        <p className="text-base">Этап 2</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#393939]"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="Введите ваше имя"
                        value={formData.full_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('full_name', e.target.value)
                        }
                    />
                    {errors.full_name && (
                        <span className="text-xs text-red-500">{errors.full_name}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="+7 ( ___ ) ___ - __ - __"
                        value={formData.phone_number}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('phone_number', e.target.value)
                        }
                    />
                    {errors.phone_number && (
                        <span className="text-xs text-red-500">{errors.phone_number}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="Придумайте пароль"
                        type="password"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('password', e.target.value)
                        }
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">{errors.password}</span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="Повторите пароль"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('confirmPassword', e.target.value)
                        }
                    />
                    {errors.confirmPassword && (
                        <span className="text-xs text-red-500">{errors.confirmPassword}</span>
                    )}
                </div>
                <Button className="" onClick={handleSubmit}>
                    Пройти далее
                </Button>
                <Link href={'/start/getEmployee/login'} className="text-red-700">
                    Уже есть аккаунт
                </Link>
            </div>
        </div>
    );
};

export default StepOne;
