<template>
  <div class="container-kanban-column">
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
        :animation="200"
        ghost-class="drag-ghost"
        chosen-class="drag-chosen"
      >
        <template #item="{ element }">
          <div @click="abrirDetalhes(element)">
            <TaskCard :task="element"
              :title="element.title"
              :description="element.description"
              :subtasks="element.subtasks"
            />
          </div>
        </template>

        <template #placeholder>
          <div class="task-placeholder"></div>
        </template>
      </draggable>
    </div>
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
  emit("update:tasks", [...props.tasks]);

  if (event.moved) {
    const movedTask = props.tasks[event.moved.newIndex];

    emit("task-dropped", {
      taskId: movedTask.id,
      newStatus: mapTitleToStatus(props.title),
    });
  }

  // Quando uma tarefa for adicionada a esta coluna (ou seja, movida de outra)
  if (event.added) {
    const addedTask = props.tasks[event.added.newIndex];

    emit("task-dropped", {
      taskId: addedTask.id,
      newStatus: mapTitleToStatus(props.title),
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

function abrirDetalhes(element) {
  emit("open-details", element);
  console.log('Tarefa clicada:', element);
}
</script>

<style scoped>
.container-kanban-column {
  width: 100%;
  max-width: 390px;
  min-height: 82.7vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

@media (min-width: var(--breakpoint-desktop)) {
  .container-kanban-column {
    min-height: 87.6vh;
  }
}

.kanban-column {
  background-color: var(--color-column-board);
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  flex: 1;
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
  overflow-y: auto;
  max-height: 72vh; 
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
.task-list::-webkit-scrollbar {
  width: 5px;
}

.task-list::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 6px;
}

.task-list::-webkit-scrollbar-track {
  background: transparent;
}
.task-placeholder {
  height: 80px;
  border: 2px dashed #bbb;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.1);
  margin-bottom: 8px;
  transition: all 0.2s ease-in-out;
}

/* Item sendo arrastado */
.drag-ghost {
  opacity: 0.5;
  transform: rotate(2deg);
  cursor: grabbing;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Item selecionado */
.drag-chosen {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  transform: scale(1.02);
}

/* Cursor padrão nos cards */
.task-list > div {
  cursor: grab;
}

/* Transições suaves */
.task-list > div {
  transition: all 0.2s ease-in-out;
}
</style>
