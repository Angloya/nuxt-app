<script setup lang="ts">
import { clearError } from "#app";
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <h1>
      Упс... Что-то пошло не так
    </h1>

    <button @click="handleError">
      Вернуться на главную страницу
    </button>
  </div>
</template>
