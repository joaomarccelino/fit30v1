import styles from './app.module.scss'

import { GetStaticProps } from "next";
import { firebase } from '../../data/firebase'

import { IoAddCircleOutline } from 'react-icons/io5'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react';

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



export default function AdminTeste({ dietList, videoList }: AdminProps) {

    const [title, setTitle] = useState('')
    const [breakfast, setBreakfast] = useState('')
    const [morningSnack, setMorningSnack] = useState('')
    const [lunch, setLunch] = useState('')
    const [afterSnack, setAfterSnack] = useState('')
    const [dinner, setDinner] = useState('')

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


    const renderDietRows = () => {
        const dList = dietList.map((diet) => {
            return (
                <tr key={diet.id}>
                    <td>
                        <input type="text" value={diet.title} />
                    </td>
                    <td>
                        <input type="text" value={diet.breakfast} />
                    </td>
                    <td>
                        <input type="text" value={diet.morningSnack} />
                    </td>
                    <td>
                        <input type="text" value={diet.lunch} />
                    </td>
                    <td>
                        <input type="text" value={diet.afterSnack} />
                    </td>
                    <td>
                        <input type="text" value={diet.dinner} />
                    </td>
                    <button className={styles.add}>
                        <IoAddCircleOutline />
                    </button>
                    <button className={styles.delete}>
                        <FaTrash />
                    </button>
                </tr>
            )
        })

        return dList
    }

    const renderVideoRows = () => {
        const vList = videoList.map((video) => {
            return (
                <tr key={video.id}>
                    <td>
                        <input type="text" value={video.title} />
                    </td>
                    <td>
                        <input type="text" value={video.url1} />
                    </td>
                    <td>
                        <input type="text" value={video.url2} />
                    </td>
                    <td>
                        <button className={styles.add}>
                            <IoAddCircleOutline />
                        </button>
                        <button className={styles.delete}>
                            <FaTrash />
                        </button>
                    </td>
                </tr>
            )
        })
        return vList
    }


    return (
        <div className={styles.adminBody}>
            <section className={styles.formContainer}>
                <h1>Lista de Vídeos</h1>
                <table>
                    <tr>
                        <th>Dia</th>
                        <th>Café da manhã</th>
                        <th>Lanche</th>
                        <th>Almoço</th>
                        <th>Lanche da Tarde</th>
                        <th>Janta</th>
                        <th>Ações</th>
                    </tr>
                    <tbody>
                        {renderDietRows()}
                    </tbody>
                </table>
                <button>Atualizar</button>
            </section>
            <section className={styles.formContainer}>
                <h1>Lista de Dietas</h1>
                <table>
                    <tr>
                        <th>Dia</th>
                        <th>Normal</th>
                        <th>Alternado</th>
                    </tr>
                    <tbody>
                        {renderVideoRows()}
                    </tbody>
                </table>
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