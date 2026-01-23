<template>
  <div v-if="selectedRecipe">
    <RecipeForm
      title="Editar receita"
      :recipe-values="selectedRecipe"
      mode="update"
      @submit="handleSubmitUpdate"
    />
  </div>
  <div v-else>Receita não existe</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { getAll, saveAll } from '../services/recipesStorage'

import RecipeForm from 'src/components/RecipeForm.vue'

const dataRecipes = ref([])
const router = useRouter()
const route = useRoute()
const recipeToUpdateID = String(route.params.id)

onMounted(() => {
  dataRecipes.value = getAll()
})

const selectedRecipe = computed(() => {
  return dataRecipes.value.find((recipeItem) => recipeItem.id === recipeToUpdateID)
})

function handleSubmitUpdate(payload) {
  const idToUpdateIndex = dataRecipes.value.findIndex(
    (recipeItem) => recipeItem.id === recipeToUpdateID,
  )
  dataRecipes.value[idToUpdateIndex] = { id: recipeToUpdateID, ...payload }
  saveAll(dataRecipes.value)

  router.replace('/')
}
</script>
