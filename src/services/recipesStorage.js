import { db, auth } from 'src/boot/firebase'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query
} from 'firebase/firestore'

const getUserRecipesCollection = () => {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')
  return collection(db, 'users', user.uid, 'recipes')
}

export async function getAll() {
  try {
    const q = query(getUserRecipesCollection())
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
    const colRef = getUserRecipesCollection()
    const docRef = await addDoc(colRef, recipe)
    return docRef.id
  } catch (error) {
    console.error('Error ao criar receita:'.error)
    throw error
  }
}

export async function updateRecipe(id, recipe) {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado')

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
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenciado')

    const docRef = doc(db, 'users', user.uid, 'recipes', id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Erro ao deletar receita:', error)
    throw error
  }
}

export function saveAll() {
  console.warn('SaveAll foi depreciado')
  return false
}
