<template>
    <div class="kanban-column">
      <h2 class="column-title">{{ title }}</h2>
      <draggable
        :list="tasks"
        group="tasks"
        item-key="id"
        class="task-list"
        @change="onDrop"
      >
        <template #item="{ element }">
          <TaskCard :title="element.title" :description="element.description" />
        </template>
      </draggable>
    </div>
  </template>
  
  <script setup>
  import TaskCard from './TaskCard.vue'
  import draggable from 'vuedraggable'
  import { toRef } from 'vue'
  
  const props = defineProps(['title', 'tasks'])
  const emit = defineEmits(['update:tasks'])
  
  function onDrop(event) {
    emit('update:tasks', [...props.tasks])
  }
  </script>
  
  <style scoped>
  .kanban-column {
    background-color: #fff;
    border-radius: 10px;
    padding: 16px;
    width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .column-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  </style>