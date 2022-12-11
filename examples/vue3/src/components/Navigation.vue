<script setup lang="ts"></script>

<template>
  <div class="navigation">
    <router-link to="/pages/page1"><h3>Page1</h3></router-link>
    <hr class="divider" />
    <router-link to="/pages/page2"><h3>Page2</h3></router-link>
    <hr class="divider" />
    <router-link to="/pages/page3"><h3>Page3</h3></router-link>
    <hr class="divider" />
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.4rem;
  color: var(--color-heading);
}

.divider {
  display: block;
  flex: 1 1 0;
  max-width: 100%;
  height: 0;
  max-height: 0;
  border: 0 solid lightgrey;
  border-top-width: thin;
  transition: inherit;
}

.navigation {
  width: 10vw;
  min-width: 130px;
  border-right: lightgrey 1px solid;
}
</style>
