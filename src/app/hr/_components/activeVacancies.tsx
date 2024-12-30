import React from 'react';
import Button from '@/components/ui/button';

const ActiveVacancies = () => {
    return (
        <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
            <p className="text-xl font-bold">Ваши активные вакансии</p>
            <div className="mt-4 rounded-[10px] bg-[#F8F8F8] px-12 py-10">
                <p className="text-[32px] font-bold">
                    Давайте добавим вашу <br /> первую вакансию
                </p>
                <Button className="mt-[50px] max-w-[310px]">Добавить вакансию</Button>
            </div>
        </div>
    );
};

export default ActiveVacancies;
