'use client';
import React from 'react';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';
import Button from '@/components/ui/button';

interface StepOneProps {
    data: {
        fullName: string;
        positionWant: string;
        specialization: string;
        workFormat: string;
        trips: string;
        salaryFrom: string;
        salaryTo: string;
        experience: string;
    };
    onUpdate: (newData: Partial<StepOneProps['data']>) => void;
    onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, onUpdate, onNext }) => {
    const workFormats = ['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'] as const;
    const exp = ['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'] as const;
    const trip = ['Да', 'Нет', 'Да, но не часто', 'Да, но не далекие страны'] as const;

    const handleInputChange = (field: keyof StepOneProps['data'], value: string) => {
        onUpdate({ [field]: value });
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Введите ваше ФИО</p>
                <Input
                    placeholder="Введите ваше ФИО"
                    value={data.fullName}
                    onChange={(e) =>
                        handleInputChange('fullName', (e.target as HTMLInputElement).value)
                    }
                />
                <p className="mt-4 text-base font-semibold">Введите вашу должность / профессию</p>
                <Input
                    placeholder="Введите вашу должность / профессию"
                    value={data.positionWant}
                    onChange={(e) =>
                        handleInputChange('positionWant', (e.target as HTMLInputElement).value)
                    }
                />
                <p className="mt-4 text-base font-semibold">Ваша специализация</p>
                <Input
                    placeholder="Ваша специализация"
                    value={data.specialization}
                    onChange={(e) =>
                        handleInputChange('specialization', (e.target as HTMLInputElement).value)
                    }
                />
                <RadioSelect
                    label="Формат работы"
                    options={[...workFormats]}
                    onChange={(selected) => handleInputChange('workFormat', selected)}
                />
                <RadioSelect
                    label="Готовы ли к командировкам?"
                    options={[...trip]}
                    onChange={(selected) => handleInputChange('trips', selected)}
                />
                <p className="mt-4 text-base font-semibold">Оплата в месяц (тг)</p>
                <div className="mb-4 flex flex-row items-center gap-3">
                    <Input
                        placeholder="От"
                        value={data.salaryFrom}
                        onChange={(e) =>
                            handleInputChange('salaryFrom', (e.target as HTMLInputElement).value)
                        }
                    />
                    <Input
                        placeholder="До"
                        value={data.salaryTo}
                        onChange={(e) =>
                            handleInputChange('salaryTo', (e.target as HTMLInputElement).value)
                        }
                    />
                </div>
                <RadioSelect
                    label="Опыт"
                    options={[...exp]}
                    onChange={(selected) => handleInputChange('experience', selected)}
                />
                <Button className="mt-5 w-fit px-20" onClick={onNext}>
                    Продолжить
                </Button>
            </div>
        </div>
    );
};

export default StepOne;
