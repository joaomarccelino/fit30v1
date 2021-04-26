import { useState } from "react";
import { DietCard } from "../components/DietCard";
import { VideoCard } from "../components/VideoCard";

import styles from './home.module.scss'

export default function Home() {

  const [video, setVideo] = useState({
    title: "Dia 01",
    regularVideo: "https://www.youtube.com/watch?v=thsNmG_nDdk",
    alternativeVideo: "https://www.youtube.com/watch?v=M6d9or9kCLk"
  })

  const [diet, setDiet] = useState({
    title: "Dia 01",
    breakfast: "Ovo Mexido",
    morningSnack:'Doritos',
    lunch:'Crepioca',
    afterSnack:'Pão Francês',
    dinner:'Sopa de mandioca'
  })

  return (
    <div className={styles.bodyHome}>
      <VideoCard
        title={video.title}
        regularVideo={video.regularVideo}
        alternativeVideo={video.alternativeVideo}/>

      <VideoCard
        title={"Dia 02"}
        regularVideo={"https://www.youtube.com/watch?v=thsNmG_nDdk"}
        alternativeVideo={"https://www.youtube.com/watch?v=M6d9or9kCLk"}/>

      <DietCard 
        title={"Dia 01"}
        breakfast={diet.breakfast}
        morningSnack={diet.morningSnack}
        lunch={diet.lunch}
        afterSnack={diet.afterSnack}
        dinner={diet.dinner}
      />
    </div>
  )
}
