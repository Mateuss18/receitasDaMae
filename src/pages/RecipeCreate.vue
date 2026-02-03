<template>
  <div class="recipe-create">
    <RecipeForm
      title="Criar Receita"
      :recipe-values="recipe"
      @submit="handleCreateRecipe"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { createRecipe } from '../services/recipesStorage'
import RecipeForm from 'src/components/RecipeForm.vue'

const router = useRouter()
const $q = useQuasar()

const recipe = ref({
  name: '',
  description: '',
  duration: 30,
  ingredients: [''],
  preparationMethod: '',
})

const handleCreateRecipe = async (payload) => {
  await createRecipe(payload)
  $q.notify({
    type: 'positive',
    message: 'Receita criada com sucesso',
  })
  router.replace('/')
}
</script>
