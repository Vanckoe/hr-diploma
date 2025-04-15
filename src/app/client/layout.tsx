import React from 'react';
import ClientHeader from '@/components/layout/client-header';
import ChatMirror from '@/components/ui/chatMirror';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative mx-auto flex min-h-screen flex-row">
            <div className="my-5 flex w-full flex-col">
                <div className="flex w-full flex-col px-5 pb-12 md:px-12">
                    <ClientHeader />
                    {children}
                    <ChatMirror/>
                </div>
            </div>
        </div>
    );
}
