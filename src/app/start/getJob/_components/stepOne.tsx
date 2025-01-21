import React from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter из next/navigation
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const StepOne = () => {
    const router = useRouter(); // Инициализируем useRouter

    // Функция для обработки нажатия на кнопку
    const onNext = () => {
        router.push('/client'); // Перенаправляем на страницу /client
    };

    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
            <LogoHr color="#814BFF" />
            <p className="text-center text-[32px] font-semibold">
                Давайте познакомимся <br /> с вами и найдем <br /> вам работу
            </p>
            <div className="flex w-1/3 flex-col gap-2.5">
                <Input label="Введите ваше имя" />
                <Input label="+7 ( ___ ) ___ - __ - __" />
                <Input label="Придумайте пароль" />
                <Input label="Повторите пароль" />
                <Button className="" onClick={onNext}>
                    Пройти далее
                </Button>
            </div>
        </div>
    );
};

export default StepOne;
