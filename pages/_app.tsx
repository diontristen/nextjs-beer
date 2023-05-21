import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import '@fontsource/oswald/300.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import '@fontsource/oswald/700.css';
import { darkTheme } from '../styles/theme/darkTheme';
const clientSideEmotionCache = createEmotionCache()

export interface CustomProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps: { session, ...pageProps}, emotionCache = clientSideEmotionCache }: CustomProps) {
  return <SessionProvider session={session}>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  </SessionProvider>
}

export default MyApp
