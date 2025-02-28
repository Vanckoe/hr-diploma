'use client';

import React, { useState } from 'react';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

interface IFormData {
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface IFormErrors {
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface StepOneProps {
    onNext: (data: IFormData) => void;
}

const StepOne = ({ onNext }: StepOneProps) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<IFormErrors>({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Пожалуйста, введите ваше имя';
            isValid = false;
        } else if (formData.name.length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
            isValid = false;
        }

        const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Пожалуйста, введите номер телефона';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Неверный формат номера. Используйте: +7 (XXX) XXX-XX-XX';
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

    const handleInputChange = (field: keyof IFormData, value: string) => {
        if (field === 'phone') {
            const digits = value.replace(/\D/g, '');
            let formattedPhone = '';
            if (digits.length > 0) {
                formattedPhone = '+7';
                if (digits.length > 0) {
                    formattedPhone += ' (';
                }
                if (digits.length > 0) {
                    formattedPhone += digits.slice(0, 3);
                }
                if (digits.length >= 3) {
                    formattedPhone += ')';
                }
                if (digits.length > 3) {
                    formattedPhone += ' ' + digits.slice(3, 6);
                }
                if (digits.length > 6) {
                    formattedPhone += '-' + digits.slice(6, 8);
                }
                if (digits.length > 8) {
                    formattedPhone += '-' + digits.slice(8, 10);
                }
            }
            value = formattedPhone;
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
            onNext(formData);
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
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="+7 ( ___ ) ___ - __ - __"
                        value={formData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        label="Придумайте пароль"
                        type="password"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <span className="text-xs text-red-500">{errors.confirmPassword}</span>
                    )}
                </div>
                <Button className="" onClick={handleSubmit}>
                    Пройти далее
                </Button>
            </div>
        </div>
    );
};

export default StepOne;
