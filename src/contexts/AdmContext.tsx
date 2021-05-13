import { createContext, ReactNode, useContext, useState } from 'react';
import { firebase } from '../data/firebase'

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

type AdmContextData = {
    dietList: Diet[];
    videoList: Video[];
    newDiet: {};
    newVideo: {};
    sendDiet: () => void;
    sendVideo: () => void;
    updateDiet: (id: string) => void;
    updateVideo: (id: string) => void;
    handleAddDiet: () => void;
    handleAddVideo: () => void;
    selectDiet: (title: string) => void;
    selectVideo: (title: string) => void;
}

export const AdmContext = createContext({} as AdmContextData);

type AdmContextProviderProps = {
    children: ReactNode;
}

export default function AdmContextProvider({ children }: AdmContextProviderProps) {
    const [videoList, setVideoList] = useState([]);
    const [dietList, setDietList] = useState([]);
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

    async function sendDiet() {
        await dietRef.add(newDiet).then(() => {
            alert("Adicionado com sucesso!")
            setTitle('')
            setBreakfast('')
            setMorningSnack('')
            setLunch('')
            setAfterSnack('')
            setDinner('')
        }
        ).catch(e => console.log(e))
    }

    async function sendVideo() {
        await videoRef.add(newVideo).then(() => {
            alert("Adicionado com sucesso!")
            setVTitle('')
            setUrl1('')
            setUrl2('')
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

    function handleAddDiet() {
        setAddDiet(!addDiet)
    }

    function handleAddVideo() {
        setAddVideo(!addVideo)
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
        <AdmContext.Provider
            value={{
                dietList,
                videoList,
                newDiet,
                newVideo,
                sendDiet,
                sendVideo,
                updateDiet,
                updateVideo,
                handleAddDiet,
                handleAddVideo,
                selectDiet,
                selectVideo,
            }}>
            {children}
        </AdmContext.Provider>
    )
}