'use client';
import React from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

interface StepTwoProps {
    data: {
        description: string;
        university: string;
        faculty: string;
        graduationYear: string;
    };
    onUpdate: (newData: Partial<StepTwoProps['data']>) => void;
    onNext: () => void;
    onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ data, onUpdate, onNext, onBack }) => {
    const handleInputChange = (field: keyof StepTwoProps['data'], value: string) => {
        onUpdate({ [field]: value });
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Расскажите о себе</p>
                <textarea
                    className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                    placeholder="Расскажите о себе, что любите, чем занимаетесь, ваши хобби"
                    value={data.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
                <p className="mt-4 text-base font-semibold">Образование</p>
                <Input
                    placeholder="Введите ваш университет"
                    value={data.university}
                    onChange={(e) =>
                        handleInputChange('university', (e.target as HTMLInputElement).value)
                    }
                />
                <Input
                    placeholder="Введите ваш факультет"
                    value={data.faculty}
                    onChange={(e) =>
                        handleInputChange('faculty', (e.target as HTMLInputElement).value)
                    }
                />
                <Input
                    placeholder="Год выпуска из университета"
                    value={data.graduationYear}
                    onChange={(e) =>
                        handleInputChange('graduationYear', (e.target as HTMLInputElement).value)
                    }
                />
                <div className="mt-5 flex gap-3">
                    <Button className="w-fit px-10" onClick={onBack}>
                        Назад
                    </Button>
                    <Button className="w-fit px-20" onClick={onNext}>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
