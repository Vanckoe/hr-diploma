'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getResume } from '@/api/client/queries';

const Feedback = () => {
    const router = useRouter();
    const { data: resumes, isLoading } = useQuery({
        queryKey: ['resumes'],
        queryFn: getResume,
    });

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
            <p className="text-xl font-bold">Кандидаты: </p>
            
            {resumes && Array.isArray(resumes) && resumes.length > 0 ? (
                <div className="mt-5 flex flex-row flex-wrap items-stretch gap-5">
                    {resumes.map((resume) => (
                        <div 
                            key={resume.id}
                            className="flex w-fit flex-col rounded-[10px] bg-[#F8F8F8] px-5 py-4"
                        >
                            <p className="text-xl">{resume.name}</p>
                            <p className="text-sm font-normal">{resume.position}</p>
                            <p className="mt-4 text-sm font-normal text-[#393939]">
                                опыт работы от {resume.experience} лет
                            </p>
                            <button 
                                onClick={() => router.push(`/hr/${resume.id}`)}
                                className="mt-8 rounded-[10px] bg-white px-7 py-3.5 text-xs font-bold text-[#814BFF]"
                            >
                                Перейти к сотруднику
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 flex flex-row items-center rounded-[10px] bg-[#F8F8F8] px-12">
                    <p className="mb-[100px] mt-[40px] text-[32px] font-bold">
                        Тут пока никого нет, <br /> но скоро все будет
                    </p>
                    <Image
                        src="/hr/FeedbackBg.png"
                        objectFit="contain"
                        width={515}
                        height={800}
                        alt="feedback"
                    />
                </div>
            )}
        </div>
    );
};

export default Feedback;
