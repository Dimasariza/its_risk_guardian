'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import RootStore from '@/redux/root/root';
import { PersistGate } from 'redux-persist/integration/react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="theme-css" href={`${process.env.PUBLIC_URL}/themes/lara-light-blue/theme.css`} rel="stylesheet"></link>
      </head>
      <body>
          <Provider store={RootStore().store}>
            <PersistGate loading={null} persistor={RootStore().persistor}>
              <PrimeReactProvider>
                <LayoutProvider>{children}</LayoutProvider>
              </PrimeReactProvider>
            </PersistGate>
          </Provider>
      </body>
    </html>
  );
}
