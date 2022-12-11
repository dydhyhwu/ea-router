<script setup lang="ts"></script>

<template>
  <header>
    <div class="wrapper">
      <div class="title">ea-router vue3 example</div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pages">Pages</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="content" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  place-items: center;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  align-items: center;
  width: 100%;
  background: skyblue;
}

header .title {
  flex-grow: 1;
  font-size: 2rem;
  padding-left: 1rem;
}

nav {
  text-align: left;
  font-size: 1rem;

  padding: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.content {
  flex-grow: 1;
}
</style>
