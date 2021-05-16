import { GetStaticProps } from "next";
import { VideoCard } from "../../components/VideoCard";

import { firebase, firebaseConfig } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"
import styles from './app.module.scss'

type Video = {
    id: string;
    title: string;
    url1: string;
    url2: string;
}

type VideoProps = {
    videoList: Video[];
}


export default function Videos({ videoList }: VideoProps) {
    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, firebase }) => {
                if (isSignedIn === true) {
                    return (
                        <main>
                            <section className={styles.exBody}>
                                {videoList.map((video) => {
                                    return (
                                        <VideoCard
                                            title={video.title}
                                            regularVideo={video.url1}
                                            alternativeVideo={video.url2}
                                        />
                                    )
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
                } 
            }
        </FirebaseAuthConsumer>

    )
}

export const getStaticProps: GetStaticProps = async () => {

    const videoList = []

    const video = await firebase.firestore().collection('videos').orderBy('title').get()
    if (video.empty) {
        console.log('No matching documents.');
        return;
    }
    video.forEach(doc => {
        videoList.push(doc.data());
    });

    return {
        props: {
            videoList
        },
        revalidate: 60 * 60 * 8, //24 hours
    }

}