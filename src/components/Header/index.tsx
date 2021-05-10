import { useState } from 'react'

import { HiMenu } from 'react-icons/hi'
import { CgCloseR } from 'react-icons/cg'

import styles from './styles.module.scss'

export function Header() {

    const [menuActive, setMenuActive] = useState(false)

    function toggleMenu(){
        setMenuActive(!menuActive)
    }

    function teste() {
        console.log("Testando 123")
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
                    <div className={menuActive? styles.menuSectionOn: styles.menuSection}>
                        <div className={styles.menuToggle}>
                            <a href="javascript:;"
                                onClick={toggleMenu}>
                                {!menuActive ? <HiMenu /> : <CgCloseR />}                            
                            </a>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
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
                                    <a href="/auth">[Área do aluno]</a>
                                </li>
                                <li>
                                    <a href="/">
                                        <button className={styles.button}>Registre-se</button>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
        </header>
    )
}