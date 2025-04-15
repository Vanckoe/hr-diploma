'use client';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';
// If the error persists, run: npm install lucide-react --save

interface TagInputProps {
    label?: string;
    placeholder?: string;
    value?: string[];
    onChange?: (tags: string[]) => void;
    error?: string;
}

const TagInput: React.FC<TagInputProps> = ({
    label,
    placeholder = 'Введите текст',
    value = [],
    onChange,
    error,
}) => {
    const [tags, setTags] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTag = () => {
        if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            setInputValue('');
            onChange?.(newTags);
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        onChange?.(newTags);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {label && <p className="text-base font-semibold">{label}</p>}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-1 rounded-md bg-[#814BFF] px-2 py-1 text-white"
                    >
                        <span>{tag}</span>
                        <button
                            onClick={() => removeTag(index)}
                            className="flex items-center justify-center rounded-full hover:bg-[#6B3FD6]"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={placeholder}
                    className="flex-1 rounded-[10px] border border-[#E7E7E7] bg-white px-4 py-2 text-base outline-none focus:border-[#814BFF]"
                />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default TagInput;
