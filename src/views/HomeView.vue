<template>
    <main class="home-view">
      <KanbanBoard />
    </main>
  </template>
  
  <script setup>
  import KanbanBoard from '../components/KanbanBoard.vue'
  </script>
  
  <style scoped>
  .home-view {
    padding: 20px;
  }
  </style>