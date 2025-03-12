<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <div class="formRecipe__wrapper">
      <form @submit.prevent="createRecipe">
        <h2>Criar nova receita</h2>

        <div class="formRecipe__name formRecipe__label">
          <label for="nome">Nome da receita</label> <br />
          <input
            v-model="recipeName"
            type="text"
            name="nome"
            id="nome"
            placeholder="Adicione o nome da receita"
            required
          />
        </div>

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

        <div class="duracao">
          <label for="descricao">Duração</label> <br />
          <div class="q-pa-md">
            <q-slider v-model="recipeDuration" :min="0" :max="60" :step="5" label label-always />
          </div>
        </div>

        <br />

        <div class="temperatura">
          <label for="descricao">Temperatura</label> <br />

          <div class="row items-center">
            <q-btn
              round
              icon="remove"
              @click="decrementTemperature"
              v-touch-repeat:0:150.mouse.enter.space="decrementTemperature"
            />

            <q-input
              v-model="recipeTemperature"
              type="number"
              class="q-mx-sm"
              :min="0"
              style="width: 100px"
            >
              <template #append>
                <q-icon
                  :name="recipeTemperature > 200 ? 'local_fire_department' : 'thermostat'"
                  :color="recipeTemperature > 200 ? 'red' : 'orange'"
                />
              </template>
            </q-input>

            <q-btn
              round
              icon="add"
              @click="ingrementTemperature"
              v-touch-repeat:0:150.mouse.enter.space="ingrementTemperature"
            />
            <span class="text-caption q-ml-sm">°C</span>
          </div>
        </div>

        <br />

        <div class="ingredientes">
          <label for="ingredientes">Ingredientes</label> <br />
          <div v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient.id">
            <input
              v-model="recipeIngredient.name"
              type="text"
              name="ingredientes"
              id="ingredientes"
              placeholder="Insira o ingrediente"
              required
            />
            <button
              v-if="recipeIngredients.indexOf(recipeIngredient) >= 1"
              @click.prevent="removeIngredient(recipeIngredient.id)"
            >
              remover
            </button>
          </div>
          <button @click.prevent="addIngredient()">Novo Ingrediente</button>
        </div>

        <br />
        <br />
        <button type="submit" class="adicionarIngrediente">Adicionar receita</button>
      </form>
    </div>

    <div class="receitas" v-if="dataRecipes.length > 0">
      <h2>Receitas</h2>

      <div v-for="recipeItem in dataRecipes" :key="recipeItem.id" class="receita">
        <p>Nome: {{ recipeItem.name }}</p>
        <br />
        <p>Descrição: {{ recipeItem.description }}</p>
        <br />
        <p>Duração: {{ recipeItem.duration }}</p>
        <br />
        <p>Temperatura: {{ recipeItem.temperature }}</p>
        <br />
        <p>
          Ingredientes: {{ recipeItem.ingredients.map((ingredient) => ingredient.name).join(', ') }}
        </p>

        <button @click="deleteRecipe(recipeItem.id)">Excluir</button>
        <button @click="updateRecipe(recipeItem.id)">Editar</button>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import MainHeader from 'src/components/MainHeader.vue'
import { onMounted, ref, watch } from 'vue'

// const stateRecipe = ref({
//   recipeName,
//   recipeDescription,
//   recipeDuration,
//   recipeTemperature,
//   recipeIngredients
// })

let recipeName = ref(null)
let recipeDescription = ref(null)
let recipeDuration = ref(30)
let recipeTemperature = ref(0)
let recipeIngredients = ref([{ id: Date.now(), name: '' }])

let dataRecipes = ref([])

function addIngredient() {
  recipeIngredients.value.push({
    id: Date.now(),
    name: '',
  })
}
function removeIngredient(id) {
  recipeIngredients.value = recipeIngredients.value.filter((ingredient) => ingredient.id !== id)
}

function validateInputs() {
  if (
    recipeName.value.trim() !== '' &&
    recipeDescription.value.trim() !== '' &&
    recipeIngredients.value.some((ingredint) => ingredint.name.trim() !== '')
  ) {
    return true
  } else {
    return false
  }
}
function createRecipe() {
  if (validateInputs) {
    dataRecipes.value.push({
      id: Date.now(),
      name: recipeName.value,
      description: recipeDescription.value,
      duration: recipeDuration.value,
      temperature: recipeTemperature.value,
      ingredients: recipeIngredients.value,
    })

    resetForm()
  }
}
function resetForm() {
  recipeName.value = ''
  recipeDescription.value = ''
  recipeDuration.value = 30
  recipeTemperature.value = 0
  recipeIngredients.value = []
  recipeIngredients.value.push({
    id: Date.now(),
    name: '',
  })
}
function deleteRecipe(id) {
  dataRecipes.value = dataRecipes.value.filter((recipe) => recipe.id !== id)
}
function updateRecipe(id) {
  const recipeToUpdate = ref(null)
  recipeToUpdate.value = dataRecipes.value.filter((recipe) => recipe.id === id)
  console.log(recipeToUpdate.value[0].name)
}

function ingrementTemperature() {
  recipeTemperature.value = recipeTemperature.value + 5
}
function decrementTemperature() {
  if (recipeTemperature.value > 0) {
    recipeTemperature.value = recipeTemperature.value - 5
  }
}

watch(
  dataRecipes,
  (newVal) => {
    try {
      localStorage.setItem('Receitas', JSON.stringify(newVal))
    } catch (error) {
      console.error('Erro ao acessar localStorage: ', error)
    }
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
@import './mainLayout.scss';
</style>
