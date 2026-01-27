<template>
  <div class="home-page" v-if="dataRecipes.length > 0">
    <nav class="q-px-md q-pb-sm">
      <q-input
        outlined
        v-model="searchTerm"
        class="home-page__search"
        :dense="dense"
        placeholder="Busque suas receitas.."
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </nav>

    <div class="home-page__content">
      <div class="home-page__nav">
        <h2 class="home-page__title">Todas as receitas</h2>

        <div class="home-page__recipes-count">{{ dataRecipes.length }} receitas</div>
      </div>

      <div class="home-page__recipes">
        <RecipeCard
          v-for="recipeItem in filteredRecipes"
          :key="recipeItem.id"
          :recipe="recipeItem"
          @click="openRecipe(recipeItem.id)"
        />

        <div v-if="filteredRecipes.length === 0 && dataRecipes.length > 0">
          Nenhuma receita encontrada para a busca.
        </div>
      </div>

      <q-btn
        @click="$router.push('/create-recipe')"
        class="home-page__add"
        round
        size="xl"
        icon="add"
      />
    </div>
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
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RecipeCard from 'src/components/RecipeCard.vue'
import { getAll } from '../services/recipesStorage'

const router = useRouter()

const dataRecipes = ref([])
const searchTerm = ref('')

const filteredRecipes = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  if (!term) return dataRecipes.value

  return dataRecipes.value.filter((recipe) => {
    const name = recipe.name?.toLowerCase() ?? ''
    return name.includes(term)
  })
})

const openRecipe = (id) => {
  router.push({ name: 'detail', params: { id } })
}

onMounted(() => {
  dataRecipes.value = getAll()
})
</script>

<style scoped lang="scss">
.home-page {
  padding-bottom: 80px;

  &__search {
    margin-top: 16px;
    font-size: 18px;
  }

  &__content {
    padding: 16px 20px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    padding: 0;
    font-weight: normal;
  }

  &__recipes {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  &__add {
    z-index: 2;
    font-size: 50px;
    padding-bottom: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    bottom: 12px;
    right: -10px;
    height: 75px;
    width: 75px;

    border-radius: 50%;
    transform: translateX(-50%);
    text-decoration: none;

    color: #fff;
    background-color: $primary;
  }
}
</style>
