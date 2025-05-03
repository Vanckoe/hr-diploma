'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';
import TagInput from '@/components/ui/tagInput';
import { stepOneSchema, type StepOneData } from '../validation';

interface StepOneProps {
    onNext: (data: StepOneData) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
    const workFormats = ['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'] as const;
    const exp = ['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'] as const;

    const [formData, setFormData] = useState<StepOneData>({
        job_title: '',
        specialization: '',
        city: '',
        hiring_plan: 1,
        work_format: 'На месте работодателя',
        salary_min: 0,
        salary_max: 0,
        experience: 'Нет опыта',
        required_skills: [],
        // company: '', // ← Добавь это
        // vacancy_number: 0, // ← И это
    });

    const [errors, setErrors] = useState<Partial<Record<keyof StepOneData, string>>>({});

    const handleFormatChange = (selected: (typeof workFormats)[number]) => {
        setFormData((prev) => ({ ...prev, work_format: selected }));
    };

    const handleExpChange = (selected: (typeof exp)[number]) => {
        setFormData((prev) => ({ ...prev, experience: selected }));
    };

    const handleInputChange = (field: keyof StepOneData, value: string | number) => {
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
                zodError.forEach((err: { path: string[]; message: string }) => {
                    newErrors[err.path[0] as keyof StepOneData] = err.message;
                });
                setErrors(newErrors);
                console.error('Ошибки валидации:', newErrors);
            }
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Добавить вакансию</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Название должности / вакансии</p>
                <Input
                    placeholder="Введите название компании"
                    value={formData.job_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('job_title', e.target.value)
                    }
                    error={errors.job_title}
                />
                <p className="mt-4 text-base font-semibold">Специализация сотрудника</p>
                <Input
                    placeholder="Выбрать специализацию"
                    value={formData.specialization}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('specialization', e.target.value)
                    }
                    error={errors.specialization}
                />
                <p className="mt-4 text-base font-semibold">Город, где искать сотрудника</p>
                <Input
                    placeholder="Укажите город"
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('city', e.target.value)
                    }
                    error={errors.city}
                />
                <p className="mt-4 text-base font-semibold">План найма</p>
                <Input
                    placeholder="Сколько нужно человек"
                    type="text"
                    value={formData.hiring_plan.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('hiring_plan', parseInt(e.target.value))
                    }
                    error={errors.hiring_plan}
                    className="mb-4"
                />
                <RadioSelect
                    label="Формат работы"
                    options={[...workFormats]}
                    onChange={handleFormatChange}
                    error={errors.work_format}
                />
                <p className="mt-4 text-base font-semibold">Оплата в месяц (тг)</p>
                <div className="mb-4 flex flex-row items-center gap-3">
                    <Input
                        placeholder="От"
                        type="text"
                        value={formData.salary_min.toString()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('salary_min', parseInt(e.target.value))
                        }
                        error={errors.salary_min}
                        className="mb-4"
                    />
                    <Input
                        placeholder="До"
                        type="text"
                        value={formData.salary_max.toString()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('salary_max', parseInt(e.target.value))
                        }
                        error={errors.salary_max}
                        className="mb-4"
                    />
                </div>
                <RadioSelect
                    label="Опыт"
                    options={[...exp]}
                    onChange={handleExpChange}
                    error={errors.experience}
                />
                <TagInput
                    label="Требуемые навыки"
                    placeholder="Введите навык и нажмите Enter"
                    onChange={(tags) => setFormData((prev) => ({ ...prev, required_skills: tags }))}
                />
                <Button onClick={handleSubmit} className="mt-10 w-1/4 rounded-[10px]">
                    Продолжить
                </Button>
            </div>
        </div>
    );
};

export default StepOne;
