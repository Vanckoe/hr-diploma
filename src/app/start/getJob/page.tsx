'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { IRegistrationForm } from '@/data/types';

const StepsWrapper = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<IRegistrationForm>({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
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

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Пожалуйста, введите ваше имя';
            isValid = false;
        } else if (formData.name.length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
            isValid = false;
        }

        // Phone validation
        const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Пожалуйста, введите номер телефона';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Неверный формат номера. Используйте: +7 (XXX) XXX-XX-XX';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Пожалуйста, введите пароль';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        // Confirm password validation
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

    const handleInputChange = (field: string, value: string) => {
        if (field === 'phone') {
            // Удаляем все нецифровые символы
            const digits = value.replace(/\D/g, '');

            // Форматируем номер телефона
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
        // Clear error when user starts typing
        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const onNext = () => {
        if (validateForm()) {
            console.log('Form Data:', {
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
            });
            router.push('/client');
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
                <LogoHr color="#814BFF" />
                <p className="text-center text-[32px] font-semibold">
                    Давайте познакомимся <br /> с вами и найдем <br /> вам работу
                </p>
                <div className="flex w-1/3 flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Введите ваше имя"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('name', e.target.value)
                            }
                        />
                        {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input
                            label="+7 ( ___ ) ___ - __ - __"
                            value={formData.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('phone', e.target.value)
                            }
                        />
                        {errors.phone && (
                            <span className="text-xs text-red-500">{errors.phone}</span>
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
                    <Button className="" onClick={onNext}>
                        Пройти далее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepsWrapper;
