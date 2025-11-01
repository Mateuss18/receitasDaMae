<template>
  <div v-if="selectedRecipe">
    <pre>
      {{ selectedRecipe }}
        ola mundo
    </pre>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAll } from '../services/recipesStorage'

const dataRecipes = ref([])
// eslint-disable-next-line no-unused-vars
const router = useRouter()
const route = useRoute()
const recipeToEditID = String(route.params.id)

onMounted(() => {
  dataRecipes.value = getAll()
})

const selectedRecipe = computed(() => {
  return dataRecipes.value.find((recipeItem) => recipeItem.id === recipeToEditID)
})
</script>
