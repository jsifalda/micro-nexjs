import './reset.css'
import type { AppProps /*, AppContext */ } from 'next/app'

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      this is app
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
