<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader />

    <RouterView />
  </q-layout>
</template>

<script setup>
import AppHeader from 'src/components/AppHeader.vue'
</script>

<style lang="scss">
@import './LayoutDefault.scss';
</style>
