import styles from './app.module.scss'
import { useState } from 'react'

import { useRouter } from 'next/router'
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

    const router = useRouter()

    async function userLogin() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Seja bem vindo(a)!")
                router.push('/home')
            }).catch((error) => {
                console.log(error)
            });
    }

    async function useRegister() {
        if (password === confirmPassword) {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user?.uid
                    const data = {
                        id: uid,
                        name: name,
                    }
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .set(data)
                        .then(() => {
                            alert("Cadastrado com sucesso!")
                        })
                        .catch((error) => {
                            alert(error)
                        })
                })
                .catch((error) => {
                    alert(error)
                })
        } else {
            alert("Senhas não coincidem")
            return
        }

    }


    return (
        <div className={styles.authBody}>
            <aside className={styles.leftAuth}>
                <img src="/logo.svg" alt="FIT30" />
            </aside>
            <main>
                <div className={styles.authArea}>
                    <div className={styles.titleContainer}>
                        <h2>{stageNew ? 'Cadastro' : 'Insira seus dados'}</h2>
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
                            type="password"
                            placeholder="Confirme a senha"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </If>

                    <button type="button" onClick={stageNew ? useRegister : userLogin}>
                        {stageNew ? 'Cadastrar' : 'Entrar'}
                    </button>
                    <a href="#" onClick={newUser}>{stageNew ? 'Já tem cadastro?' : 'Ainda não é cadastrado(a)?'}</a>
                </div>
            </main>
        </div>
    )
}