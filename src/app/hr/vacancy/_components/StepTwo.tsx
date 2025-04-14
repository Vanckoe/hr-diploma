'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { stepTwoSchema, type StepTwoData } from '../validation';

interface StepTwoProps {
    onBack: () => void;
    onSubmit: (data: StepTwoData) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useState<Partial<StepTwoData>>({
        job_description: '',
        responsibilities: '',
        requirements: '',
        conditions: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof StepTwoData, string>>>({});

    const handleInputChange = (field: keyof StepTwoData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        try {
            const validatedData = stepTwoSchema.parse(formData);
            console.log('Валидация второго шага пройдена:', validatedData);
            onSubmit(validatedData);
        } catch (error) {
            if (error instanceof Error) {
                const zodError = JSON.parse(error.message);
                const newErrors: Partial<Record<keyof StepTwoData, string>> = {};
                zodError.forEach((err: any) => {
                    if (err.path[0] && typeof err.path[0] === 'string') {
                        newErrors[err.path[0] as keyof StepTwoData] = err.message;
                    }
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
                <p className="text-base font-semibold">Описание вакансии</p>
                <p className="text-sm text-gray-500">
                    Не менее 100 символов. Не пишите контактных данных в описании.
                </p>
                <p className="mb-8 text-sm font-normal text-[#393939]">
                    При публикации вакансии запрещается размещать информацию, содержащую требования
                    дискриминационного характера в сфере труда (ограничения в зависимости от пола,
                    возраста, места жительства и иных обстоятельств, не связанных с деловыми
                    качествами и спецификой трудовой функции кандидата). Согласно п. 2 Ст. 6.
                    Трудового Кодекса РК от 23 ноября 2015 года № 414-V и п. 3-.2 Ст. 14 Закона РК
                    от 23 июля 1999 года № 451-I "О средствах массовой информации".
                </p>
                <textarea
                    className="min-h-[150px] rounded-[10px] border border-gray-300 p-3"
                    placeholder="Опишите вакансию"
                    value={formData.job_description}
                    onChange={(e) => handleInputChange('job_description', e.target.value)}
                />
                {errors.job_description && (
                    <p className="text-sm text-red-500">{errors.job_description}</p>
                )}
                <p className="mt-4 text-base font-semibold">Обязанности</p>
                <textarea
                    className="min-h-[150px] rounded-[10px] border border-gray-300 p-3"
                    placeholder="Расскажите про обязанности вашего будущего сотрудника"
                    value={formData.responsibilities}
                    onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                />
                {errors.responsibilities && (
                    <p className="text-sm text-red-500">{errors.responsibilities}</p>
                )}
                <p className="mt-4 text-base font-semibold">Требования</p>
                <textarea
                    className="min-h-[150px] rounded-[10px] border border-gray-300 p-3"
                    placeholder="Расскажите про требования будущему сотруднику"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                />
                {errors.requirements && (
                    <p className="text-sm text-red-500">{errors.requirements}</p>
                )}
                <p className="mt-4 text-base font-semibold">Условия</p>
                <textarea
                    className="min-h-[150px] rounded-[10px] border border-gray-300 p-3"
                    placeholder="Расскажите про условия для будущего сотрудника"
                    value={formData.conditions}
                    onChange={(e) => handleInputChange('conditions', e.target.value)}
                />
                {errors.conditions && <p className="text-sm text-red-500">{errors.conditions}</p>}
                <div className="mt-10 flex gap-4">
                    <Button onClick={onBack} className="w-1/4">
                        Назад
                    </Button>
                    <Button onClick={handleSubmit} className="w-1/4">
                        Опубликовать
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
