<template>
  <div class="recipe-card">
    <h3 v-if="recipe?.name">{{ recipe.name }}</h3>
    <p v-if="recipe?.description">{{ recipe.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
h3 {
  font-size: 18px;
  line-height: normal;
  margin: 0;
}
</style>
