<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Watch的用法</RouterLink>
          <RouterLink to="/watchFirstDemo">WatchFirstDemo</RouterLink>
          <RouterLink to="/watchModel">WatchModel</RouterLink>
          <RouterLink to="/watchByPlus">WatchByPlus</RouterLink>
          <RouterLink to="/watchSomeAttrs">WatchSomeAttrs</RouterLink>
          <RouterLink to="/watchSomeAttrs2">WatchSomeAttrs2</RouterLink>
          <RouterLink to="/refAndReactive">RefAndReactive</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView class="content" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw; /* 宽度占满整个屏幕 */
  height: 100vh;
}

header {
  width: 30%;
  line-height: 1.5;
  max-height: 100vh;
  overflow-y: auto;
  padding: 1rem;
  }

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block; /* 修改为块级元素 */
  padding: 0.5rem 0; /* 增加上下内边距 */
  border-bottom: 1px solid var(--color-border); /* 修改为下边框 */
}

nav a:first-of-type {
  border-top: 1px solid var(--color-border); /* 增加上边框 */
}

.content {
  width: 70%;
  padding: 1rem;
  overflow-y: auto;
}

@media (min-width: 2880px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
