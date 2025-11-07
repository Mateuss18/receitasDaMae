<template>
  <div class="recipe-card">
    <img
      src="https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1066"
      alt=""
      height="170"
      width="400"
    />
    <div class="recipe-card__text">
      <h3 v-if="recipe?.name">{{ recipe.name }}</h3>
      <p v-if="recipe?.description">{{ recipe.description }}</p>
    </div>
  </div>

  <q-card class="recipe-card">
    <img src="https://cdn.quasar.dev/img/mountains.jpg" height="170" width="400" />

    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa necessitatibus perferendis fugit
      nemo aliquam expedita? Perspiciatis fugiat eveniet amet consectetur provident error ratione
      blanditiis, doloribus officia aliquam repellat et numquam.
    </q-card-section>
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
.recipe-card__text h3 {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 8px 0;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.recipe-card__text p {
  margin: 0;
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
