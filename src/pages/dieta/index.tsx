import { GetStaticProps } from "next";
import { DietCard } from "../../components/DietCard";

import { firebase } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"

import styles from './app.module.scss'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Diet = {
  key?: string;
  title?: string;
  breakfast?: string;
  morningSnack?: string;
  lunch?: string;
  afterSnack?: string;
  dinner?: string;
}


export default function Diet() {

  const [dietList, setDietList] = useState<Diet[]>()

  useEffect(() => {
    const diet = firebase.firestore().collection('diet')
        .onSnapshot(querySnapshot => {
            const diets: Diet[] = []
            if (querySnapshot) {
                querySnapshot.forEach(documentSnapshot => {
                    diets.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    })
                })
            }
            setDietList(diets)
        })

        return () => {
            diet()
        }


})

  const router = useRouter()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        router.push('/auth')
      } else {
        return
      }
    })
  })

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, firebase }) => {
        if (isSignedIn === true) {
          return (
            <main>
              <section className={styles.dietBody}>
                {dietList?.map((diet) => {
                  return (
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
        } 
      }}
    </FirebaseAuthConsumer>

  )
}

