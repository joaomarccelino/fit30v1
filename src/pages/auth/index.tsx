import styles from './app.module.scss'
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button"
import { useState } from 'react'

import { firebase } from '../../data/firebase'
import If from '../../common/If'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [stageNew, setStageNew] = useState(false)

    function newUser() {
        setStageNew(!stageNew)
    }

    async function userLogin() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Deu certo parabéns!")
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <div className={styles.authBody}>
            <div className={styles.sideAuth}>

            </div>
            <div className={styles.authArea}>
                <div className={styles.titleContainer}>
                    <h2>{stageNew ? 'Cadastro': 'Insira seus dados'}</h2>
                </div>
                <If test={stageNew}>
                    <input 
                        name="name"
                        type="text" 
                        placeholder="Nome" 
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        />
                </If>
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

                <If test={stageNew}>
                    <input
                        name="confirmPassword"
                        type="confirmPassword"
                        placeholder="Confirme a senha"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </If>

                <button type="button" onClick={userLogin}>
                    Login
                    </button>

                <a href="#" onClick={newUser}>{stageNew ? 'Já tem cadastro?' : 'Ainda não é cadastrado(a)?'}</a>

            </div>
        </div>
    )
}