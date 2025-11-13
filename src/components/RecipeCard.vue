<template>
  <q-card v-if="recipe" class="recipe-card">
    <img src="https://cdn.quasar.dev/img/mountains.jpg" height="170" width="400" />

    <div class="recipe-card__text">
      <q-card-section v-if="recipe?.name" class="recipe-card__title">
        <div class="text-h6">{{ recipe.name }}</div>
      </q-card-section>

      <q-card-section v-if="recipe?.description" class="recipe-card__description q-pt-none">
        {{ recipe.description }}
      </q-card-section>
    </div>
  </q-card>
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
.recipe-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 14px;
}
.recipe-card img {
  object-fit: cover;
  max-width: 100%;
  border-top: 0;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.recipe-card__text {
  padding: 16px;
}
.recipe-card__title {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  padding: 0;
  margin: 0 0 8px 0;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.recipe-card__description {
  margin: 0;
  padding: 0;
  color: #1d1d1d;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.3;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
