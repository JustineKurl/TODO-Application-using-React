import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCCsMvWF_eEkzZPJcUG1YOJNTNxv9NDHlk",
    authDomain: "todo-app-f1c4a.firebaseapp.com",
    projectId: "todo-app-f1c4a",
    storageBucket: "todo-app-f1c4a.appspot.com",
    messagingSenderId: "60565986388",
    appId: "1:60565986388:web:0c7df7f301bfa4f52fa1c1",
    measurementId: "G-JZG5YRE7ML"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}