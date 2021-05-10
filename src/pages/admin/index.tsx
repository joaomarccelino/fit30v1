import styles from './app.module.scss'

import { GetStaticProps } from "next";
import { firebase } from '../../data/firebase'

import { IoAddCircleOutline } from 'react-icons/io5'
import { FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react';

type Diet = {
    id: string;
    title: string;
    breakfast: string;
    morningSnack: string;
    lunch: string;
    afterSnack: string;
    dinner: string;
}

type Video = {
    id: string;
    title: string;
    url1: string;
    url2: string;
}

type AdminProps = {
    dietList: Diet[];
    videoList: Video[];
}



export default function Admin({ dietList, videoList }: AdminProps) {

    const [dietId, setDietId] = useState('')
    const [title, setTitle] = useState('')
    const [breakfast, setBreakfast] = useState('')
    const [morningSnack, setMorningSnack] = useState('')
    const [lunch, setLunch] = useState('')
    const [afterSnack, setAfterSnack] = useState('')
    const [dinner, setDinner] = useState('')

    const [videoId, setVideoId] = useState('')
    const [vTitle, setVTitle] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')


    async function updateDiet(id) {
        firebase.firestore().collection('diet').doc(id).update(
            {
                title,
                breakfast,
                morningSnack,
                lunch,
                afterSnack,
                dinner
            }
        ).then(() => {
            console.log('Dieta atualizada!')
        })
    }

    async function updateVideo(id) {
        firebase.firestore().collection('videos').doc(id).update(
            {
                title: vTitle,
                url1,
                url2
            }
        ).then(() => {
            console.log('Video atualizado!')
        })
    }

    useEffect(() => {
        
    })
    
    function selectDiet() {
        setDietId(dietId)
        console.log(dietId)
    }


    return (
        <div className={styles.adminBody}>
            <section className={styles.formContainer}>
                <h1>Lista de Dieta</h1>
                <form action="">
                    <select name="" onChange={selectDiet} value={dietId}>
                        {dietList.map(diet => {
                            return (
                                <option value={diet.id}>{diet.title}</option>
                            )
                        })}
                    </select>
                    <label>Café da manhã</label>
                    <input type="text" value={breakfast}/>
                    <label>Lanche da manhã</label>
                    <input type="text" value={morningSnack}/>
                    <label>Almoço</label>
                    <input type="text" value={lunch}/>
                    <label>Lanche da tarde</label>
                    <input type="text" value={afterSnack}/>
                    <label>Janta</label>
                    <input type="text" value={dinner}/>
                </form>
                <button>Atualizar</button>
            </section>
            <section className={styles.formContainer}>
                <h1>Lista de Vídeos</h1>
                
                <button type="button" onClick={updateDiet}>Atualizar</button>
            </section>
        </div>
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

    const videoList = []

    const video = await firebase.firestore().collection('videos').get()
    if (video.empty) {
        console.log('No matching documents.');
        return;
    }
    video.forEach(doc => {
        videoList.push(doc.data());
    });

    return {
        props: {
            dietList,
            videoList
        },
        revalidate: 60 * 60 * 8, //24 hours
    }

}