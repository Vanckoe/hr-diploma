import React, { forwardRef } from 'react';
import clsx from 'clsx';

type Props = React.HTMLProps<HTMLInputElement> & {
    label?: string; // Label для поля, если нужно
    iconLeft?: React.ReactNode; // Иконка слева
    containerClassName?: string; // Дополнительный класс для контейнера
    error?: string; // Ошибка для поля
    type?: 'text' | 'password' | 'email' | 'file'; // Поддержка типа файла
    fileLabel?: string; // Текст для отображения при загрузке файла
    onFileChange?: (file: File | null) => void; // Callback для обработки файлов
};

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            iconLeft,
            className,
            containerClassName,
            error,
            type = 'text',
            fileLabel,
            onFileChange,
            ...rest
        },
        ref,
    ) => {
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onFileChange && event.target.files) {
                onFileChange(event.target.files[0] || null);
            }
        };

        return (
            <div className={clsx('relative w-full', containerClassName)}>
                {iconLeft && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">{iconLeft}</div>
                )}
                {type === 'file' ? (
                    <div className="flex items-center gap-4">
                        <label
                            className={clsx(
                                'flex w-full cursor-pointer rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none',
                                { 'pl-12': iconLeft },
                                className,
                            )}
                        >
                            {fileLabel || 'Загрузите файл'}
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                {...rest}
                            />
                        </label>
                    </div>
                ) : (
                    <input
                        className={clsx(
                            'w-full rounded-[5px] border border-[#39393933] bg-[#F9F9F9] px-6 py-5 text-base font-medium text-[#484848] focus:outline-none',
                            { 'pl-12': iconLeft },
                            className,
                        )}
                        placeholder={label || 'Введите значение'}
                        ref={ref}
                        type={type}
                        {...rest}
                    />
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
