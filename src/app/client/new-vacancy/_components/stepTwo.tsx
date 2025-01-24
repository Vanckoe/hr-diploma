'use client';
import React, { useState } from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const StepTwo = () => {
    const [description, setDescription] = useState('');

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-[36px] font-semibold">Создание резюме</h1>
            <div className="flex w-3/4 flex-col gap-2 rounded-[10px] bg-white px-10 pb-6 pt-9">
                <p className="text-base font-semibold">Расскажите о себе</p>
                <textarea
                    className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                    placeholder="Расскажите о себе, что любите, чем занимаетесь, ваши хобби"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p className="mt-4 text-base font-semibold">Образование</p>
                <Input placeholder="Введите ваш университет" />
                <Input placeholder="Введите ваш факультет" />
                <Input placeholder="Год выпуска из университета" />
                <Button className="mt-5 w-fit px-20">Продолжить</Button>
            </div>
        </div>
    );
};

export default StepTwo;
