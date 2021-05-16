import { firebase } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';


type User = {
    name: string
}


export default function Home() {

    const [user, setUser] = useState({})

    const userRef = firebase.firestore().collection('users')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            if(authUser) {
                userRef.doc(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const userData = snapshot.data()
                        var {name, email} = userData
                        setUser(name)
                    })
            }
        })
    })
   
    




    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, firebase }) => {
                if (isSignedIn === true) {
                    return (
                        <div>
                            <h1>{`Bem vindo ${user}`}</h1>
                        </div>
                    )
                }
            }}
        </FirebaseAuthConsumer>
    )
}





