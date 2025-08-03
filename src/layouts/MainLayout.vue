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
        <p>id: {{ recipeItem.id }}</p>
        <br />
        <p>Nome: {{ recipeItem.name }}</p>
        <br />
        <p>Descrição: {{ recipeItem.description }}</p>
        <br />
        <p>Duração: {{ recipeItem.duration }} minutos</p>
        <br />
        <p>Ingredientes: {{ recipeItem.ingredients.join(', ') }}</p>
        <br />
        <p>Modo de preparo: {{ recipeItem.preparationMethod }}</p>

        <button @click="deleteRecipe(recipeItem.id)">Excluir</button>
        <button @click="startEdit(recipeItem)">Editar</button>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MainHeader from 'src/components/MainHeader.vue'

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
const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('recipes')) || []
}

const deleteRecipe = (id) => {
  dataRecipes.value = dataRecipes.value.filter((recipeItem) => recipeItem.id !== id)
  saveToLocalStorage()
}
const startEdit = (recipeItem) => {
  recipe.value = {
    ...recipeItem,
    ingredients: recipeItem.ingredients.length ? [...recipeItem.ingredients] : [''],
  }
  editingId.value = recipeItem.id
}

onMounted(() => {
  dataRecipes.value = loadFromLocalStorage()
})
</script>

<style lang="scss">
@import './mainLayout.scss';
</style>
