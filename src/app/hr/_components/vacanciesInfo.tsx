import React from 'react';

const VacanciesInfo = () => {
    return (
        <div className="flex flex-row items-stretch gap-2.5">
            <div className="flex w-full flex-row items-center justify-between rounded-[10px] bg-white px-10">
                <p className="text-[80px] font-bold text-[#814BFF]">0</p>
                <p className="text-end text-2xl font-semibold">
                    активных <br /> вакансий
                </p>
            </div>
            <div className="flex w-full flex-row items-center justify-between rounded-[10px] bg-white px-10">
                <p className="text-[80px] font-bold text-[#814BFF]">0</p>
                <p className="text-end text-2xl font-semibold">
                    откликов <br /> на ваши вакансии
                </p>
            </div>
            <div className="flex w-full flex-row items-center justify-between rounded-[10px] bg-white px-10">
                <p className="text-[80px] font-bold text-[#814BFF]">0</p>
                <p className="text-end text-2xl font-semibold">
                    закрытых <br /> вакансий
                </p>
            </div>
        </div>
    );
};

export default VacanciesInfo;
