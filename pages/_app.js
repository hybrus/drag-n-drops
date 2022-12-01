import { Layout } from '../components/layouts/Layout'
import "../styles/app.scss";

export default function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || (
    page => <Layout>{page}</Layout>
  )

  return getLayout(<Component {...pageProps} />)

  // return (
  //   <LayoutsProvider>
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </LayoutsProvider>
  // )
}