import styles from './app.module.scss'

import { GetStaticProps } from "next";
import { firebase, firebaseConfig } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"

import { IoAddCircleOutline, IoCaretBack } from 'react-icons/io5'
import { FaTrash } from 'react-icons/fa'

import { useEffect, useState } from 'react';

type Diet = {
    key: string;
    title: string;
    breakfast: string;
    morningSnack: string;
    lunch: string;
    afterSnack: string;
    dinner: string;
}

type Video = {
    key: string;
    title: string;
    url1: string;
    url2: string;
}

type AdminProps = {
    dietList: Diet[];
    videoList: Video[];
}



export default function Admin({ dietList, videoList }: AdminProps) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [diet, setDiet] = useState([])
    const [dietId, setDietId] = useState('')
    const [title, setTitle] = useState('')
    const [breakfast, setBreakfast] = useState('')
    const [morningSnack, setMorningSnack] = useState('')
    const [lunch, setLunch] = useState('')
    const [afterSnack, setAfterSnack] = useState('')
    const [dinner, setDinner] = useState('')
    const [addDiet, setAddDiet] = useState(false)

    const [videoId, setVideoId] = useState('')
    const [vTitle, setVTitle] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [addVideo, setAddVideo] = useState(false)

    const dietRef = firebase.firestore().collection('diet')
    const videoRef = firebase.firestore().collection('videos')

    const newDiet = {
        title: title,
        breakfast: breakfast,
        morningSnack: morningSnack,
        lunch: lunch,
        afterSnack: afterSnack,
        dinner: dinner
    }

    const newVideo = {
        title: vTitle,
        url1: url1,
        url2: url2
    }

    async function admLogin() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Seja bem vindo(a)!")
            }).catch((error) => {
                console.log(error)
            });
    }

    async function sendDiet() {
        await dietRef.add(newDiet).then(() => {
            alert("Adicionado com sucesso!")
            setTitle('')
            setBreakfast('')
            setMorningSnack('')
            setLunch('')
            setAfterSnack('')
            setDinner('')
            window.location.reload()
        }
        ).catch(e => console.log(e))
    }

    async function sendVideo() {
        await videoRef.add(newVideo).then(() => {
            alert("Adicionado com sucesso!")
            setVTitle('')
            setUrl1('')
            setUrl2('')
            window.location.reload()
        }).catch(e => console.log(e))
    }

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
            alert("Atualizado com sucesso!")
        })
    }

    async function updateVideo(id) {
        firebase.firestore().collection('videos').doc(id).update(
            {
                title: vTitle,
                url1: url1,
                url2: url2
            }
        ).then(() => {
            alert("Atualizado com sucesso!")
        })
    }

    async function deleteDiet(id) {
        firebase.firestore().collection('diet').doc(id).delete()
            .then(() => { alert("Excluído com sucesso!") })
    }

    async function deleteVideo(id) {
        firebase.firestore().collection('videos').doc(id).delete()
            .then(() => { alert("Excluído com sucesso!") })
    }

    function handleAddDiet() {
        setAddDiet(!addDiet)
        if (!addDiet) {
            setTitle('')
            setBreakfast('')
            setMorningSnack('')
            setLunch('')
            setAfterSnack('')
            setDinner('')
        }
    }

    function handleAddVideo() {
        setAddVideo(!addVideo)
        if (!addVideo) {
            setVTitle('')
            setUrl1('')
            setUrl2('')
        }
    }


    function selectDiet(title) {
        dietList.filter(diet => diet.title === title).map(filterDiet => {
            setDietId(filterDiet.key)
            setTitle(filterDiet.title)
            setBreakfast(filterDiet.breakfast)
            setMorningSnack(filterDiet.morningSnack)
            setLunch(filterDiet.lunch)
            setAfterSnack(filterDiet.afterSnack)
            setDinner(filterDiet.dinner)
        })

    }

    function selectVideo(title) {
        videoList.filter(video => video.title === title).map(filterVideo => {
            setVideoId(title)
            setVTitle(filterVideo.title)
            setUrl1(filterVideo.url1)
            setUrl2(filterVideo.url2)
        })
    }

    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, firebase }) => {
                if (isSignedIn === true) {
                    return (
                        <div className={styles.adminBody}>
                            <section className={styles.formContainer}>
                                <h1>Lista de Dieta</h1>
                                <h3>{!addDiet ? "Atualizar Dieta" : "Cadastrar Dieta"}</h3>
                                <form action="">
                                    {!addDiet ?
                                        <select name="" onChange={e => selectDiet(e.target.value)}>
                                            <option hidden disabled selected>--selecione uma data--</option>
                                            {dietList.map(diet => {
                                                return (
                                                    <option key={diet.key} value={diet.title}>{diet.title}</option>
                                                )
                                            })}
                                        </select>
                                        :
                                        <>
                                            <label>Título: </label>
                                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                                        </>
                                    }
                                    <label>Café da manhã</label>
                                    <input type="text" value={breakfast} onChange={e => setBreakfast(e.target.value)} />
                                    <label>Lanche da manhã</label>
                                    <input type="text" value={morningSnack} onChange={e => setMorningSnack(e.target.value)} />
                                    <label>Almoço</label>
                                    <input type="text" value={lunch} onChange={e => setLunch(e.target.value)} />
                                    <label>Lanche da tarde</label>
                                    <input type="text" value={afterSnack} onChange={e => setAfterSnack(e.target.value)} />
                                    <label>Janta</label>
                                    <input type="text" value={dinner} onChange={e => setDinner(e.target.value)} />
                                </form>
                                <div className={styles.buttons}>
                                    {!addDiet ?
                                        <button type="button" onClick={() => updateDiet(dietId)}>Atualizar</button> :
                                        <button type="button" onClick={() => sendDiet()}>Enviar</button>
                                    }
                                    <button type="button" onClick={() => handleAddDiet()}>
                                        {!addDiet ?
                                            <div className={styles.add}>
                                                <IoAddCircleOutline /> Adicionar
                            </div> :
                                            <div>
                                                <IoCaretBack /> Voltar
                            </div>
                                        }
                                    </button>
                                    {!addDiet ?
                                        <button type="button" onClick={() => deleteDiet(dietId)} disabled={!dietId}>
                                            <div className={styles.delete}>
                                                <FaTrash />
                                Excluir
                            </div>
                                        </button> :
                                        <></>
                                    }
                                </div>
                            </section>
                            <section className={styles.formContainer}>
                                <h1>Lista de Vídeos</h1>
                                <h3>{!addVideo ? "Atualizar Vídeos" : "Cadastrar Vídeos"}</h3>
                                <form action="">
                                    {!addVideo ?
                                        <select name="" onChange={e => selectVideo(e.target.value)} >
                                            <option hidden disabled selected>--selecione uma data--</option>
                                            {videoList.map(video => {
                                                return (
                                                    <option value={video.title}>{video.title}</option>
                                                )
                                            })}
                                        </select> :
                                        <>
                                            <label>Título: </label>
                                            <input type="text" value={vTitle} onChange={e => setVTitle(e.target.value)} />
                                        </>}
                                    <label>URL Vídeo Normal</label>
                                    <input type="text" value={url1} onChange={e => setUrl1(e.target.value)} />
                                    <label>URL Vídeo Adaptado</label>
                                    <input type="text" value={url2} onChange={e => setUrl2(e.target.value)} />
                                </form>
                                <div className={styles.buttons}>
                                    {!addVideo ?
                                        <button type="button" onClick={() => updateVideo(videoId)}>Atualizar</button> :
                                        <button type="button" onClick={() => sendVideo()}>Enviar</button>
                                    }
                                    <button type="button" onClick={() => handleAddVideo()}>
                                        {!addVideo ?
                                            <div className={styles.add}>
                                                <IoAddCircleOutline /> Adicionar
                                            </div> :
                                            <div>
                                                <IoCaretBack /> Voltar
                                            </div>
                                        }
                                    </button>
                                    {!addVideo ?
                                        <button type="button" onClick={() => deleteVideo(videoId)} disabled={!videoId}>
                                            <div className={styles.delete}>
                                                <FaTrash />
                                                Excluir
                                            </div>
                                        </button> :
                                        <></>
                                    }
                                </div>
                            </section>
                        </div>
                    )
                } else {
                    return (
                        <div className={styles.authBody}>
                            <div className={styles.authArea}>
                                <div className={styles.titleContainer}>
                                    <h2>Insira seus dados</h2>
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <button type="button" onClick={admLogin}>
                                    Entrar
                                </button>
                            </div>
                        </div>
                    )
                }
            }
            }
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
        dietList.push({ ...doc.data(), key: doc.id });
    });

    const videoList = []

    const video = await firebase.firestore().collection('videos').orderBy('title').get()
    if (video.empty) {
        console.log('No matching documents.');
        return;
    }
    video.forEach(doc => {
        videoList.push({ ...doc.data(), key: doc.id })
    });

    return {
        props: {
            dietList,
            videoList
        },
        revalidate: 60 * 60 * 8, //24 hours
    }

}