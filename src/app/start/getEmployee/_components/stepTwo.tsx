'use client'; // Если используете App Router в Next.js 13+

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Импорт для перенаправления
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import LinkIcon from '@/assets/icons/Link';

const StepTwo = () => {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter(); // Инициализация роутера

    const handleFileChange = (selectedFile: File | null) => {
        setFile(selectedFile);
        console.log('Выбранный файл:', selectedFile);
    };

    const handleSubmit = () => {
        if (description && file) {
            console.log('Описание компании:', description);
            console.log('Загруженный файл:', file);

            // Перенаправление на страницу "/hr"
            router.push('/hr');
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
            <LogoHr color="#814BFF" />
            <p className="text-center text-[32px] font-semibold">
                Давайте познакомимся <br />
                вами и вашей компании
            </p>
            <div className="flex w-full flex-col items-center gap-2.5">
                <div className="relative flex w-1/3 flex-row items-center gap-3">
                    <div className="flex w-full flex-col items-center">
                        <p className="text-base">Этап 1</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#814BFF] bg-[#814BFF]"></div>
                    </div>
                    <div className="flex w-full flex-col items-center">
                        <p className="text-base">Этап 2</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#814BFF] bg-[#814BFF]"></div>
                    </div>
                </div>
                <div className="flex w-2/3 flex-col gap-4">
                    <div className="flex w-full flex-row items-center gap-5">
                        <Input label="Введите название компании" />
                        <Input label="Чем занимается ваша компания?" />
                    </div>
                    <textarea
                        className="h-40 w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none"
                        placeholder="Расскажите подробнее о компании, чтобы будущие сотрудники могли познакомиться с компанией"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="-mb-3 text-sm font-normal leading-5 opacity-50">
                        мин: 300 на 300 пкс
                    </p>
                    <div className="flex w-full flex-row items-center gap-5">
                        <Input
                            type="file"
                            onFileChange={handleFileChange}
                            iconLeft={<LinkIcon />}
                            label="Загрузите логотип или аватарку компании"
                        />
                        <Button onClick={handleSubmit} className="">
                            Пройти далее
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
