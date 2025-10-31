const RECIPES_KEY = 'recipes'

export function getAll() {
  const recipesData = localStorage.getItem(RECIPES_KEY)
  if (!recipesData) return []

  try {
    const recipesDataParsed = JSON.parse(recipesData)
    return Array.isArray(recipesDataParsed) ? recipesDataParsed : []
  }
  catch (error) {
    console.error('Error trying to read recipes from local storage: ', error)
    return []
  }
}

export function saveAll(recipes) {
  if (!Array.isArray(recipes)) return false

  try {
    localStorage.setItem('recipes', JSON.stringify(recipes))

    return true
  }
  catch (error) {
    console.error('Error trying to save recipes on local storage: ', error)
    return false
  }
}
