<template>
  <q-card v-if="recipe" class="recipe-card">
    <img src="https://cdn.quasar.dev/img/mountains.jpg" height="170" width="400" />

    <div class="recipe-card__text">
      <q-card-section v-if="recipe?.name" class="recipe-card__title">
        {{ recipe.name }}
      </q-card-section>

      <q-card-section v-if="recipe?.description" class="recipe-card__description q-pt-none">
        {{ recipe.description }}
      </q-card-section>

      <q-card-section v-if="recipe?.duration" class="recipe-card__duration">
        <q-icon name="access_time" /> <span>{{ recipe.duration }} minutos</span>
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

<style scoped lang="scss">
.recipe-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 14px;
  box-shadow:
    0 1px 3px rgba(31, 31, 31, 0.2),
    0 2px 2px rgba(34, 34, 34, 0.14),
    0 3px 1px -2px rgba(39, 39, 39, 0.12);

  img {
    object-fit: cover;
    max-width: 100%;
    border-top: 0;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &__text {
    padding: 16px;
  }

  &__title {
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

  &__description {
    margin: 0;
    padding: 0;
    color: #363636;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.3;
    max-height: 47px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__duration {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    padding: 0;
    color: #494949;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3;

    span {
      display: block;
      margin-top: 1px;
    }
  }
}
</style>
