import React from 'react';
import VacanciesInfo from './_components/vacanciesInfo';
import ActiveVacancies from './_components/activeVacancies';
import Feedback from './_components/feedback';
import Retained from './_components/retained';

const HrPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <VacanciesInfo />
            <ActiveVacancies />
            <Feedback />
            <Retained />
        </div>
    );
};

export default HrPage;
