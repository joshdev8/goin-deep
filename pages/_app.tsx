import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from 'assets/theme';
import createEmotionCache from 'src/createEmotionCache';
import ResponsiveAppBar from 'src/components/AppBar/AppBar';
import Copyright from 'src/components/Copyright';
import '../styles/_app.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ResponsiveAppBar />
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
				<Copyright />
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
