'use client';
import React, { useState } from 'react';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';

interface IFormData {
    // Step One Data
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
    // Step Two Data
    companyName: string;
    industry: string;
    description: string;
    logo: File | null;
}

const StepsWrapper = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<IFormData>({
        // Step One initial data
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // Step Two initial data
        companyName: '',
        industry: '',
        description: '',
        logo: null
    });

    const handleStepOneData = (stepOneData: Pick<IFormData, 'name' | 'phone' | 'password' | 'confirmPassword'>) => {
        setFormData(prev => ({
            ...prev,
            ...stepOneData
        }));
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleStepTwoData = (stepTwoData: Pick<IFormData, 'companyName' | 'industry' | 'description' | 'logo'>) => {
        const finalFormData = {
            ...formData,
            ...stepTwoData
        };
        console.log('Combined Form Data:', finalFormData);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            {currentStep === 1 && <StepOne onNext={handleStepOneData} />}
            {currentStep === 2 && <StepTwo onSubmit={handleStepTwoData} formData={formData} />}
        </div>
    );
};

export default StepsWrapper;
