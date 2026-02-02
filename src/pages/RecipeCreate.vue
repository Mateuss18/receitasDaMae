<template>
  <div class="recipe-create">
    <RecipeForm
      title="Criar Receita"
      :recipe-values="recipe"
      mode="create"
      @submit="handleCreateRecipe"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRecipe } from '../services/recipesStorage'
import RecipeForm from 'src/components/RecipeForm.vue'

const router = useRouter()

const recipe = ref({
  name: '',
  description: '',
  duration: 30,
  ingredients: [''],
  preparationMethod: '',
})

const handleCreateRecipe = async (payload) => {
  await createRecipe(payload)
  router.replace('/')
}
</script>
