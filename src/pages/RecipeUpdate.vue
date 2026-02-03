<template>
  <div v-if="recipe">
    <RecipeForm title="Editar receita" :recipe-values="recipe" @submit="handleSubmitUpdate" />
  </div>
  <div v-else>Receita não existe</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { getRecipeById, updateRecipe } from '../services/recipesStorage'
import RecipeForm from 'src/components/RecipeForm.vue'

const route = useRoute()
const $q = useQuasar()

const recipe = ref(null)
const recipeToUpdateID = String(route.params.id)

const handleSubmitUpdate = async (updatedRecipe) => {
  await updateRecipe(recipeToUpdateID, updatedRecipe)
  $q.notify({
    type: 'positive',
    message: 'Receita editada com sucesso',
  })
}

onMounted(async () => {
  recipe.value = await getRecipeById(recipeToUpdateID)
})
</script>
