<template>
  <div>
    <h1>This is an page with parameter : {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { createApp } from "vue";

createApp({
  data() {
    return {
      count: this.$route.params,
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
