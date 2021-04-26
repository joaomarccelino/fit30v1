import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD5zV3yNgvmojrtIo6n7FYQg4w4okHBHsg",
  authDomain: "fit30-f1f52.firebaseapp.com",
  projectId: "fit30-f1f52",
  storageBucket: "fit30-f1f52.appspot.com",
  messagingSenderId: "258528928318",
  appId: "1:258528928318:web:cfb9c429056eccb4ae276f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase }