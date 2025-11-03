<template>
  <div class="form-recipe">
    <form @submit.prevent="onSubmit">
      <h2 class="form-recipe__title">
        {{ title }}
      </h2>

      <div class="form-recipe__label">
        <label for="nome">Nome da receita</label>
        <input
          v-model="form.name"
          type="text"
          name="nome"
          id="nome"
          placeholder="Adicione o nome da receita"
          required
        />
      </div>

      <div class="form-recipe__label">
        <label for="descricao">Descrição</label>
        <input
          v-model="form.description"
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Fale um pouco sobre a receita"
          required
        />
      </div>

      <div class="form-recipe__label">
        <label for="descricao">Duração total em minutos</label> <br />
        <div class="q-pa-md">
          <q-slider v-model="form.duration" :min="0" :max="60" :step="5" label label-always />
        </div>
      </div>

      <div class="form-recipe__label">
        <label for="ingredientes">Ingredientes</label> <br />
        <div v-for="(ingredient, index) in form.ingredients" :key="index">
          <input
            v-model="form.ingredients[index]"
            type="text"
            name="ingredientes"
            id="ingredientes"
            :placeholder="`Ingrediente ${index + 1}`"
            required
          />
          <button
            :disabled="form.ingredients.length <= 1"
            type="button"
            @click="removeIngredient(index)"
          >
            remover
          </button>
        </div>
        <button type="button" @click="addIngredient">Adicionar Ingrediente</button>
      </div>

      <div class="form-recipe__label">
        <label for="modo_preparo">Modo de preparo</label>
        <input
          v-model="form.preparationMethod"
          type="text"
          name="preparo"
          id="preparo"
          placeholder="Descreva o modo de preparo"
          required
        />
      </div>

      <div class="form-recipe__buttons">
        <button type="submit" class="form-recipe__button">Salvar</button>

        <button @click="onCancel" type="button" class="form-recipe__button">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// eslint-disable-next-line no-unused-vars
const { title, recipeValues, mode } = defineProps({
  title: {
    type: String,
    required: true,
  },
  recipeValues: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: 'create',
    required: true,
  },
})

const form = ref({
  name: recipeValues?.name ?? '',
  description: recipeValues?.description ?? '',
  duration: Number.isFinite(recipeValues?.duration) ? recipeValues.duration : 0,
  ingredients: Array.isArray(recipeValues?.ingredients) ? [...recipeValues.ingredients] : [''],
  preparationMethod: recipeValues?.preparationMethod ?? '',
})

const addIngredient = () => {
  form.value.ingredients.push('')
}

const removeIngredient = (index) => {
  if (form.value.ingredients.length <= 1) return
  form.value.ingredients.splice(index, 1)
}

const emit = defineEmits(['submit'])

function onSubmit() {
  if (validateRecipeForm()) {
    emit('submit', form.value)
  }
}

function onCancel() {
  router.replace('/')
}

const validateRecipeForm = () => {
  if (
    form.value.name?.trim().length > 0 &&
    form.value.description?.trim().length > 0 &&
    form.value.ingredients.some((ingredint) => ingredint.trim()) &&
    form.value.preparationMethod?.trim().length > 0
  ) {
    return true
  } else {
    return false
  }
}

watch(
  () => recipeValues,
  (v) => {
    form.value = { ...v, ingredients: [...(v.ingredients || [''])] }
  },
  { deep: true },
)
</script>
