'use client';
import React, { useState } from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import TagInput from '@/components/ui/tagInput';
import { stepThreeSchema, type StepThreeData } from '../validation';

interface StepThreeProps {
    onBack: () => void;
    onSubmit: (data: StepThreeData) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useState<StepThreeData>({
        photo: '',
        about: '',
        languages: [],
        education: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof StepThreeData, string>>>({});

    const handleInputChange = (field: keyof StepThreeData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    React.useEffect(() => {
        handleInputChange('photo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXxtXeqQaRr3CjR2sKiSUGeAub-SRebD1e7w&s');
    }, []);
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">

                <p className="mt-4 text-base font-semibold">О себе</p>
                <textarea
                    className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                    placeholder="Расскажите о себе, своих увлечениях и достижениях"
                    value={formData.about || ''}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                />
                <TagInput
                    label="Владение языками"
                    placeholder="Введите язык и нажмите Enter"
                    onChange={(tags) => setFormData((prev) => ({ ...prev, languages: tags }))}
                    error={errors.languages}
                />
                <TagInput
                    label="Образование"
                    placeholder="Введите учебное заведение и нажмите Enter"
                    onChange={(tags) => setFormData((prev) => ({ ...prev, education: tags }))}
                    error={errors.education}
                />
                <div className="mt-5 flex gap-3">
                    <Button className="w-fit px-10" onClick={onBack}>
                        Назад
                    </Button>
                    <Button
                        className="w-fit px-20"
                        onClick={() => {
                            try {
                                const validatedData = stepThreeSchema.parse(formData);
                                console.log('Валидация пройдена:', validatedData);
                                onSubmit(validatedData);
                            } catch (error) {
                                if (error instanceof Error) {
                                    const zodError = JSON.parse(error.message);
                                    const newErrors: Partial<Record<keyof StepThreeData, string>> =
                                        {};
                                    zodError.forEach((err: any) => {
                                        newErrors[err.path[0] as keyof StepThreeData] = err.message;
                                    });
                                    setErrors(newErrors);
                                    console.error('Ошибки валидации:', newErrors);
                                }
                            }
                        }}
                    >
                        Завершить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepThree;
