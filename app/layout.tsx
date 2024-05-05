'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import "primereact/resources/themes/lara-light-indigo/theme.css";

interface RootLayoutProps {
    children: React.ReactNode;
}

const isProd = process.env.NODE_ENV === "production"

export default function RootLayout({ children }: RootLayoutProps) {
    const theme = `${isProd ? "/rbits" : ""}/themes/lara-light-indigo/theme.css`
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={theme} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>
                        {children}
                    </LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
