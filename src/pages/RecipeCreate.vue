<template>
  <div class="formRecipe__wrapper">
    <form @submit.prevent="handleSubmitRecipe">
      <h2 class="form_recipe__title">Criar nova receita</h2>

      <div class="formRecipe__label">
        <label for="nome">Nome da receita</label>
        <input
          v-model="recipe.name"
          type="text"
          name="nome"
          id="nome"
          placeholder="Adicione o nome da receita"
          required
        />
      </div>

      <div class="formRecipe__label">
        <label for="descricao">Descrição</label>
        <input
          v-model="recipe.description"
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Fale um pouco sobre a receita"
          required
        />
      </div>

      <div class="formRecipe__label">
        <label for="descricao">Duração total em minutos</label> <br />
        <div class="q-pa-md">
          <q-slider v-model="recipe.duration" :min="0" :max="60" :step="5" label label-always />
        </div>
      </div>

      <div class="formRecipe__label">
        <label for="ingredientes">Ingredientes</label> <br />
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <input
            v-model="recipe.ingredients[index]"
            type="text"
            name="ingredientes"
            id="ingredientes"
            :placeholder="`Ingrediente ${index + 1}`"
            required
          />
          <button
            v-if="recipe.ingredients.length >= 2"
            type="button"
            @click="removeIngredient(index)"
          >
            remover
          </button>
        </div>
        <button type="button" @click="addIngredient">Adicionar Ingrediente</button>
      </div>

      <div class="formRecipe__label">
        <label for="modo_preparo">Modo de preparo</label>
        <input
          v-model="recipe.preparationMethod"
          type="text"
          name="preparo"
          id="preparo"
          placeholder="Descreva o modo de praparo"
          required
        />
      </div>

      <button type="submit" class="formRecipe__button">
        {{ editingId ? 'Atualizar' : 'Criar receita' }}
      </button>
    </form>
  </div>

  <q-btn
    @click="$router.replace('/')"
    class="fromRecipe__add"
    round
    color="pink-4"
    size="xl"
    icon="add"
  />
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const dataRecipes = ref([])
let editingId = ref(null)
const recipe = ref({
  name: '',
  description: '',
  duration: 30,
  ingredients: [''],
  preparationMethod: '',
})

const saveToLocalStorage = () => {
  localStorage.setItem('recipes', JSON.stringify(dataRecipes.value))
}

const addIngredient = () => {
  recipe.value.ingredients.push('')
}
const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1)
}

const createRecipe = () => {
  const recipeItem = {
    id: uuidv4(),
    name: recipe.value.name,
    description: recipe.value.description,
    duration: recipe.value.duration,
    ingredients: recipe.value.ingredients,
    preparationMethod: recipe.value.preparationMethod,
  }
  dataRecipes.value.push(recipeItem)
  saveToLocalStorage()
}
const updateRecipe = () => {
  dataRecipes.value = dataRecipes.value.map((recipeItem) =>
    recipeItem.id === editingId.value
      ? { ...recipeItem, ...recipe.value, ingredients: recipe.value.ingredients }
      : recipeItem,
  )
  saveToLocalStorage()
}

const handleSubmitRecipe = () => {
  if (validateRecipeForm()) {
    if (editingId.value) {
      updateRecipe()
      editingId.value = null
    } else {
      createRecipe()
    }

    resetRecipeForm()
  }
}

const validateRecipeForm = () => {
  if (
    recipe.value.name &&
    recipe.value.description &&
    recipe.value.ingredients.some((ingredint) => ingredint.trim()) &&
    recipe.value.preparationMethod
  ) {
    return true
  } else {
    return false
  }
}
const resetRecipeForm = () => {
  recipe.value = {
    name: '',
    description: '',
    duration: 30,
    ingredients: [''],
    preparationMethod: '',
  }
}
</script>
