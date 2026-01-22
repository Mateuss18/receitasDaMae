<template>
  <div class="recipe-detail" v-if="selectedRecipe">
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

    <p>id: {{ selectedRecipe.id }}</p>
    <p>Nome: {{ selectedRecipe.name }}</p>
    <p>Descrição: {{ selectedRecipe.description }}</p>
    <p>Duração: {{ selectedRecipe.duration }} minutos</p>
    <p>Ingredientes: {{ selectedRecipe.ingredients.join(', ') }}</p>
    <p>Modo de preparo: {{ selectedRecipe.preparationMethod }}</p>
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
