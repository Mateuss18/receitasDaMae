<template>
  <div class="recipe-create">
    <RecipeForm
      title="Criar receita"
      :recipe-values="recipe"
      mode="create"
      @submit="handleSubmitCreate"
    />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { getAll, saveAll } from '../services/recipesStorage'
import RecipeForm from 'src/components/RecipeForm.vue'

const router = useRouter()

const dataRecipes = ref([])
const recipe = ref({
  name: '',
  description: '',
  duration: 30,
  ingredients: [''],
  preparationMethod: '',
})

onMounted(() => {
  dataRecipes.value = getAll()
})

const handleSubmitCreate = (payload) => {
  const recipeItem = { id: uuidv4(), ...payload }
  dataRecipes.value.push(recipeItem)
  saveAll(dataRecipes.value)
  router.replace('/')
}
</script>
