import { GetStaticProps } from "next";
import { DietCard } from "../../components/DietCard";

import { firebase, firebaseConfig } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"

import styles from './app.module.scss'

type Diet = {
  id: string;
  title: string;
  breakfast: string;
  morningSnack: string;
  lunch: string;
  afterSnack: string;
  dinner: string;
}

type DietProps = {
  dietList: Diet[];
}

export default function Diet({ dietList }: DietProps) {
  return (    
    <FirebaseAuthConsumer>
    {({ isSignedIn, firebase }) => {
        if (isSignedIn === true) {
            return (
              <main>
              <section className={styles.dietBody}>
                {dietList.map((diet) => {
                  return(
                  <DietCard
                    title={diet.title}
                    breakfast={diet.breakfast}
                    morningSnack={diet.morningSnack}
                    lunch={diet.lunch}
                    afterSnack={diet.afterSnack}
                    dinner={diet.dinner}
                  />)
                })}
              </section>
            </main>
            )
        } else {
          return(
            <div>
              <h1>ACESSO NEGADO!</h1>
            </div>
          )
        }
    }}
</FirebaseAuthConsumer>

  )
}

export const getStaticProps: GetStaticProps = async () => {

  const dietList = []

  const diet = await firebase.firestore().collection('diet').get()
  if (diet.empty) {
    console.log('No matching documents.');
    return;
  }
  diet.forEach(doc => {
    dietList.push(doc.data());
  });

  return {
    props: {
      dietList
    },
    revalidate: 60 * 60 * 8, //24 hours
  }

}