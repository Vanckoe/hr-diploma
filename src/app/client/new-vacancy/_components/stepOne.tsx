'use client';
import React, { useState } from 'react';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';
import Button from '@/components/ui/button';
import { z } from 'zod';

interface StepOneData {
    full_name: string;
    position: string;
    specialization: string;
}

const stepOneSchema = z.object({
    full_name: z.string().min(1, 'ФИО обязательно для заполнения'),
    position: z.string().min(1, 'Должность обязательна для заполнения'),
    specialization: z.string().min(1, 'Специализация обязательна для заполнения'),
});

interface StepOneProps {
    onNext: (data: StepOneData) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
    const [formData, setFormData] = useState<StepOneData>({
        full_name: '',
        position: '',
        specialization: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof StepOneData, string>>>({});

    const handleInputChange = (field: keyof StepOneData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        try {
            const validatedData = stepOneSchema.parse(formData);
            console.log('Валидация пройдена:', validatedData);
            onNext(validatedData);
        } catch (error) {
            if (error instanceof Error) {
                const zodError = JSON.parse(error.message);
                const newErrors: Partial<Record<keyof StepOneData, string>> = {};
                zodError.forEach((err: any) => {
                    newErrors[err.path[0] as keyof StepOneData] = err.message;
                });
                setErrors(newErrors);
                console.error('Ошибки валидации:', newErrors);
            }
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Введите ваше ФИО</p>
                <Input
                    placeholder="Введите ваше полное имя"
                    value={formData.full_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('full_name', e.target.value)
                    }
                    error={errors.full_name}
                />
                <p className="mt-4 text-base font-semibold">Желаемая должность</p>
                <Input
                    placeholder="Введите желаемую должность"
                    value={formData.position}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('position', e.target.value)
                    }
                    error={errors.position}
                />
                <p className="mt-4 text-base font-semibold">Специализация</p>
                <Input
                    placeholder="Укажите вашу специализацию"
                    value={formData.specialization}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('specialization', e.target.value)
                    }
                    error={errors.specialization}
                />
                <Button onClick={handleSubmit} className="mt-10 w-1/4 rounded-[10px]">
                    Продолжить
                </Button>
            </div>
        </div>
    );
};

export default StepOne;
