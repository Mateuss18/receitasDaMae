<template>
  <header class="app-header full-width">
    <div class="header-top flex flex-center relative-position">
      <q-btn
        v-if="route.path !== '/'"
        flat
        round
        dense
        icon="arrow_back"
        class="button-back q-ml-sm absolute-left"
        @click="goBack"
      />

      <router-link to="/" class="text-decoration-none text-white">
        <h1 class="text-center text-weight-bold">Receitas da Mãe</h1>
      </router-link>

      <div id="header-actions-portal"></div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.app-header {
  background-color: $primary;
  color: white;
}

.header-top {
  height: 60px;
}

.button-back {
  color: white;
  z-index: 10;
}

.text-decoration-none {
  text-decoration: none;
  color: inherit;
}

.search-input {
  height: 40px;
  border-radius: 8px;
  border: none;
  padding: 0 16px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    background: white;
  }
}
</style>
