<template>
  <div class="recipe-detail__body" v-if="selectedRecipe">
    <Teleport to="#header-actions-portal">
      <q-btn flat round dense icon="more_vert" class="absolute-right">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="goToUpdate">
              <q-item-section>Editar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="confirm = true">
              <q-item-section>Deletar</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </Teleport>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="primary" text-color="white" />
          <span class="q-ml-sm">Você realmente deseja deletar essa receita?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="primary" v-close-popup />
          <q-btn flat label="Sim" color="primary" v-close-popup @click="deleteRecipe" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-img
      v-if="selectedRecipe.image"
      :src="selectedRecipe.image"
      spinner-color="primary"
      height="170"
      width="400"
      class="recipe-detail__image"
      :alt="`Imagem da receita ${selectedRecipe.name}`"
    />

    <div class="recipe-detail">
      <h2 class="recipe-detail__title">{{ selectedRecipe.name }}</h2>

      <div class="recipe-detail__description">
        <p class="recipe-detail__description-text">{{ selectedRecipe.description }}</p>
      </div>

      <q-separator class="q-my-md" />

      <div class="recipe-detail__duration">
        <h3 class="recipe-detail__duration-title">Duração</h3>
        <p class="recipe-detail__duration-value">{{ selectedRecipe.duration }} minutos</p>
      </div>

      <q-separator class="q-my-md" />

      <div class="recipe-detail__ingredients">
        <h3 class="recipe-detail__ingredients-title">Ingredientes</h3>
        <ul class="recipe-detail__ingredients-list">
          <q-chip
            v-for="(ingredient, index) in selectedRecipe.ingredients"
            :key="index"
            class="recipe-detail__ingredients-item"
          >
            {{ ingredient }}
          </q-chip>
        </ul>
      </div>

      <q-separator class="q-my-md" />

      <div class="recipe-detail__preparation">
        <h3 class="recipe-detail__preparation-title">Modo de preparo</h3>
        <p class="recipe-detail__preparation-text">{{ selectedRecipe.preparationMethod }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAll, saveAll } from '../services/recipesStorage'

const dataRecipes = ref([])
const route = useRoute()
const router = useRouter()

const confirm = ref(false)

const recipeId = String(route.params.id)

const goToUpdate = () => {
  router.push(`/update-recipe/${recipeId}`)
}

const deleteRecipe = () => {
  const newDataRecipes = dataRecipes.value.filter((recipe) => recipe.id !== recipeId)

  saveAll(newDataRecipes)

  router.push('/')
}

onMounted(() => {
  dataRecipes.value = getAll()
})

const selectedRecipe = computed(() => {
  return dataRecipes.value.find((recipeItem) => recipeItem.id === recipeId)
})
</script>

<style scoped lang="scss">
.recipe-detail {
  padding: 20px;

  &__image {
    height: 170px;
    width: 100%;
  }

  &__title {
    font-weight: 600;
    padding: 0;
    margin-bottom: 8px;
  }

  &__description {
    &-text {
      font-size: 18px;
      line-height: 1.4;
      margin: 0;
    }
  }

  &__duration {
    &-title {
      font-size: 18px;
      font-weight: 600;
      padding: 0;
      margin-bottom: 8px;
    }
    &-value {
      font-size: 18px;
      line-height: 1.4;
      margin: 0;
    }
  }

  &__ingredients {
    &-title {
      font-size: 18px;
      font-weight: 600;
      padding: 0;
      margin-bottom: 8px;
    }
    &-list {
      padding: 0;
      margin: 0;
      font-weight: 600;
    }
    &-item {
      background-color: $primary-light;
      font-size: 18px;
      line-height: 1.4;
      color: #000;
    }
  }

  &__preparation {
    &-title {
      font-size: 18px;
      font-weight: 600;
      padding: 0;
      margin-bottom: 8px;
    }
    &-text {
      font-size: 18px;
      line-height: 1.4;
      margin: 0;
    }
  }
}
</style>
