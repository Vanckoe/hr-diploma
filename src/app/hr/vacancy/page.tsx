'use client';
import React, { useState } from 'react';
import StepOne from './_components/StepOne';
import StepTwo from './_components/StepTwo';
import type { StepOneData, StepTwoData } from './validation';
import { vacancy } from '@/api/hr/types';
import { useLogin } from '@/api/hr/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Vacancy = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState<{
        stepOne?: StepOneData;
        stepTwo?: StepTwoData;
    }>({});
    const { mutate: createVacancy, isPending } = useLogin();

    const handleStepOneComplete = (data: StepOneData) => {
        setFormData((prev) => ({ ...prev, stepOne: data }));
        setCurrentStep(2);
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
    };

    const handleSubmit = (data: StepTwoData) => {
        if (!formData.stepOne) return;

        const finalData = {
            job_title: formData.stepOne.job_title,
            specialization: formData.stepOne.specialization,
            city: formData.stepOne.city,
            hiring_plan: formData.stepOne.hiring_plan,
            work_format: formData.stepOne.work_format,
            salary_min: formData.stepOne.salary_min,
            salary_max: formData.stepOne.salary_max,
            experience: formData.stepOne.experience,
            required_skills: formData.stepOne.required_skills.reduce(
                (acc, skill) => {
                    acc[skill] = true;
                    return acc;
                },
                {} as Record<string, boolean>,
            ),
            job_description: data.job_description,
            responsibilities: { text: data.responsibilities },
            requirements: { text: data.requirements },
            conditions: { text: data.conditions },
        };

        try {
            const validatedData = vacancy.parse(finalData);
            createVacancy(validatedData, {
                onSuccess: () => {
                    toast.success('Вакансия успешно создана');
                    router.push('/hr');
                },
                onError: (error) => {
                    toast.error('Ошибка при создании вакансии');
                    console.error('Ошибка при создании вакансии:', error);
                },
            });
        } catch (error) {
            console.error('Ошибка валидации:', error);
        }
    };

    return (
        <div>
            {currentStep === 1 && <StepOne onNext={handleStepOneComplete} />}
            {currentStep === 2 && <StepTwo onBack={handlePrevStep} onSubmit={handleSubmit} />}
            {isPending && <div>Отправка данных...</div>}
        </div>
    );
};

export default Vacancy;
