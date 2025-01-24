'use client';
import React, { useState } from 'react';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';
import StepThree from './_components/stepThree';

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
}

const NewVacancy: React.FC = () => {
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
    });

    const handleNextStep = () => {
        if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    };
    const handleFinishStep = () => {
        console.log(formData);
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
