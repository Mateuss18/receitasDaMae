<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <div class="criarReceita">
      <form @submit.prevent="addRecipe">
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

        <div class="duracao">
          <label for="descricao">Duração</label> <br />
          <div class="q-pa-md">
            <q-slider v-model="value" :min="0" :max="60" :step="5" label label-always />
          </div>
        </div>

        <br />

        <div class="duracao">
          <label for="descricao">Temperatura</label> <br />

          <div class="row items-center">
            <q-btn
              round
              icon="remove"
              @click="decrementTemperature"
              v-touch-repeat:0:150.mouse.enter.space="decrementTemperature"
            />

            <q-input
              v-model="temperatura"
              type="number"
              class="q-mx-sm"
              :min="0"
              style="width: 100px"
            >
              <template #append>
                <q-icon
                  :name="temperatura > 200 ? 'local_fire_department' : 'thermostat'"
                  :color="temperatura > 200 ? 'red' : 'orange'"
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
        <p>
          Ingredientes: {{ recipeItem.ingredients.map((ingredient) => ingredient.name).join(', ') }}
        </p>

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
let recipeIngredients = ref([{ id: Date.now(), name: '' }])
let dataRecipes = ref([])

let value = ref(30)
let temperatura = ref(0)

function addIngredient() {
  recipeIngredients.value.push({
    id: Date.now(),
    name: '',
  })
}
function removeIngredient(id) {
  recipeIngredients.value = recipeIngredients.value.filter((ingredient) => ingredient.id !== id)
}

function validatedInputs() {
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
function addRecipe() {
  if (validatedInputs) {
    dataRecipes.value.push({
      id: Date.now(),
      name: recipeName.value,
      description: recipeDescription.value,
      ingredients: recipeIngredients.value,
    })

    recipeName.value = ''
    recipeDescription.value = ''
    recipeIngredients.value = []
    recipeIngredients.value.push({
      id: Date.now(),
      name: '',
    })
  }
}
function deleteRecipe(id) {
  dataRecipes.value = dataRecipes.value.filter((recipe) => recipe.id !== id)
}

function ingrementTemperature() {
  temperatura.value = temperatura.value + 5
}
function decrementTemperature() {
  if (temperatura.value > 0) {
    temperatura.value = temperatura.value - 5
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
.duracao {
  max-width: 400px;
}
label {
  display: flex;
  font-size: 28px;
  margin-top: 12px;
}
input {
  height: 60px;
  width: 400px;
  font-size: 22px;
}
button {
  font-size: 22px;
  font-weight: 500;
  background-color: pink;
  height: 40px;
  margin-top: 10px;
}
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
