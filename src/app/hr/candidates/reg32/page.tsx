'use client';

import React from 'react';
// import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getResumeById, getResume } from '@/api/client/queries';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ResumeCard = () => {
    const router = useRouter();
    // const { stuff } = useParams();
    const id = 4;

    const { data: resume, isLoading: resumeLoading } = useQuery({
        queryKey: ['resume', id],
        queryFn: () => getResumeById(id),
    });
    const { data: getAllResume, isLoading: getResumeLoading } = useQuery({
        queryKey: ['getResume'],
        queryFn: getResume,
    });

    if (resumeLoading) return <div>Загрузка...</div>;
    if (!resume) return <div>Резюме не найдено</div>;

    if (getResumeLoading) return <div>Загрузка...</div>;
    if (!getAllResume) return <div>Резюме не найдено</div>;

    return (
        <div className="flex flex-row items-start gap-5">
            <div className="flex w-3/4 flex-col gap-5">
                <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                    {/* Header */}
                    <div className="flex flex-col items-start gap-5">
                        <div>
                            <h2 className="text-2xl font-semibold">{resume.full_name}</h2>
                            <p className="mt-2 text-lg font-medium text-[#111]">
                                {resume.position}
                            </p>
                            <ul className="mt-4 space-y-1 text-sm lowercase text-gray-600">
                                <li>Специализация: {resume.specialization}</li>
                                <li>Формат работы: {resume.work_format}</li>
                                <li>Опыт: {resume.experience}</li>
                                <li>Ожидаемая зарплата: {resume.expected_salary}₸</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                    <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-800">
                        {resume.about && (
                            <>
                                <p className="text-2xl font-semibold">О себе</p>
                                <p className="text-base font-normal">
                                    Специализация: {resume.specialization}
                                </p>
                                <p className="text-base font-normal">{resume.about}</p>
                            </>
                        )}

                        <p className="text-2xl font-semibold">Навыки</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {resume.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-[10px] bg-[#F9F9F9] px-4 py-2.5 text-base font-semibold text-[#814BFF]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {resume.languages.length > 0 && (
                            <>
                                <p className="text-2xl font-semibold">Языки</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {resume.languages.map((language) => (
                                        <span
                                            key={language}
                                            className="rounded-[10px] bg-[#F9F9F9] px-4 py-2.5 text-base font-semibold text-[#814BFF]"
                                        >
                                            {language}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        {resume.education.length > 0 && (
                            <>
                                <p className="text-2xl font-semibold">Образование</p>
                                <ul className="list-disc pl-5">
                                    {resume.education.map((edu, index) => (
                                        <li key={index} className="text-base font-normal">
                                            {edu}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                    <p className="text-xl font-bold text-[#814BFF]">
                        Другие рекомендованные кандидаты
                    </p>
                    {getAllResume && Array.isArray(getAllResume) && getAllResume.length > 0 ? (
                        <div className="mt-5 flex flex-row flex-wrap items-stretch gap-5">
                            {getAllResume.slice(0, 3).map((resume) => (
                                <div
                                    key={resume.id}
                                    className="flex w-fit flex-col rounded-[10px] bg-[#F8F8F8] px-5 py-4"
                                >
                                    <p className="text-xl">{resume.full_name}</p>
                                    <p className="text-sm font-normal">{resume.position}</p>
                                    <p className="mt-4 text-sm font-normal text-[#393939]">
                                        опыт работы {resume.experience}
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
            </div>
        </div>
    );
};

export default ResumeCard;
