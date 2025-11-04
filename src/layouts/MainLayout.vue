<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <q-btn
      @click="$router.replace('/create-recipe')"
      class="fromRecipe__add"
      round
      color="pink-4"
      size="xl"
      icon="add"
    />

    <div class="receitas" v-if="dataRecipes.length > 0">
      <h2>Receitas</h2>

      <div v-for="recipeItem in dataRecipes" :key="recipeItem.id" class="receita">
        <RecipeCard :recipe="recipeItem" @click="openRecipe(recipeItem.id)" />
        <button @click="deleteRecipe(recipeItem.id)">Excluir</button>
        <button @click="editRecipe(recipeItem.id)">Editar</button>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MainHeader from 'src/components/MainHeader.vue'
import RecipeCard from 'src/components/RecipeCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataRecipes = ref([])

const saveToLocalStorage = () => {
  localStorage.setItem('recipes', JSON.stringify(dataRecipes.value))
}
const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('recipes')) || []
}

const deleteRecipe = (id) => {
  dataRecipes.value = dataRecipes.value.filter((recipeItem) => recipeItem.id !== id)
  saveToLocalStorage()
}
const editRecipe = (id) => {
  router.push({ name: 'edit', params: { id } })
}

const openRecipe = (id) => {
  router.push({ name: 'detail', params: { id } })
}

onMounted(() => {
  dataRecipes.value = loadFromLocalStorage()
})
</script>

<style lang="scss">
@import './mainLayout.scss';
</style>
