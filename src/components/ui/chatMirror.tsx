'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from '@/assets/chatbot/chatIcon';
import OpenBtm from '@/assets/chatbot/openBtm';
import SendMsg from '@/assets/chatbot/sendMsg';
import X from '@/assets/X';
import Pulse from '@/components/pulse';
import { useMutation } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { Button, Textarea } from '@nextui-org/react';
import { ArrowUp, GPTIcon } from '@/assets/chatbot/Gpt';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const ChatMirror = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    const sendMessage = useMutation({
        mutationKey: ['sendMessage'],
        mutationFn: async (message: string) => {
            await sendingChat(message);
        },
        onSettled: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
    });

    const sendingChat = async (message: string) => {
        const response = await fetch('../../gpt/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            console.error('Failed to fetch chat response');
            return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullBotMessage = '';

        while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunkText = decoder.decode(value, { stream: true });
            const lines = chunkText.split('\n').filter((line) => line.startsWith('data: '));

            for (const line of lines) {
                const jsonString = line.replace(/^data: /, ''); // Remove 'data: ' prefix

                try {
                    const parsedData = JSON.parse(jsonString); // Parse the JSON string
                    const botMessage = parsedData.message.content.parts[0]; // Extract the bot's message
                    fullBotMessage = botMessage;

                    // Update the chat with the accumulated bot response
                    setChat((prevChat) => {
                        const updatedChat = [...prevChat];
                        const lastIndex = updatedChat.length - 1;

                        // If the last message is from the bot, update it, otherwise add a new bot message
                        if (updatedChat[lastIndex]?.role === 'bot') {
                            updatedChat[lastIndex].content = fullBotMessage;
                        } else {
                            updatedChat.push({
                                role: 'bot',
                                content: fullBotMessage,
                            });
                        }

                        return updatedChat;
                    });
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChat((prevChat) => [...prevChat, { role: 'user', content: message }]);
        setMessage('');
        sendMessage.mutate(message);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [chat]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input field when not loading
        }
    }, [sendMessage.isPending]);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-[30px] right-[45px] z-50 hidden rounded-full transition hover:opacity-80 md:block"
                >
                    <OpenBtm width="70" height="70" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-[30px]  right-[45px] z-50 hidden h-full max-h-[510px] w-full max-w-[340px] flex-col overflow-hidden rounded-lg bg-white shadow-2xl md:flex">
                    <div className="flex items-start justify-between bg-[#004FFF] p-5 text-white">
                        <div className="flex flex-row items-center gap-3">
                            <OpenBtm width="42" height="42" />
                            <div className="flex flex-col">
                                <p className="text-base font-semibold text-white">Digital HR-бот</p>
                                <div className="flex flex-row items-center gap-1 text-xs font-medium text-white">
                                    <Pulse color="#B4CD0F" pulseRadius={5} />
                                    Готов отвечать на любые вопросы
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="transition hover:opacity-80">
                            <X color="white" height="18" width="18" />
                        </button>
                    </div>

                    <div
                        className="flex flex-1 flex-col overflow-y-auto p-3"
                        ref={chatContainerRef}
                    >
                        {chat.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center">
                                <ChatIcon color="#814BFFE3" />
                                <p className="pt-3 text-center text-base font-semibold">
                                    Популярные вопросы
                                </p>
                                <div className="mt-5 flex flex-col gap-3 rounded-[10px] bg-[#F8F8F8] px-7 py-5">
                                    <p className="text-sm font-semibold text-[#814BFFE3]">
                                        Как сделать хорошее резюме
                                    </p>
                                    <div className="h-[1px] w-full bg-[#814BFFE3] opacity-10"></div>
                                    <p className="text-sm font-semibold text-[#814BFFE3]">
                                        Как подать себя перед HR
                                    </p>
                                    <div className="h-[1px] w-full bg-[#814BFFE3] opacity-10"></div>
                                    <p className="text-sm font-semibold text-[#814BFFE3]">
                                        Как пройти собеседование
                                    </p>
                                </div>
                            </div>
                        ) : (
                            chat.map((line, index) => (
                                <div
                                    key={index}
                                    className="mb-2 flex flex-col justify-end gap-2 text-sm font-semibold"
                                >
                                    <div
                                        className={`${
                                            line.role === 'user'
                                                ? 'ml-auto w-fit rounded-[10px] bg-[#814BFFE3] px-4 py-3 text-right leading-4 text-white'
                                                : 'mr-auto w-fit rounded-[10px] bg-[#ECECEC] px-4 py-3 text-left leading-4 text-[#814BFFE3]'
                                        }`}
                                    >
                                        <ReactMarkdown rehypePlugins={[rehypeKatex]}>
                                            {line.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex w-full flex-row items-center border-t">
                        <textarea
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            ref={inputRef}
                            value={message}
                            rows={1} // Для minRows
                            style={{ resize: 'none' }}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Спросите что нибудь..."
                            className="w-full p-5 pt-4 text-sm font-normal text-[#9C9C9C] focus:outline-none"
                            disabled={sendMessage.isPending}
                        />

                        <Button
                            type="submit"
                            isLoading={sendMessage.isPending}
                            isIconOnly
                            color="default"
                            className="pr-5 focus:outline-none"
                            isDisabled={message === ''}
                        >
                            <SendMsg />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatMirror;
