<template>
  <div class="recipe-detail" v-if="selectedRecipe">
    <p>id: {{ selectedRecipe.id }}</p>
    <br />
    <p>Nome: {{ selectedRecipe.name }}</p>
    <br />
    <p>Descrição: {{ selectedRecipe.description }}</p>
    <br />
    <p>Duração: {{ selectedRecipe.duration }} minutos</p>
    <br />
    <p>Ingredientes: {{ selectedRecipe.ingredients.join(', ') }}</p>
    <br />
    <p>Modo de preparo: {{ selectedRecipe.preparationMethod }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAll } from '../services/recipesStorage'

const dataRecipes = ref([])
const route = useRoute()

const recipeId = String(route.params.id)

onMounted(() => {
  dataRecipes.value = getAll()
})

const selectedRecipe = computed(() => {
  return dataRecipes.value.find((recipeItem) => recipeItem.id === recipeId)
})
</script>
