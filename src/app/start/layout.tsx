import React from 'react';
import Footer from '@/components/ui/footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container mx-auto px-7">
            {children}
            <Footer />
        </div>
    );
}
