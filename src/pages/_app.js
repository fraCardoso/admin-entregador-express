import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../config/AppContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp