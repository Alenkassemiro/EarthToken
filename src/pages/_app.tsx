import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default App;
