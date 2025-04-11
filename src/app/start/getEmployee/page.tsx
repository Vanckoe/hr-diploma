'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';
import { useRegisterHr } from '@/api/auth/hooks';
import { hrRegistration } from '@/api/post/types';
interface IFormData {
    // Step One Data
    full_name: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
    // Step Two Data
    company_name: string;
    industry: string;
    company_description: string;
}

const StepsWrapper = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<IFormData>({
        // Step One initial data
        full_name: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
        // Step Two initial data
        company_name: '',
        industry: '',
        company_description: '',
    });

    const handleStepOneData = (
        stepOneData: Pick<IFormData, 'full_name' | 'phone_number' | 'password' | 'confirmPassword'>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            ...stepOneData,
        }));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const router = useRouter();
    const { mutate: registerHr, isPending, error } = useRegisterHr();

    const handleStepTwoData = (
        stepTwoData: Pick<IFormData, 'company_name' | 'industry' | 'company_description'>,
    ) => {
        const finalFormData = {
            ...formData,
            ...stepTwoData,
        };

        registerHr(finalFormData, {
            onSuccess: () => {
                router.push('/hr/dashboard');
            },
            onError: (error) => {
                console.error('Registration failed:', error);
            },
        });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            {currentStep === 1 && <StepOne onNext={handleStepOneData} />}
            {currentStep === 2 && (
                <StepTwo
                    onSubmit={handleStepTwoData}
                    formData={{
                        name: formData.full_name,
                        phone: formData.phone_number,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                    }}
                />
            )}
        </div>
    );
};

export default StepsWrapper;
