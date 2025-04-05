<template>
    <div class="task-card">
      <h3 class="task-title">{{ title }}</h3>
      <p class="task-desc">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps(['title', 'description'])
  </script>
  
  <style scoped>
  .task-card {
    background-color: #f1f1f1;
    padding: 12px;
    border-radius: 8px;
    border-left: 5px solid #3b82f6; /* azul de destaque */
  }
  
  .task-title {
    font-weight: bold;
    margin: 0 0 6px;
  }
  
  .task-desc {
    font-size: 14px;
    color: #555;
  }
  </style>