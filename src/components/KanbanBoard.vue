<template>
  <div class="kanban-wrapper">
    <header class="kanban-header">
      <h1 class="board-title">
        <PhLayout :size="28" color="#FEFFFF" />Quadro Nexum
      </h1>
      <button class="add-task-btn" @click="exibirModal = true">
        <PhPlusCircle :size="22" color="#fff" />Nova Tarefa
      </button>
    </header>
    <div class="kanban-board">
      <KanbanColumn
        color="var(--color-title-column-blue)"
        title="A Fazer"
        :tasks="todoTasks"
        @open-details="abrirDetalhes"
      />
      <KanbanColumn
        color="var(--color-title-column-purple)"
        title="Em Progresso"
        :tasks="inProgressTasks"
        @open-details="abrirDetalhes"
      />
      <KanbanColumn
        color="var(--color-title-column-green)"
        title="Concluído"
        :tasks="doneTasks"
        @open-details="abrirDetalhes"
      />
      <!-- <KanbanColumn /> -->
    </div>

    <NewTaskModal v-if="exibirModal" @close="exibirModal = false" />

    <!-- modal -->
    <TaskDetailsModal
      v-if="exibirModalDetalhes"
      :task="taskSelecionada"
      @close="exibirModalDetalhes = false"
    />
  </div>
</template>

<script setup>
import KanbanColumn from "./KanbanColumn.vue";
import NewTaskModal from "./NewTaskModal.vue";
import { PhPlusCircle } from "@phosphor-icons/vue";
import { PhLayout } from "@phosphor-icons/vue";
import TaskDetailsModal from "./TaskDetailsModal.vue";

const exibirModalDetalhes = ref(false);
const taskSelecionada = ref(null);

function abrirDetalhes(task) {
  console.log("Abrindo detalhes da tarefa:", task);
  taskSelecionada.value = task;
  exibirModalDetalhes.value = true;
}

import { ref } from "vue";

const exibirModal = ref(false);

const todoTasks = ref([
  {
    id: 1,
    title: "Estudar Vue",
    description: "Revisar componentes e reatividade",
    subtasks: [
      { title: "Reatividade", done: false },
      { title: "Props e Emits", done: true },
    ],
    status: "todo",
  },
  {
    id: 2,
    title: "Montar base do projeto",
    description: "Estrutura e layout",
    subtasks: [],
    status: "todo",
  },
]);

const inProgressTasks = ref([
  {
    id: 3,
    title: "Implementar drag-and-drop",
    description: "Usar Vue Draggable",
  },
]);

const doneTasks = ref([
  {
    id: 4,
    title: "Implementar drag-and-drop",
    description: "Usar Vue Draggable",
  },
]);
</script>

<style scoped>
.kanban-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);
}

.kanban-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

.board-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #feffff;
}

.add-task-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 1.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.add-task-btn:hover {
  background-color: var(--color-secondary);
}

.kanban-board {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  flex: 1;
  background-color: var(--color-bg);
}
</style>
