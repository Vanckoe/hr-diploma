'use client'; // Если используете App Router в Next.js 13+

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Импорт для перенаправления
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import LinkIcon from '@/assets/icons/Link';

interface ICompanyFormData {
    company_name: string;
    industry: string;
    company_description: string;
}

interface ICompanyFormErrors {
    company_name: string;
    industry: string;
    company_description: string;
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
        company_name: '',
        industry: '',
        company_description: '',
    });

    const [errors, setErrors] = useState<ICompanyFormErrors>({
        company_name: '',
        industry: '',
        company_description: '',
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

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            company_name: '',
            industry: '',
            company_description: '',
        };

        if (!companyData.company_name.trim()) {
            newErrors.company_name = 'Пожалуйста, введите название компании';
            isValid = false;
        }

        if (!companyData.industry.trim()) {
            newErrors.industry = 'Пожалуйста, укажите сферу деятельности компании';
            isValid = false;
        }

        if (!companyData.company_description.trim()) {
            newErrors.company_description = 'Пожалуйста, добавьте описание компании';
            isValid = false;
        } else if (companyData.company_description.length < 10) {
            newErrors.company_description = 'Описание должно содержать минимум 10 символов';
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
                            value={companyData.company_name}
                            onChange={(e) =>
                                handleInputChange(
                                    'company_name',
                                    (e.target as HTMLInputElement).value,
                                )
                            }
                        />
                        {errors.company_name && (
                            <span className="text-xs text-red-500">{errors.company_name}</span>
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
                        value={companyData.company_description}
                        onChange={(e) => handleInputChange('company_description', e.target.value)}
                    />
                    {errors.company_description && (
                        <span className="text-xs text-red-500">{errors.company_description}</span>
                    )}
                </div>
                <div className="flex w-full flex-row items-center gap-5">
                    <Button onClick={handleSubmit} className="">
                        Пройти далее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
