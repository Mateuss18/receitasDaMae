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

      <div class="form-recipe__label duration-group">
        <label for="duration">Duração total em minutos</label>
        <q-slider v-model="form.duration" :min="0" :max="60" :step="5" label label-always />
      </div>

      <div class="form-recipe__label">
        <label for="ingredints">Ingredientes</label>
        <div
          v-for="(ingredint, index) in form.ingredients"
          :key="index"
          class="form-recipe__ingredient-group"
        >
          <input
            v-model="form.ingredients[index]"
            type="text"
            name="ingredints"
            id="ingredints"
            :placeholder="`Ingrediente ${index + 1}`"
            required
          />
          <q-btn
            :disabled="form.ingredients.length <= 1"
            @click="removeIngredient(index)"
            icon="delete"
            color="red"
            flat
            round
          />
        </div>
        <!-- <button type="button" @click="addIngredient">+ Adicionar ingrediente</button> -->

        <q-btn
          class="form-recipe__btn-add-ingredient"
          @click="addIngredient"
          icon="add"
          label="Adicionar ingrediente"
          color="primary"
          push
        />
      </div>

      <div class="form-recipe__label">
        <label for="preparation">Modo de preparo</label>
        <textarea
          v-model="form.preparationMethod"
          type="text"
          name="preparation"
          id="preparation"
          placeholder="Descreva o modo de preparo"
          required
        />
      </div>

      <div class="form-recipe__buttons">
        <q-btn type="submit" push color="green" label="Salvar" class="form-recipe__button" />
        <q-btn @click="goBack" push color="red" label="Cancelar" class="form-recipe__button" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useGoBack } from 'src/composables/useGoBack'

const { goBack } = useGoBack()

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

    goBack()
  }
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

<style scoped lang="scss">
.form-recipe {
  &__title {
    text-align: center;
    font-weight: 500;
    padding: 14px 0 0 0;
  }
  &__label {
    margin-top: 20px;

    label {
      display: block;
      font-size: 18px;
      margin-bottom: 4px;
    }
    input {
      border-radius: 6px;
      padding-left: 12px;
      border: 1px solid #838383;
    }
  }
  .duration-group {
    .q-slider {
      padding: 26px 6px 0 6px;
    }
  }
  &__ingredient-group {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }
  &__btn-add-ingredient {
    width: 100%;
    border-radius: 6px;
  }
  textarea#preparation {
    min-height: 150px;
    width: 100%;
    padding-left: 16px;
    padding-top: 6px;
    font-size: 18px;
    border-radius: 6px;
    border: 1px solid #838383;
  }

  &__buttons {
    display: flex;
    gap: 14px;
    margin-top: 24px;
    padding-bottom: 20px;

    button {
      flex: 1;
      height: 45px;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>
