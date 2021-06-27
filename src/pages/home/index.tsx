import { firebase } from '../../data/firebase'
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';


type User = {
    name?: string | undefined;
    email?: string | undefined;
}


export default function Home() {

    const [user, setUser] = useState<User>({})

    const userRef = firebase.firestore().collection('users')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authUser => {
            if(authUser) {
                userRef.doc(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const userData = snapshot.data() as User
                        var {name, email} = userData
                        setUser({name})
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
                            <h1>{`Bem vindo ${user.name}`}</h1>
                        </div>
                    )
                }
            }}
        </FirebaseAuthConsumer>
    )
}





