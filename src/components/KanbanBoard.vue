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
        @task-dropped="moverTarefa"
      />
      <KanbanColumn
        color="var(--color-title-column-purple)"
        title="Em Progresso"
        :tasks="inProgressTasks"
        @open-details="abrirDetalhes"
        @task-dropped="moverTarefa"
      />
      <KanbanColumn
        color="var(--color-title-column-green)"
        title="Concluído"
        :tasks="doneTasks"
        @open-details="abrirDetalhes"
        @task-dropped="moverTarefa"
      />
      <!-- <KanbanColumn /> -->
    </div>

    <NewTaskModal
      v-if="exibirModal"
      @close="exibirModal = false"
      @created="buscarTarefas"
    />

    <!-- modal -->
    <TaskDetailsModal
      v-if="exibirModalDetalhes"
      :task="taskSelecionada"
      @close="exibirModalDetalhes = false"
      @deleted="aoExcluirTarefa"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import NewTaskModal from "./NewTaskModal.vue";
import TaskDetailsModal from "./TaskDetailsModal.vue";
import { PhPlusCircle, PhLayout } from "@phosphor-icons/vue";
import TaskService from "../services/TaskService";

const exibirModal = ref(false);
const exibirModalDetalhes = ref(false);
const taskSelecionada = ref(null);

const todoTasks = ref([]);
const inProgressTasks = ref([]);
const doneTasks = ref([]);

function abrirDetalhes(task) {
  taskSelecionada.value = task;
  exibirModalDetalhes.value = true;
}

function aoExcluirTarefa() {
  exibirModalDetalhes.value = false;
  buscarTarefas(); // atualiza as tarefas no board
}

async function buscarTarefas() {
  try {
    const tarefas = await TaskService.getAll(); // já vem como array
    console.log("Dados recebidos:", tarefas);

    // Corrigindo os filtros pelos valores reais de status
    todoTasks.value = tarefas.filter((t) => t.status === "A_FAZER");
    inProgressTasks.value = tarefas.filter((t) => t.status === "EM_PROGRESSO");
    doneTasks.value = tarefas.filter((t) => t.status === "CONCLUIDO");
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
  }
}

async function moverTarefa({ taskId, newStatus }) {
  try {
    const task = await TaskService.getById(taskId);

    // Garantir que subtasks exista (evita sobrescrever com undefined)
    const updatedTask = {
      ...task,
      status: newStatus,
      subtasks: task.subtasks || [],
    };

    console.log("Nova coluna (status):", newStatus);
    console.log("ID da tarefa:", taskId);
    console.log("Subtarefas antes do update:", updatedTask.subtasks);

    await TaskService.update(taskId, updatedTask);

    // Atualiza as colunas do Kanban
    await buscarTarefas();
  } catch (error) {
    if (error.response) {
      console.error("Erro do backend:", error.response.data);
    } else {
      console.error("Erro ao mover tarefa:", error.message);
    }
  }
}

onMounted(() => {
  buscarTarefas();
});
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
