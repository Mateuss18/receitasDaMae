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
    const docRef = await addDoc(colRef, recipe)

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
    const { id: _, ...recipeData } = recipe
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
    await deleteDoc(docRef)

    return true
  } catch (error) {
    console.error('Erro ao deletar receita:', error)
    throw error
  }
}
