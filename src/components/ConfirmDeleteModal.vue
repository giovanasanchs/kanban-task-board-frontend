<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="confirm-modal">
      <p>Tem certeza que deseja excluir esta tarefa?</p>
      <div class="confirm-actions">
        <button class="btn-confirm" @click="confirmDelete">Confirmar</button>
        <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskService from "../services/TaskService";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  taskId: Number,
});
const emit = defineEmits(["deleted", "close"]);

async function confirmDelete() {
  try {
    await TaskService.delete(props.taskId);
    toast.success("Tarefa excluída com sucesso!", {
      position: "bottom-right",
      timeout: 5000,
      hideProgressBar: false,
      closeOnClick: false,
    });
    emit("deleted");
    emit("close");
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    toast.error("Erro ao excluir tarefa.");
  }
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

.confirm-modal {
  background-color: #20212c;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #3e3f4e;
  color: white;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-confirm {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #7f8c8d;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
