<template>
  <div class="home-page" v-if="dataRecipes.length > 0">
    <h2>Receitas</h2>

    <div class="receitas-column">
      <RecipeCard
        v-for="recipeItem in dataRecipes"
        :key="recipeItem.id"
        :recipe="recipeItem"
        @click="openRecipe(recipeItem.id)"
      />
    </div>

    <q-btn
      @click="$router.push('/create-recipe')"
      class="fromRecipe__add"
      round
      color="pink-4"
      size="xl"
      icon="add"
    />
  </div>
  <div v-else class="flex flex-center q-pa-md">
    <div class="text-center">
      <h3 class="q-mb-md">Nenhuma receita encontrada</h3>
      <q-btn
        @click="$router.push('/create-recipe')"
        color="pink-4"
        label="Criar primeira receita"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import RecipeCard from 'src/components/RecipeCard.vue'
import { getAll } from '../services/recipesStorage'

const router = useRouter()
const dataRecipes = ref([])

const openRecipe = (id) => {
  router.push({ name: 'detail', params: { id } })
}

onMounted(() => {
  dataRecipes.value = getAll()
})
</script>

<style scoped>
.receitas-column {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 0 20px;
  padding-bottom: 100px; /* Espaço para o botão flutuante não cobrir o último card */
}
</style>
