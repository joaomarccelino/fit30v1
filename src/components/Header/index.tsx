import { useState } from 'react'

import { HiMenu } from 'react-icons/hi'
import { CgCloseR } from 'react-icons/cg'

import { firebase, firebaseConfig } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth"

import styles from './styles.module.scss'

export function Header() {

    const [menuActive, setMenuActive] = useState(false)

    function toggleMenu() {
        setMenuActive(!menuActive)
    }

    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <a href="/">
                        <img src="/logo.svg" alt="FIT30" />
                    </a>
                </div>
                <div>
                    <div className={menuActive ? styles.menuSectionOn : styles.menuSection}>
                        <div className={styles.menuToggle}>
                            <a href="#"
                                onClick={toggleMenu}>
                                {!menuActive ? <HiMenu /> : <CgCloseR />}
                            </a>
                        </div>
                        <nav>
                            <ul>

                                <FirebaseAuthConsumer>
                                    {({ isSignedIn, firebase }) => {
                                        if (isSignedIn === true) {
                                            return (
                                                <>
                                                    <li>
                                                        <a href="/home">Home</a>
                                                    </li>                                                    
                                                    <li>
                                                        <a href="/dieta">Dieta</a>
                                                    </li>
                                                    <li>
                                                        <a href="/exercicios">Exercicios</a>
                                                    </li>
                                                    <li>
                                                        <a href="/">Sobre</a>
                                                    </li>
                                                    <li>
                                                        <a href="/auth">
                                                            <button className={styles.exitButton}
                                                                onClick={() => {
                                                                    firebase
                                                                        .app()
                                                                        .auth()
                                                                        .signOut();
                                                                }}>Sair
                                                            </button>
                                                        </a>
                                                    </li>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <li>
                                                    <a href="/auth">
                                                        <button className={styles.authButton}>Login/Cadastro</button>
                                                    </a>
                                                </li>)
                                        }
                                    }
                                    }
                                </FirebaseAuthConsumer>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
        </header>
    )
}