import { db, auth } from 'src/boot/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query
} from 'firebase/firestore'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

const getCurrentUser = () => {
  const user = auth.currentUser
  if (user) return Promise.resolve(user)

  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        unsubscribe()
        if (!authUser) {
          reject(new Error('Usuário não autenticado'))
          return
        }
        resolve(authUser)
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

const compressImage = async (file, { maxWidth = 600, maxSizeMB = 1 } = {}) => {
  const imageBitmap = await createImageBitmap(file)

  const ratio = imageBitmap.width > maxWidth ? maxWidth / imageBitmap.width : 1
  const width = Math.round(imageBitmap.width * ratio)
  const height = Math.round(imageBitmap.height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(imageBitmap, 0, 0, width, height)

  let quality = 0.8
  let blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))

  const maxBytes = maxSizeMB * 1024 * 1024

  while (blob && blob.size > maxBytes && quality > 0.4) {
    quality -= 0.1
    blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  }

  if (!blob) throw new Error('Falha ao comprimir imagem')

  return new File([blob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' })
}

const uploadRecipeImage = async (userId, file) => {
  const storage = getStorage()
  const fileName = `${crypto.randomUUID()}.webp`
  const path = `users/${userId}/recipes/${fileName}`
  const imgRef = storageRef(storage, path)

  await uploadBytes(imgRef, file)
  return await getDownloadURL(imgRef)
}

const deleteRecipeImageByUrl = async (imageUrl) => {
  const storage = getStorage()
  const imgRef = storageRef(storage, imageUrl)
  await deleteObject(imgRef)
}

const getUserRecipesCollection = async () => {
  const user = await getCurrentUser()

  return collection(db, 'users', user.uid, 'recipes')
}

export async function getAll() {
  try {
    const colRef = await getUserRecipesCollection()
    const q = query(colRef)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erro ao buscar receitas:', error)
    return []
  }
}

export async function createRecipe(recipe) {
  try {
    const colRef = await getUserRecipesCollection()
    const user = await getCurrentUser()

    const { imageFile, ...recipeData } = recipe

    if (imageFile) {
      const compressed = await compressImage(imageFile, { maxWidth: 600, maxSizeMB: 1 })
      const imageUrl = await uploadRecipeImage(user.uid, compressed)
      recipeData.imageUrl = imageUrl
    }

    const docRef = await addDoc(colRef, recipeData)
    return docRef.id
  } catch (error) {
    console.error('Error ao criar receita:', error)
    throw error
  }
}

export async function getRecipeById(id) {
  try {
    const user = await getCurrentUser()
    const docRef = doc(db, 'users', user.uid, 'recipes', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    const data = docSnap.data()
    const recipe = { id: docSnap.id, ...data }

    return recipe
  } catch (error) {
    console.error('Erro ao carregar receita:', error)
    throw error
  }
}

export async function updateRecipe(id, recipe) {
  try {
    const user = await getCurrentUser()
    const docRef = doc(db, 'users', user.uid, 'recipes', id)

    // eslint-disable-next-line no-unused-vars
    const { id: _, imageFile, ...recipeData } = recipe

    if (imageFile) {
      if (recipeData.imageUrl) {
        await deleteRecipeImageByUrl(recipeData.imageUrl)
      }
      const compressed = await compressImage(imageFile, { maxWidth: 600, maxSizeMB: 1 })
      const imageUrl = await uploadRecipeImage(user.uid, compressed)
      recipeData.imageUrl = imageUrl
    }

    await updateDoc(docRef, recipeData)
    return true
  } catch (error) {
    console.error('Erro ao atualizar receita:', error)
    throw error
  }
}

export async function deleteRecipe(id) {
  try {
    const user = await getCurrentUser()
    const docRef = doc(db, 'users', user.uid, 'recipes', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      if (data.imageUrl) await deleteRecipeImageByUrl(data.imageUrl)
    }
    await deleteDoc(docRef)

    return true
  } catch (error) {
    console.error('Erro ao deletar receita:', error)
    throw error
  }
}
