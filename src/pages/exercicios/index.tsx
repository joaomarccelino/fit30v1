import { GetStaticProps } from "next";
import { VideoCard } from "../../components/VideoCard";
import { useRouter } from 'next/router'

import { firebase, firebaseConfig } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"
import styles from './app.module.scss'
import { useEffect, useState } from "react";

type Video = {
    key?: string;
    title?: string;
    url1?: string;
    url2?: string;
}

type VideoProps = {
    videoList: Video[];
}


export default function Videos() {
    const [videoList, setVideoList] = useState<Video[]>()
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

    useEffect(() => {
        const video = firebase.firestore().collection('videos').orderBy('title')
            .onSnapshot(querySnapshot => {
                const videos: Video[] = [];
                if (querySnapshot) {
                    querySnapshot.forEach(documentSnapshot => {
                        videos.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        })
                    })
                }
                setVideoList(videos)
            })

            return () => {
                video()
            }


    })



    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, firebase }) => {
                if (isSignedIn === true) {
                    return (
                        <main>
                            <section className={styles.exBody}>
                                {videoList?.map((video) => {
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
                }
            }
            }
        </FirebaseAuthConsumer>

    )
}
