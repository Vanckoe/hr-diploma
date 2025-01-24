'use client';
import React, { useState } from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const StepThree = () => {
    const [description, setDescription] = useState('');

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-2xl font-semibold">Опыт работы</p>
                <p className="mt-4 text-base font-semibold">Название компании, где вы работали</p>
                <Input placeholder="Введите компании" />
                <p className="mt-4 text-base font-semibold">Должность которую вы занимали</p>
                <Input placeholder="Введите должность" />
                <p className="mt-4 text-base font-semibold">
                    Расскажите в подробностях, чем занимались в компании
                </p>
                <textarea
                    className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                    placeholder="Расскажите в подробностях, чем занимались в компании"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button className="mt-5 w-fit px-20">Продолжить</Button>
            </div>
        </div>
    );
};

export default StepThree;
