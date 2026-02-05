<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2 q-mb-md">Receitas da Mãe</div>
      <div class="text-subtitle1 q-mb-xl">Guarde suas receitas com carinho</div>

      <q-btn
        class="q-mt-md"
        color="white"
        text-color="primary"
        icon="img:https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/640px-Google_Favicon_2025.svg.png"
        label="Entrar com Google"
        @click="loginWithGoogle"
        size="lg"
      />
    </div>
  </div>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from 'src/boot/firebase'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    const user = credential.user

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const identifier = user.displayName || user.email

    const userData = {
      uid: user.uid,
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      photoURL: user.photoURL ?? '',
      identifier,
      lastLoginAt: serverTimestamp(),
    }

    if (!userSnap.exists()) {
      userData.createdAt = serverTimestamp()
    }

    await setDoc(userRef, userData, { merge: true })

    $q.notify({
      type: 'positive',
      message: 'Bem-vindo(a)!',
    })

    router.push('/')
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao entrar. Tente novamente.',
    })
  }
}
</script>
