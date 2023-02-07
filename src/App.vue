<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <a href="/" class="logo">
      <img alt="Vue logo" src="@/assets/logo.svg" width="125" height="125"/>
    </a>
    <div class="wrapper">
      <h1 class="green">Тестовое задание "Список задач"</h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
    margin: 2.5rem auto 0;
    display: flex;
    flex-direction: column;
    place-items: center;
    flex-wrap: wrap;
  }
  .logo {
    display: block;
    margin: 0 0 2rem 0;
  }
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
    text-align: center;
  }
  @media screen and (max-width: 750px)  {
        h1 {
            font-size: 2.1rem;
        }
  }
  @media screen and (max-width: 550px)  {
        h1 {
            font-size: 1.6rem;
        }
  }
  @media screen and (max-width: 400px)  {
        h1 {
            font-size: 1.3rem;
        }
  }
</style>
