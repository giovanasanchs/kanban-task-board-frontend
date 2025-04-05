<template>
    <div class="kanban-board">
      <KanbanColumn title="A Fazer" :tasks="todoTasks" />
      <KanbanColumn title="Em Progresso" :tasks="inProgressTasks" />
      <KanbanColumn title="Concluído" :tasks="doneTasks" />
    </div>
  </template>
  
  <script setup>
  import KanbanColumn from './KanbanColumn.vue'
  import { ref } from 'vue'
  
  const todoTasks = ref([
    { id: 1, title: 'Estudar Vue', description: 'Revisar componentes e reatividade' },
    { id: 2, title: 'Montar base do projeto', description: 'Estrutura e layout' },
  ])
  
  const inProgressTasks = ref([
    { id: 3, title: 'Implementar drag-and-drop', description: 'Usar Vue Draggable' },
  ])
  
  const doneTasks = ref([])
  </script>
  
  <style scoped>
  .kanban-board {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background-color: #eaeaea;
    min-height: 100vh;
  }
  </style>