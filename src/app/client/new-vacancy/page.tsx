'use client';
import React, { useState } from 'react';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';
import StepThree from './_components/stepThree';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { UserResume, userResume } from '@/api/post/types';
import { getTokens } from '@/lib/auth/tokens';
import { createResume } from '@/api/resume/queries';

interface FormData {
    fullName: string;
    positionWant: string;
    specialization: string;
    workFormat: string;
    trips: string;
    salaryFrom: string;
    salaryTo: string;
    experience: string;
    description: string;
    university: string;
    faculty: string;
    graduationYear: string;
    companyName: string;
    position: string;
    workDescription: string;
    photo: string;
    skills: string;
    languages: string;
}

const NewVacancy: React.FC = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        positionWant: '',
        specialization: '',
        workFormat: '',
        trips: '',
        salaryFrom: '',
        salaryTo: '',
        experience: '',
        description: '',
        university: '',
        faculty: '',
        graduationYear: '',
        companyName: '',
        position: '',
        workDescription: '',
        photo: '',
        skills: '',
        languages: ''
    });

    const { mutate: submitResume } = useMutation({
        mutationFn: async (data: FormData) => {
            const payload = {
                // Обязательные поля (примеры значений)
                full_name: data.fullName || '', // обязательное
                position: data.positionWant || '', // обязательное
                specialization: data.specialization || '', // обязательное
                work_format: data.workFormat || '', // обязательное
                ready_for_business_trips: data.trips || '', // обязательное
                expected_salary: Number(data.salaryFrom) || 0, // обязательное (число)
                experience: data.experience || '', // обязательное

                // Необязательные поля (если не заполнены - передаем `null`)
                photo: data.photo || null, // base64 строка или null
                skills: data.skills?.length ? { values: data.skills } : null, // объект или null
                about: data.description || null, // строка или null
                languages: data.languages?.length ? { values: data.languages } : null, // объект или null
                education: data.university
                    ? {
                          // объект или null
                          university: data.university,
                          faculty: data.faculty || null,
                          graduation_year: Number(data.graduationYear) || null,
                      }
                    : null,
            };

            console.log('Отправляемый payload:', payload);

            const response = await createResume(payload);
            console.log('Ответ от сервера:', response);

            return response;
        },
    });

    const handleNextStep = () => {
        if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    };

    const handleFinishStep = () => {
        submitResume(formData);
    };

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...newData,
        }));
    };

    return (
        <div>
            {currentStep === 1 && (
                <StepOne data={formData} onUpdate={updateFormData} onNext={handleNextStep} />
            )}
            {currentStep === 2 && (
                <StepTwo
                    data={{
                        description: formData.description,
                        university: formData.university,
                        faculty: formData.faculty,
                        graduationYear: formData.graduationYear,
                    }}
                    onUpdate={updateFormData}
                    onNext={handleNextStep}
                    onBack={handlePrevStep}
                />
            )}
            {currentStep === 3 && (
                <StepThree
                    data={{
                        companyName: formData.companyName,
                        position: formData.position,
                        workDescription: formData.workDescription,
                    }}
                    onUpdate={updateFormData}
                    onFinish={handleFinishStep}
                    onBack={handlePrevStep}
                />
            )}
        </div>
    );
};

export default NewVacancy;
