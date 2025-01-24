'use client';
import React from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

interface StepThreeProps {
    data: {
        companyName: string;
        position: string;
        workDescription: string;
    };
    onUpdate: (newData: Partial<StepThreeProps['data']>) => void;
    onFinish: () => void;
    onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ data, onUpdate, onFinish, onBack }) => {
    const handleInputChange = (field: keyof StepThreeProps['data'], value: string) => {
        onUpdate({ [field]: value });
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-2xl font-semibold">Опыт работы</p>
                <p className="mt-4 text-base font-semibold">Название компании, где вы работали</p>
                <Input
                    placeholder="Введите компании"
                    value={data.companyName}
                    onChange={(e) =>
                        handleInputChange('companyName', (e.target as HTMLInputElement).value)
                    }
                />

                <p className="mt-4 text-base font-semibold">Должность которую вы занимали</p>
                <Input
                    placeholder="Введите должность"
                    value={data.position}
                    onChange={(e) =>
                        handleInputChange('position', (e.target as HTMLInputElement).value)
                    }
                />
                <p className="mt-4 text-base font-semibold">
                    Расскажите в подробностях, чем занимались в компании
                </p>
                <textarea
                    className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                    placeholder="Расскажите в подробностях, чем занимались в компании"
                    value={data.workDescription}
                    onChange={(e) =>
                        handleInputChange(
                            'workDescription',
                            (e.target as HTMLTextAreaElement).value,
                        )
                    }
                />
                <div className="mt-5 flex gap-3">
                    <Button className="w-fit px-10" onClick={onBack}>
                        Назад
                    </Button>
                    <Button className="w-fit px-20" onClick={onFinish}>
                        Завершить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StepThree;
