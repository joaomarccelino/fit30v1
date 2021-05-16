import { useState } from 'react'
import styles from './styles.module.scss'

import ReactPlayer from "react-player"
import If from '../../common/If'


export function VideoCard(props) {
    const [tab1Active, setTab1Active] = useState(true)
    const [tab2Active, setTab2Active] = useState(false)

    function changeTab() {
        setTab1Active(true)
        setTab2Active(false)
    }

    function changeTab2() {
        setTab2Active(true)
        setTab1Active(false)
    }


    return (
        <div className={styles.cardContainer}>
            <div className={styles.titleContainer}>
                <h1>{props.title}</h1>
            </div>
            <div className={styles.tabs}>
                <a href={void(0)}
                    onClick={() => changeTab()} className={tab1Active ? styles.activeTab : styles.tab}>
                    <strong>Normal</strong>
                </a>
                <a href={void(0)}
                    onClick={() => changeTab2()} className={tab2Active ? styles.activeTab : styles.tab}>
                    <strong>Adaptado</strong>
                </a>
            </div>
            <div className={styles.content}>
                <If test={tab1Active}>
                    <ReactPlayer
                        url={props.regularVideo}
                        light={true}
                    />
                </If>
                <If test={tab2Active}>
                    <ReactPlayer
                        url={props.alternativeVideo}
                        light={true}
                    />
                </If>
            </div>
        </div>
    )
}

