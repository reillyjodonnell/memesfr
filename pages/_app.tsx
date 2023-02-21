import '@/styles/globals.css';
import '@/src/index.css';
import '@/src/css-components/sidebar.css';
import '@/src/css-components/card.css';
import '@/src/css-components/trending-topics.css';
import '../src/css-components/topbar.css';

import { useState } from 'react';
import AuthProvider from '@/src/contexts/auth-context';
import ThemeProvider from '@/src/contexts/theme-context';
// import LanguageProvider from '@/src/contexts/language-context';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const [loadingUser, setLoadingUser] = useState(true);
  return (
    <ThemeProvider>
      {/* <LanguageProvider> */}
      <AuthProvider setLoadingUser={setLoadingUser}>
        <Component {...pageProps} />
      </AuthProvider>
      {/* </LanguageProvider> */}
    </ThemeProvider>
  );
}
