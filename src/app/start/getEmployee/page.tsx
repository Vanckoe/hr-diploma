'use client';
import React, { useState } from 'react';
import StepOne from './_components/stepOne';
import StepTwo from './_components/stepTwo';

const StepsWrapper = () => {
    const [currentStep, setCurrentStep] = useState(1); // Управляем текущим шагом

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1); // Переход к следующему шагу
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            {currentStep === 1 && <StepOne onNext={handleNextStep} />}
            {currentStep === 2 && <StepTwo />}
        </div>
    );
};

export default StepsWrapper;
