<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <main>
    <Navigation />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
}
</style>
