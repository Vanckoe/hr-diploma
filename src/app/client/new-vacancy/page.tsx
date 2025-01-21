'use client';
import React from 'react';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';

const NewVacancy = () => {
    const workFormats = ['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'] as const;
    const exp = ['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'] as const;
    const trip = ['Да', 'Нет', 'Да, но не часто', 'Да, но не далекие страны'] as const;

    const handleFormatChange = (selected: (typeof workFormats)[number]) => {
        console.log('Выбранный формат:', selected);
    };
    const handleTripChange = (selected: (typeof trip)[number]) => {
        console.log('Выбранный формат:', selected);
    };
    const handleExpChange = (selected: (typeof exp)[number]) => {
        console.log('Выбранный формат:', selected);
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Введите ваше ФИО</p>
                <Input placeholder="Введите ваше ФИО" />
                <p className="mt-4 text-base font-semibold">Введите вашу должность / профессию</p>
                <Input placeholder="Введите вашу должность / профессию" />
                <p className="mt-4 text-base font-semibold">Ваша специализация</p>
                <Input placeholder="Ваша специализация" />
                <RadioSelect
                    label="Формат работы"
                    options={[...workFormats]}
                    onChange={handleFormatChange}
                />
                <RadioSelect
                    label="Готовы ли к командировкам?"
                    options={[...trip]}
                    onChange={handleTripChange}
                />
                <p className="mt-4 text-base font-semibold">Оплата в месяц (тг)</p>
                <div className="mb-4 flex flex-row items-center gap-3">
                    <Input placeholder="От" className="mb-4" />
                    <Input placeholder="До" className="mb-4" />
                </div>
                <RadioSelect label="Опыт" options={[...exp]} onChange={handleExpChange} />
            </div>
        </div>
    );
};

export default NewVacancy;
