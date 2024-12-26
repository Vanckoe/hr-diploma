import React from 'react';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const StepOne = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center justify-center gap-5">
            <LogoHr color="#814BFF" />
            <p className="text-center text-[32px] font-semibold">
                Давайте познакомимся <br />
                вами и вашей компании
            </p>
            <div className="flex w-1/3 flex-col gap-2.5">
                <div className="flex w-full flex-row items-center gap-3">
                    <div className="flex w-1/2 flex-col items-center">
                        <p className="text-base">Этап 1</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#814BFF] bg-[#814BFF]"></div>
                    </div>
                    <div className="flex w-1/2 flex-col items-center">
                        <p className="text-base">Этап 2</p>
                        <div className="my-1.5 h-[5px] w-full rounded-[20px] border border-[#393939]"></div>
                    </div>
                </div>
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
