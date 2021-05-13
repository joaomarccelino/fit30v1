import { GetStaticProps } from "next";
import { VideoCard } from "../../components/VideoCard";

import { firebase } from '../../data/firebase'

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