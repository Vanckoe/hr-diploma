'use client';

import React from 'react';

const VacancyCard = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                {/* Header */}
                <div className="flex flex-col items-start gap-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Дизайнер/Junior Дизайнер</h2>
                        <p className="mt-2 text-lg font-medium text-[#111]">от 250 000 ₸ на руки</p>
                        <ul className="mt-4 space-y-1 text-sm text-gray-600">
                            <li>Опыт работы: 1–3 года</li>
                            <li>Полная занятость</li>
                            <li>График: 5/2</li>
                            <li>Рабочие часы: 8</li>
                        </ul>
                    </div>
                    <div className="flex flex-row items-center gap-5">
                        <button className="rounded-full bg-[#7747FF] px-6 py-2 text-white transition hover:bg-[#6636ee]">
                            Откликнуться
                        </button>
                        <button className="rounded-full border border-[#7747FF] px-6 py-2 text-sm text-[#7747FF] transition hover:bg-[#f7f5ff]">
                            Подходит вам на 100%
                        </button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-800">
                    <p>
                        В рекламном агентстве по работе с блогерами 2ANY1 открыта вакансия
                        Дизайнера! Наша миссия — объединение ценностей бренда с ценностями людей.
                    </p>
                    <p>
                        Агентство работает в Казахстане уже 6 лет. Основательница — Диана Лапетина
                        (экс-директор Yuframe). Ждет вас в команду!
                    </p>
                    <ul className="list-disc pl-5">
                        <li>Офисный формат (удалёнка, гибрид — не рассматриваются)</li>
                        <li>График: пн–пт, 10:00–19:00</li>
                        <li>Адрес: Алматы, Назарбаева 120 (метро Алмалы)</li>
                    </ul>
                    <p>
                        Результат вашей работы: визуальные материалы, поддерживающие визуальную
                        идентичность бренда и внимание аудитории.
                    </p>

                    <p className="font-semibold">Эта работа для вас, если:</p>
                    <ul className="list-disc pl-5">
                        <li>Вы мыслите нестандартно и внимательны к деталям</li>
                        <li>Любите макеты, анимации и визуал</li>
                        <li>Готовы развиваться и выходить за рамки шаблонов</li>
                    </ul>

                    <p className="font-semibold">Ожидания от вас:</p>
                    <ul className="list-disc pl-5">
                        <li>Разработка печатных и digital-материалов</li>
                        <li>Презентации и участие в контент-плане</li>
                        <li>Визуализация постов, сторис, анимации</li>
                        <li>Брейнштормы и идеи для спецпроектов</li>
                    </ul>

                    <p className="font-semibold">Навыки:</p>
                    <ul className="list-disc pl-5">
                        <li>Photoshop, Illustrator, Figma, Sketch</li>
                        <li>Понимание полиграфии</li>
                    </ul>

                    <p className="font-semibold">Условия:</p>
                    <ul className="list-disc pl-5">
                        <li>Полный рабочий день с 10:00 до 19:00</li>
                        <li>Зарплата от 250 000 ₸ (по результатам собеседования)</li>
                        <li>Тестовый оплачиваемый период 2 недели</li>
                        <li>Офис в центре Алматы</li>
                        <li>Официальное оформление после 3 месяцев</li>
                        <li>Обучение, связи, знакомства</li>
                    </ul>

                    <p className="italic">
                        В сопроводительном письме укажите: почему вы, почему мы, и когда готовы
                        приступить к работе.
                    </p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-3">
                    {['Figma', 'Photoshop', 'Illustrator', 'Стрессоустойчивость'].map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-4 py-1 text-sm text-[#344054]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VacancyCard;
