'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';
import TagInput from '@/components/ui/tagInput';
import { stepTwoSchema, type StepTwoData } from '../validation';

interface StepTwoProps {
    onBack: () => void;
    onNext: (data: StepTwoData) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onNext }) => {
    const workFormats = ['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'] as const;
    const tripOptions = ['Да', 'Нет', 'Иногда'] as const;
    const expOptions = ['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'] as const;

    const [formData, setFormData] = useState<StepTwoData>({
        work_format: 'На месте работодателя',
        ready_for_business_trips: 'Нет',
        expected_salary: 0,
        experience: 'Нет опыта',
        skills: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof StepTwoData, string>>>({});

    const handleInputChange = (field: keyof StepTwoData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        try {
            const validatedData = stepTwoSchema.parse(formData);
            console.log('Валидация пройдена:', validatedData);
            onNext(validatedData);
        } catch (error) {
            if (error instanceof Error) {
                const zodError = JSON.parse(error.message);
                const newErrors: Partial<Record<keyof StepTwoData, string>> = {};
                zodError.forEach((err: any) => {
                    newErrors[err.path[0] as keyof StepTwoData] = err.message;
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
                <RadioSelect
                    label="Формат работы"
                    options={[...workFormats]}
                    onChange={(selected) => handleInputChange('work_format', selected)}
                    error={errors.work_format}
                />
                <RadioSelect
                    label="Готовность к командировкам"
                    options={[...tripOptions]}
                    onChange={(selected) => handleInputChange('ready_for_business_trips', selected)}
                    error={errors.ready_for_business_trips}
                />
                <p className="mt-4 text-base font-semibold">Ожидаемая зарплата (тг)</p>
                <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Введите ожидаемую зарплату"
                    value={formData.expected_salary.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('expected_salary', parseInt(e.target.value) || 0)
                    }
                    error={errors.expected_salary}
                />
                <RadioSelect
                    label="Опыт работы"
                    options={[...expOptions]}
                    onChange={(selected) => handleInputChange('experience', selected)}
                    error={errors.experience}
                />
                <TagInput
                    label="Профессиональные навыки"
                    placeholder="Введите навык и нажмите Enter"
                    onChange={(tags) => setFormData((prev) => ({ ...prev, skills: tags }))}
                    error={errors.skills}
                />
                <div className="mt-5 flex gap-3">
                    <Button className="w-fit px-10" onClick={onBack}>
                        Назад
                    </Button>
                    <Button className="w-fit px-20" onClick={handleSubmit}>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
