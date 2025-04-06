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
    background-color: var(--color-card);
    padding: 20px;
    border-radius: 8px;
    border-left: 5px solid var(--color-secondary);
    border-right: 1.5px solid var(--color-border);
    border-bottom: 1.5px solid var(--color-border);
    border-top: 1.5px solid var(--color-border);
  }
  
  .task-title {
    font-weight: bold;
    margin: 0 0 6px;
    color: var(--color-card-title);
  }
  
  .task-desc {
    font-size: 14px;
    color: var(--color-card-text);
  }
  </style>