<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-top">
        <h2 class="modal-title">{{ task.title }}</h2>

        <div class="menu-wrapper">
          <button class="edit-button" @click="toggleDropdown">⋮</button>

          <div v-if="dropdownVisible" class="dropdown-menu">
            <button @click="handleEdit">Editar</button>
            <button @click="handleDelete">Excluir</button>
          </div>
        </div>
      </div>

      <p class="modal-description">{{ task.description }}</p>

      <p class="modal-due-date">
        <strong>Data de validade:</strong>
        {{ new Date(task.dueDate).toLocaleDateString("pt-BR") }}
      </p>

      <div class="modal-subtasks">
        <p class="subtasks-title">
          <strong>Subtarefas</strong> ({{ completedSubtasks }}/{{
            task.subtasks.length
          }})
        </p>
        <div
          v-for="(subtask, index) in task.subtasks"
          :key="index"
          class="subtask-item"
        >
          <input
            type="checkbox"
            :id="'subtask-' + index"
            v-model="localTask.subtasks[index].done"
            @change="updateSubtaskStatus(index)"
          />
          <label :for="'subtask-' + index">{{ subtask.title }}</label>
        </div>
      </div>

      <div class="modal-status">
        <strong><label>Status</label></strong>
        <select v-model="task.status" @change="updateStatus">
          <option value="A_FAZER">A Fazer</option>
          <option value="EM_PROGRESSO">Em Progresso</option>
          <option value="CONCLUIDO">Concluído</option>
        </select>
      </div>

      <!-- Modal de edição -->
      <EditTaskModal
        v-if="showEditModal"
        :task="task"
        :isOpen="showEditModal"
        @updated="handleUpdated"
        @close="showEditModal = false"
      />

      <!-- Confirmação de exclusão -->
      <ConfirmDeleteModal
        v-if="showDeleteConfirm"
        :taskId="task.id"
        @deleted="handleDeleted"
        @close="showDeleteConfirm = false"
      />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
} from "vue";
import ConfirmDeleteModal from "./ConfirmDeleteModal.vue";
import EditTaskModal from "./EditTaskModal.vue";
import TaskService from "../services/TaskService";
import { useToast } from "vue-toastification";

const props = defineProps({
  task: Object,
  closeModal: Function,
  handleUpdated: Function,
});
const emit = defineEmits(["close", "updated"]);

const toast = useToast();
const showEditModal = ref(false);
const dropdownVisible = ref(false);
const showDeleteConfirm = ref(false);
const localTask = ref({ ...props.task, subtasks: [...props.task.subtasks] });

const completedSubtasks = computed(() => {
  return localTask.value.subtasks.filter((s) => s.done).length;
});

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value;
}

function handleEdit() {
  showEditModal.value = true;
  dropdownVisible.value = false;
}

function handleDelete() {
  dropdownVisible.value = false;
  showDeleteConfirm.value = true;
}

function confirmDelete() {
  showDeleteConfirm.value = false;
  emit("delete", props.task.id);
}

function handleClickOutside(e) {
  const menu = document.querySelector(".menu-wrapper");
  if (menu && !menu.contains(e.target)) {
    dropdownVisible.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  loadTask(); // carrega a task atualizada ao abrir modal
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.task,
  (newTask) => {
    localTask.value = { ...newTask, subtasks: [...newTask.subtasks] };
  },
  { immediate: true, deep: true }
);

async function loadTask() {
  try {
    const updatedTask = await TaskService.getById(props.task.id);
    localTask.value = { ...updatedTask };
  } catch (err) {
    console.error("Erro ao carregar a tarefa:", err);
  }
}

async function updateStatus() {
  try {
    await TaskService.update(props.task.id, {
      ...props.task,
      status: props.task.status,
    });
    toast.success("Status da tarefa atualizado!", {
      position: "bottom-right",
      timeout: 5000,
      hideProgressBar: false,
      closeOnClick: false,
    });
    emit("updated");
  } catch (error) {
    console.error("Erro ao atualizar status da tarefa:", error);
  }
}

async function updateSubtaskStatus(index) {
  const subtask = localTask.value.subtasks[index];
  try {
    await TaskService.updateSubtaskStatus(
      props.task.id,
      subtask.id,
      subtask.done
    );
    toast.success("Subtarefa atualizada com sucesso!", {
      position: "bottom-right",
    });

    await handleUpdated();
  } catch (error) {
    console.error("Erro ao atualizar subtarefa:", error);
    toast.error("Erro ao atualizar subtarefa.");
  }
}

async function handleUpdated() {
  await loadTask();
  props.task.title = localTask.value.title;
  props.task.description = localTask.value.description;
  props.task.dueDate = localTask.value.dueDate;
  props.task.subtasks = [...localTask.value.subtasks];
  props.task.status = localTask.value.status;

  showEditModal.value = false;
  emit("updated");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: #2b2c37;
  color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
}

.modal-description {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: #d1d1d1;
}

.modal-subtasks {
  margin-bottom: 1.5rem;
}

.subtasks-title {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: #cfcfcf;
}

.subtask-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #20212c;
  padding: 0.5rem;
  border-radius: 4px;
}

.modal-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-status label {
  font-size: 0.85rem;
  color: #cfcfcf;
}

.modal-status select {
  background-color: #20212c;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  color: white;
}

/* Estilo do botão de 3 pontinhos */
.edit-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #d1d1d1;
  cursor: pointer;
}
.edit-button:hover {
  color: white;
}

/* Dropdown */
.menu-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 1.5rem;
  right: 0;
  background-color: #20212c;
  border: 1px solid #3e3f4e;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.dropdown-menu button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #d1d1d1;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #3a3b4a;
  color: white;
}
.confirm-delete {
  background-color: #20212c;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #3e3f4e;
}

.confirm-delete p {
  margin-bottom: 0.5rem;
  color: #f8d7da;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-confirm,
.btn-cancel {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #e74c3c;
  color: white;
}

.btn-cancel {
  background-color: #7f8c8d;
  color: white;
}
.modal-due-date {
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: #cfcfcf;
}
</style>
