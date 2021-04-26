import { GetStaticProps } from "next";
import { DietCard } from "../../components/DietCard";

import { firebase } from '../../data/firebase'

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
  //console.log(dietList)
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