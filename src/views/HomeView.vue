<template>
    <main class="home-view">
      <KanbanSidebar />
      <KanbanBoard />
    </main>
  </template>
  
  <script setup>
  import KanbanBoard from '../components/KanbanBoard.vue'
  import KanbanSidebar from '../components/KanbanSidebar.vue';
  </script>
  
  <style scoped>
  .home-view {
    display: flex;
  }
  </style>