import React from 'react';
import NavBar from '@/components/ui/nav-bar';
import HrHeader from '@/components/layout/hr-header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative mx-auto flex min-h-screen flex-row">
            <NavBar />
            <div className="my-5 flex w-full flex-col">
                <div className="flex w-full flex-col px-5 pb-12 md:px-12">
                    <HrHeader />
                    {children}
                </div>
            </div>
        </div>
    );
}
