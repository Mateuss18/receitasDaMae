import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// --------------------------------------------------------
// SUBSTITUA PELO SEU OBJETO DE CONFIGURAÇÃO DO FIREBASE
// --------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDUP5ZFjyl6n_ZMVVVboG6IZrayy1wpP4E",
  authDomain: "receitas-da-mae-ea2ea.firebaseapp.com",
  projectId: "receitas-da-mae-ea2ea",
  storageBucket: "receitas-da-mae-ea2ea.firebasestorage.app",
  messagingSenderId: "979029958415",
  appId: "1:979029958415:web:f05f1a71bc13fe4d13e87a"
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Inicializa os serviços
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }
