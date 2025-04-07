<template>
  <div class="kanban-column">
    <h2 class="column-title">
      <span class="color-dot" :style="{ backgroundColor: color }"></span>
      {{ title }}
    </h2>
    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      class="task-list"
      @change="onDrop"
    >
      <template #item="{ element }">
        <div @click="abrirDetalhes(element)">
          <TaskCard :title="element.title" :description="element.description" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import TaskCard from "./TaskCard.vue";
import draggable from "vuedraggable";

const props = defineProps({
  title: String,
  tasks: Array,
  color: String,
});

const emit = defineEmits(["update:tasks", "open-details"]);

function onDrop(event) {
  emit('update:tasks', [...props.tasks]);

  if (event.moved) {
    const movedTask = props.tasks[event.moved.newIndex];

    emit('task-dropped', {
      taskId: movedTask.id,
      newStatus: mapTitleToStatus(props.title)
    });
  }

  // Quando uma tarefa for adicionada a esta coluna (ou seja, movida de outra)
  if (event.added) {
    const addedTask = props.tasks[event.added.newIndex];

    emit('task-dropped', {
      taskId: addedTask.id,
      newStatus: mapTitleToStatus(props.title)
    });
  }
}

function mapTitleToStatus(title) {
  switch (title) {
    case "A Fazer":
      return "A_FAZER";
    case "Em Progresso":
      return "EM_PROGRESSO";
    case "Concluído":
      return "CONCLUIDO";
    default:
      return "A_FAZER";
  }
}

function abrirDetalhes(task) {
  emit("open-details", task);
}
</script>

<style scoped>
.kanban-column {
  background-color: var(--color-column-board);
  border-radius: 10px;
  padding: 16px;
  width: 390px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.column-title {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
