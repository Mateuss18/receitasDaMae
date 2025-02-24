<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <div class="criarReceita">
      <form @submit.prevent="addNewRecipe">
        <h2>Criar nova receita</h2>

        <label for="nome">Nome da receita</label> <br />
        <input
          v-model="recipeName"
          type="text"
          name="nome"
          id="nome"
          placeholder="Adicione o nome da receita"
          required
        />

        <br />

        <label for="descricao">Descrição</label> <br />
        <input
          v-model="recipeDescription"
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Fale um pouco sobre a receita"
          required
        />
        <br />

        <label for="ingredientes">Ingredientes</label> <br />
        <input
          v-model="recipeIngredients"
          type="text"
          name="ingredientes"
          id="ingredientes"
          placeholder="Insira os ingredientes"
          required
        />
        <br />
        <br />
        <button type="submit">Adicionar receita</button>
      </form>
    </div>

    <div class="receitas" v-if="dataRecipes.length > 0">
      <h2>Receitas</h2>
      <div v-for="recipeItem in dataRecipes" :key="recipeItem.id" class="receita">
        <p>Nome: {{ recipeItem.name }}</p>
        <br />
        <p>Descrição: {{ recipeItem.description }}</p>
        <br />
        <p>Ingredientes: {{ recipeItem.ingredients }}</p>

        <button @click="deleteRecipe(recipeItem.id)">Excluir</button>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import MainHeader from 'src/components/MainHeader.vue'
import { onMounted, ref, watch } from 'vue'

let recipeName = ref(null)
let recipeDescription = ref(null)
let recipeIngredients = ref(null)
let dataRecipes = ref([])

function validatedInputs() {
  if (recipeName.value !== '' || recipeDescription.value !== '' || recipeIngredients.value !== '') {
    return true
  } else {
    return false
  }
}

function addNewRecipe() {
  if (validatedInputs) {
    dataRecipes.value.push({
      id: dataRecipes.value.length + 1,
      name: recipeName.value,
      description: recipeDescription.value,
      ingredients: recipeIngredients.value,
    })

    recipeName.value = ''
    recipeDescription.value = ''
    recipeIngredients.value = ''
  }
}

function deleteRecipe(id) {
  dataRecipes.value = dataRecipes.value.filter((recipe) => recipe.id !== id)
}

watch(
  dataRecipes,
  (newRecipe) => {
    localStorage.setItem('Receitas', JSON.stringify(newRecipe))
  },
  { deep: true },
)

onMounted(() => {
  const dataRecipeJSON = localStorage.getItem('Receitas')

  if (dataRecipeJSON) {
    dataRecipes.value = JSON.parse(dataRecipeJSON)
  }
})
</script>

<style lang="scss">
header {
  background-color: $primary;
}
header h1 {
  font-size: 24px;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}
h2 {
  font-size: 22px;
  line-height: normal;
  padding: 20px 0;
  margin: 0;
}
.receitas {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}
.receita {
  padding: 10px;
  background-color: #000000;
  color: #fff;
}
.receita p {
  margin: 0;
}
</style>
