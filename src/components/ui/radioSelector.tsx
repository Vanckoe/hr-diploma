// components/RadioSelect.tsx
import React, { useState } from 'react';

type RadioSelectProps<T extends string> = {
    options: T[];
    value?: T;
    label?: string;
    onChange: (value: T) => void;
    error?: string;
};

const RadioSelect = <T extends string>({
    options,
    value,
    label,
    onChange,
}: RadioSelectProps<T>) => {
    const [selected, setSelected] = useState<T | null>(value ? (value as T) : null);

    const handleSelect = (option: T) => {
        setSelected(option);
        onChange(option);
    };

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">{label}</h3>
            <div className="flex flex-col gap-2">
                {options.map((option) => (
                    <label key={option} className={`flex cursor-pointer items-center`}>
                        <input
                            type="radio"
                            name={label}
                            value={option}
                            checked={selected === option}
                            onChange={() => handleSelect(option)}
                            className="hidden"
                        />
                        <span
                            className={`flex size-5 items-center justify-center rounded-[5px] border-2 ${
                                selected === option
                                    ? 'border-[#814BFF] bg-[#814BFF]'
                                    : 'border-gray-300'
                            }`}
                        >
                            {selected === option && (
                                <div className="size-2.5 rounded-full bg-white"></div>
                            )}
                        </span>
                        <span className="ml-3">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioSelect;
