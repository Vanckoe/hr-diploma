import React from 'react';
import Image from 'next/image';

const Retained = () => {
    return (
        <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
            <p className="text-xl font-bold">Кандидаты, которых вы сохранили </p>
            <div className="mt-4 flex flex-row items-center rounded-[10px] bg-[#F8F8F8] px-12">
                <p className="mb-[100px] mt-[40px] text-[32px] font-bold">
                    Тут пока никого нет, <br /> но скоро все будет
                </p>
                <Image
                    src="/hr/FeedbackBg.png"
                    objectFit="contain"
                    width={515}
                    height={800}
                    alt="Retained"
                />
            </div>
        </div>
    );
};

export default Retained;
