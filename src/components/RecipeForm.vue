<template>
  <div class="form-recipe">
    <form @submit.prevent="onSubmit">
      <h2 class="form-recipe__title">
        {{ title }}
      </h2>

      <div class="form-recipe__label">
        <q-input outlined v-model="form.name" label="Nome da Receita" :dense="dense" required />
      </div>

      <div class="form-recipe__label">
        <q-input
          outlined
          v-model="form.description"
          label="Descrição da Receita"
          :dense="dense"
          required
        />
      </div>

      <div class="form-recipe__label">
        <q-file
          outlined
          v-model="rawImage"
          @update:model-value="convertImageToBase64"
          label="Adicione uma imagem a Receita"
          accept=".jpg, image/*"
          required
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-img
          v-if="form.image"
          :src="form.image"
          spinner-color="primary"
          class="form-recipe__image"
          height="170"
        />
      </div>

      <div class="form-recipe__label duration-group">
        <label for="duration">Duração total em minutos</label>
        <q-slider v-model="form.duration" :min="0" :max="60" :step="5" label label-always />
      </div>

      <div class="form-recipe__label">
        <div
          v-for="(ingredint, index) in form.ingredients"
          :key="index"
          class="form-recipe__ingredient-group"
        >
          <q-input
            outlined
            v-model="form.ingredients[index]"
            :label="`Ingrediente ${index + 1}`"
            :dense="dense"
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
        <q-input
          outlined
          v-model="form.preparationMethod"
          label="Modo de preparo"
          :dense="dense"
          type="textarea"
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
  image: recipeValues?.image ?? '',
  duration: Number.isFinite(recipeValues?.duration) ? recipeValues.duration : 0,
  ingredients: Array.isArray(recipeValues?.ingredients) ? [...recipeValues.ingredients] : [''],
  preparationMethod: recipeValues?.preparationMethod ?? '',
})

const rawImage = ref(null)

const convertImageToBase64 = (rawImage) => {
  if (!rawImage) {
    form.value.image = ''
    return
  }

  const reader = new FileReader()

  reader.onload = (event) => {
    form.value.image = event.target.result
  }

  reader.readAsDataURL(rawImage)
}

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
  &__image {
    width: 100%;
    height: 170px;
    border-radius: 6px;
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

    input,
    label {
      width: 100%;
    }
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
