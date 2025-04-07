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

      <div class="modal-subtasks">
        <p class="subtasks-title">
          Subtasks ({{ completedSubtasks }}/{{ task.subtasks.length }})
        </p>
        <div
          v-for="(subtask, index) in task.subtasks"
          :key="index"
          class="subtask-item"
        >
          <input
            type="checkbox"
            :id="'subtask-' + index"
            v-model="task.subtasks[index].done"
          />
          <label :for="'subtask-' + index">{{ subtask.title }}</label>
        </div>
      </div>

      <div class="modal-status">
        <label>Status</label>
        <select v-model="task.status">
          <option value="todo">A Fazer</option>
          <option value="doing">Em Progresso</option>
          <option value="done">Concluído</option>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import ConfirmDeleteModal from "./ConfirmDeleteModal.vue";
import EditTaskModal from "./EditTaskModal.vue";
import TaskService from "../services/TaskService";

const props = defineProps({
  task: Object,
});
const emit = defineEmits(["close", "updated"]);

const completedSubtasks = computed(() => {
  if (!props.task?.subtasks) return 0;
  return props.task.subtasks.filter((s) => s.done).length;
});

const showEditModal = ref(false);
const dropdownVisible = ref(false);

const showDeleteConfirm = ref(false);

function confirmDelete() {
  showDeleteConfirm.value = false;
  emit("delete", props.task.id);
}

// Lida com clique fora do menu
const handleClickOutside = (e) => {
  const menu = document.querySelector(".menu-wrapper");
  if (menu && !menu.contains(e.target)) {
    dropdownVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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

function handleDeleted() {
  emit("deleted");
  emit("updated");
  emit("close");
}

async function handleUpdated() {
  const updatedTask = await TaskService.getById(props.task.id);
  props.task.title = updatedTask.title;
  props.task.description = updatedTask.description;
  props.task.dueDate = updatedTask.dueDate;
  props.task.subtasks = updatedTask.subtasks;
  props.task.status = updatedTask.status;

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
</style>
