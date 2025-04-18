<template>
  <div class="kanban-wrapper">
    <header class="kanban-header">
      <h1 class="board-title">
        <PhLayout :size="28" color="#FEFFFF" />Quadro Nexum
      </h1>
      <div class="search-wrapper">
        <input
          v-model="filtroTitulo"
          type="text"
          class="search-input"
          placeholder="Buscar tarefa..."
        />
        <button class="search-button" @click="buscarTarefas">
          <PhMagnifyingGlass class="search-icon" :size="20" weight="bold" />
        </button>
      </div>
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
      <!-- <KanbanColumn><button>>Nova Coluna</button></KanbanColumn> -->
    </div>

    <NewTaskModal
      v-if="exibirModal"
      @close="exibirModal = false"
      @created="buscarTarefas"
    />

    <TaskDetailsModal
      v-if="exibirModalDetalhes"
      :task="taskSelecionada"
      @close="exibirModalDetalhes = false"
      @deleted="aoExcluirTarefa"
      @updated="buscarTarefas"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch  } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import NewTaskModal from "./NewTaskModal.vue";
import TaskDetailsModal from "./TaskDetailsModal.vue";
import { PhPlusCircle, PhLayout, PhMagnifyingGlass } from "@phosphor-icons/vue";
import TaskService from "../services/TaskService";
import { useToast } from "vue-toastification";
const toast = useToast();

const filtroTitulo = ref("");
const tarefasOriginais = ref([]);

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
  buscarTarefas();
}

// async function buscarTarefas() {
//   try {
//     const tarefas = await TaskService.getAll();
//     console.log("Dados recebidos:", tarefas);
//     todoTasks.value = tarefas.filter((t) => t.status === "A_FAZER");
//     inProgressTasks.value = tarefas.filter((t) => t.status === "EM_PROGRESSO");
//     doneTasks.value = tarefas.filter((t) => t.status === "CONCLUIDO");
//     filtrarPorTitulo();
//   } catch (erro) {
//     console.error("Erro ao buscar tarefas:", erro);
//   }
// }

async function moverTarefa({ taskId, newStatus }) {
  try {
    const task = await TaskService.getById(taskId);

    const updatedTask = {
      ...task,
      status: newStatus,
      subtasks: task.subtasks || [],
    };

    console.log("Nova coluna (status):", newStatus);
    console.log("ID da tarefa:", taskId);
    console.log("Subtarefas antes do update:", updatedTask.subtasks);

    await TaskService.update(taskId, updatedTask);

    await buscarTarefas();
    toast.success("Tarefa movida com sucesso!", {
      position: "bottom-right",
      timeout: 5000,
      hideProgressBar: false,
      closeOnClick: false,
    });
  } catch (error) {
    if (error.response) {
      console.error("Erro do backend:", error.response.data);
    } else {
      console.error("Erro ao mover tarefa:", error.message);
    }
  }
}

async function buscarTarefas() {
  try {
    const tarefas = await TaskService.getAll();
    tarefasOriginais.value = tarefas; // <-- salva as tarefas completas antes

    filtrarPorTitulo(); // <-- aí sim pode aplicar o filtro
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
  }
}

function filtrarPorTitulo() {
  const filtro = filtroTitulo.value.toLowerCase();

  const tarefasFiltradas = tarefasOriginais.value.filter((t) =>
    t.title.toLowerCase().includes(filtro)
  );

  todoTasks.value = tarefasFiltradas.filter((t) => t.status === "A_FAZER");
  inProgressTasks.value = tarefasFiltradas.filter(
    (t) => t.status === "EM_PROGRESSO"
  );
  doneTasks.value = tarefasFiltradas.filter((t) => t.status === "CONCLUIDO");
}

watch(filtroTitulo, () => {
  filtrarPorTitulo();
});

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

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  margin-right: 16rem;
}

.search-input {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 20px 0 0 20px;
  background-color: transparent;
  color: var(--color-text);
  font-size: 0.9rem;
  flex: 1;
  min-width: 370px;
  outline: none;
}

.search-input::placeholder {
  color: #aaa;
}

.search-button {
  background-color: white;
  color: var(--color-primary);
  border: none;
  border-radius: 20px;
  margin-right: 0.2rem;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: var(--color-primary);
  color: white;
}

.search-icon {
  transition: color 0.3s ease;
}

.kanban-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  max-width: 100%;
  padding: 1rem;
  background-color: var(--color-bg);
}

/* Telas grandes: limitar largura e centralizar */
@media (min-width: var(--breakpoint-desktop)) {
  .kanban-board {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Telas entre notebook e desktop */
@media (max-width: var(--breakpoint-desktop)) and (min-width: var(--breakpoint-notebook)) {
  .kanban-board {
    max-width: var(--breakpoint-desktop);
    margin: 0 auto;
  }
}

/* Telas notebook */
@media (max-width: var(--breakpoint-notebook)) {
  .kanban-board {
    flex-direction: row;
    justify-content: space-around;
  }
}

/* Telas tablet */
@media (max-width: var(--breakpoint-tablet)) {
  .kanban-board {
    flex-direction: column;
    align-items: center;
  }
}
</style>
