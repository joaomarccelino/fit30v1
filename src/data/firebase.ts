import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, databaseURL } from './dbConst'

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  databaseURL: databaseURL
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase, firebaseConfig }