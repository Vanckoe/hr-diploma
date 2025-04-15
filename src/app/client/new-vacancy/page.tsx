'use client';
import React, { useState } from 'react';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';
import StepThree from './_components/stepThree';
import type { StepOneData, StepTwoData, StepThreeData } from './validation';
import { userResume } from '@/api/client/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useResume } from '@/api/client/hooks';

const NewResume = () => {
    const router = useRouter();
    const resumeMutation = useResume();
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [formData, setFormData] = useState<{
        stepOne?: StepOneData;
        stepTwo?: StepTwoData;
        stepThree?: StepThreeData;
    }>({});

    const handleStepOneComplete = (data: StepOneData) => {
        setFormData((prev) => ({ ...prev, stepOne: data }));
        setCurrentStep(2);
    };

    const handleStepTwoComplete = (data: StepTwoData) => {
        setFormData((prev) => ({ ...prev, stepTwo: data }));
        setCurrentStep(3);
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    };

    const handleSubmit = (data: StepThreeData) => {
        if (!formData.stepOne || !formData.stepTwo) return;

        const finalData = {
            full_name: formData.stepOne.full_name,
            position: formData.stepOne.position,
            specialization: formData.stepOne.specialization,
            work_format: formData.stepTwo.work_format,
            ready_for_business_trips: formData.stepTwo.ready_for_business_trips,
            expected_salary: formData.stepTwo.expected_salary,
            experience: formData.stepTwo.experience,
            skills: formData.stepTwo.skills,
            photo: data.photo,
            about: data.about,
            languages: data.languages,
            education: data.education,
        };

        try {
            const validatedData = userResume.parse(finalData);
            resumeMutation.mutate(validatedData, {
                onSuccess: () => {
                    toast.success('Резюме успешно создано');
                    router.push('/client');
                },
                onError: (error) => {
                    console.error('Ошибка при отправке резюме:', error);
                    toast.error('Ошибка при создании резюме');
                },
            });
        } catch (error) {
            console.error('Ошибка валидации:', error);
            toast.error('Ошибка при создании резюме');
        }
    };

    return (
        <div>
            {currentStep === 1 && <StepOne onNext={handleStepOneComplete} />}
            {currentStep === 2 && (
                <StepTwo onBack={handlePrevStep} onNext={handleStepTwoComplete} />
            )}
            {currentStep === 3 && <StepThree onBack={handlePrevStep} onSubmit={handleSubmit} />}
        </div>
    );
};

export default NewResume;
