import { z } from 'zod';

export const stepOneSchema = z.object({
    full_name: z
        .string({
            required_error: 'Введите ваше имя',
        })
        .min(1, 'Имя не может быть пустым')
        .max(255, 'Имя не может быть длиннее 255 символов'),
    position: z
        .string({
            required_error: 'Введите желаемую должность',
        })
        .min(1, 'Должность не может быть пустой')
        .max(255, 'Должность не может быть длиннее 255 символов'),
    specialization: z
        .string({
            required_error: 'Введите специализацию',
        })
        .min(1, 'Специализация не может быть пустой')
        .max(255, 'Специализация не может быть длиннее 255 символов'),
});

export const stepTwoSchema = z.object({
    work_format: z
        .string({
            required_error: 'Выберите формат работы',
        })
        .min(1, 'Формат работы не может быть пустым')
        .max(100, 'Формат работы не может быть длиннее 100 символов'),
    ready_for_business_trips: z
        .string({
            required_error: 'Укажите готовность к командировкам',
        })
        .min(1, 'Поле не может быть пустым')
        .max(100, 'Значение не может быть длиннее 100 символов'),
    expected_salary: z
        .number({
            required_error: 'Укажите ожидаемую зарплату',
        })
        .min(0, 'Зарплата не может быть отрицательной')
        .max(9223372036854776000, 'Слишком большое значение'),
    experience: z
        .string({
            required_error: 'Укажите опыт работы',
        })
        .min(1, 'Опыт работы не может быть пустым')
        .max(255, 'Опыт работы не может быть длиннее 255 символов'),
    skills: z.array(z.string()).min(1, 'Добавьте хотя бы один навык'),
});

export const stepThreeSchema = z.object({
    photo: z
        .string()
        .url('Некорректный формат URL')
        .max(200, 'URL фото не может быть длиннее 200 символов')
        .nullable()
        .optional(),
    about: z.string().optional(),
    languages: z.array(z.string()).min(1, 'Добавьте хотя бы один язык'),
    education: z.array(z.string()).min(1, 'Добавьте информацию об образовании'),
});

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
