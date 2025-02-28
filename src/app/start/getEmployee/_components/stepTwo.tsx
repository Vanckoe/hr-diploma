'use client'; // Если используете App Router в Next.js 13+

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Импорт для перенаправления
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import LinkIcon from '@/assets/icons/Link';

interface ICompanyFormData {
    companyName: string;
    industry: string;
    description: string;
    logo: File | null;
}

interface ICompanyFormErrors {
    companyName: string;
    industry: string;
    description: string;
    logo: string;
}

interface StepTwoProps {
    onSubmit: (data: ICompanyFormData) => void;
    formData: {
        name: string;
        phone: string;
        password: string;
        confirmPassword: string;
    };
}

const StepTwo = ({ onSubmit, formData }: StepTwoProps) => {
    const router = useRouter();
    const [companyData, setCompanyData] = useState<ICompanyFormData>({
        companyName: '',
        industry: '',
        description: '',
        logo: null,
    });

    const [errors, setErrors] = useState<ICompanyFormErrors>({
        companyName: '',
        industry: '',
        description: '',
        logo: '',
    });

    const handleInputChange = (field: keyof ICompanyFormData, value: string | File | null) => {
        setCompanyData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };

    const handleFileChange = (selectedFile: File | null) => {
        handleInputChange('logo', selectedFile);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            companyName: '',
            industry: '',
            description: '',
            logo: '',
        };

        if (!companyData.companyName.trim()) {
            newErrors.companyName = 'Пожалуйста, введите название компании';
            isValid = false;
        }

        if (!companyData.industry.trim()) {
            newErrors.industry = 'Пожалуйста, укажите сферу деятельности компании';
            isValid = false;
        }

        if (!companyData.description.trim()) {
            newErrors.description = 'Пожалуйста, добавьте описание компании';
            isValid = false;
        } else if (companyData.description.length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
            isValid = false;
        }

        if (!companyData.logo) {
            newErrors.logo = 'Пожалуйста, загрузите логотип компании';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(companyData);
            router.push('/hr');
        }
    };

    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
            <LogoHr color="#814BFF" />
            <p className="text-center text-[32px] font-semibold">
                Давайте познакомимся <br />
                вами и вашей компании
            </p>
            <div className="flex w-2/3 flex-col gap-4">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Введите название компании"
                            value={companyData.companyName}
                            onChange={(e) =>
                                handleInputChange(
                                    'companyName',
                                    (e.target as HTMLInputElement).value,
                                )
                            }
                        />
                        {errors.companyName && (
                            <span className="text-xs text-red-500">{errors.companyName}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Input
                            label="Чем занимается ваша компания?"
                            value={companyData.industry}
                            onChange={(e) =>
                                handleInputChange('industry', (e.target as HTMLInputElement).value)
                            }
                        />
                        {errors.industry && (
                            <span className="text-xs text-red-500">{errors.industry}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <textarea
                        className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                        placeholder="Расскажите подробнее о компании, чтобы будущие сотрудники могли познакомиться с компанией"
                        value={companyData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    {errors.description && (
                        <span className="text-xs text-red-500">{errors.description}</span>
                    )}
                </div>
                <p className="-mb-3 text-sm font-normal leading-5 opacity-50">
                    мин: 300 на 300 пкс
                </p>
                <div className="flex w-full flex-row items-center gap-5">
                    <div className="flex flex-grow flex-col gap-1">
                        <Input
                            type="file"
                            onFileChange={handleFileChange}
                            iconLeft={<LinkIcon />}
                            label="Загрузите логотип или аватарку компании"
                        />
                        {errors.logo && <span className="text-xs text-red-500">{errors.logo}</span>}
                    </div>
                    <Button onClick={handleSubmit} className="">
                        Пройти далее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
