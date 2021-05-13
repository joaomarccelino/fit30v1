import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { Header } from '../components/Header'
import { firebase, firebaseConfig} from '../data/firebase'
import { FirebaseAuthProvider } from "@react-firebase/auth"

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
      </div>
    </FirebaseAuthProvider>
  )
}

export default MyApp
