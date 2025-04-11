<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">Editar Tarefa</h2>
        <button class="fechar-modal" @click="$emit('close')">
          <PhX :size="20" color="#fff" weight="bold" />
        </button>
      </div>

      <!-- Título -->
      <label class="modal-label">Título</label>
      <input
        v-model="editedTask.title"
        type="text"
        class="modal-input"
        placeholder="Ex: Atualizar tarefa"
      />

      <!-- Descrição -->
      <label class="modal-label">Descrição</label>
      <textarea
        v-model="editedTask.description"
        class="modal-textarea"
        placeholder="Ex: Ajustar detalhes"
      ></textarea>

      <!-- Data de vencimento -->
      <label class="modal-label">Data de Vencimento</label>
      <input v-model="editedTask.dueDate" type="date" class="modal-input" />

      <!-- Subtarefas -->
      <label class="modal-label">Subtarefas</label>
      <div class="subtarefas-wrapper">
        <div
          v-for="(subtask, index) in editedTask.subtasks"
          :key="index"
          class="subtarefa-linha"
        >
          <input
            type="text"
            v-model="subtask.title"
            class="modal-input input-subtask"
            placeholder="Título da subtarefa"
          />
          <button class="remover-btn" @click="removeSubtask(index)">✕</button>
        </div>
      </div>

      <button class="subtarefa-btn" @click="addSubtask">
        + Adicionar Subtarefa
      </button>

      <!-- Botão de atualizar -->
      <button @click="updateTask" class="criar-btn">Atualizar Tarefa</button>
    </div>
  </div>
</template>

<script>
import TaskService from "../services/TaskService";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "EditTaskModal",
  props: {
    task: Object,
    isOpen: Boolean,
    onClose: Function,
  },
  data() {
    return {
      editedTask: {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        subtasks: [],
      },
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        console.log("Prop 'task' recebida:", newTask); 
        if (newTask) {
          this.editedTask = {
            ...newTask,
            subtasks: newTask.subtasks
              ? newTask.subtasks.map((s) => ({ ...s }))
              : [],
          };
          console.log("editedTask montada:", this.editedTask); 
        }
      },
    },
  },
  methods: {
    addSubtask() {
      this.editedTask.subtasks.push({ title: "" });
      console.log("Subtarefa adicionada:", this.editedTask.subtasks); 
    },
    removeSubtask(index) {
      this.editedTask.subtasks.splice(index, 1);
      console.log(
        "Subtarefa removida. Lista atual:",
        this.editedTask.subtasks
      );
    },
    async updateTask() {
      try {
        console.log("Enviando para atualização:", this.editedTask); 
        await TaskService.update(this.editedTask.id, this.editedTask);
        console.log("Tarefa atualizada com sucesso."); 
        this.$emit("updated");
        this.$emit("close");

        toast.success("Tarefa atualizada com sucesso!", {
          position: "bottom-right",
          timeout: 5000,
          hideProgressBar: false,
          closeOnClick: false,
        });
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        toast.error("Erro ao atualizar tarefa. Tente novamente!", {
          position: "bottom-right",
        });
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  position: relative;
  background-color: #2d2d3a;
  color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
}

.modal-label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 12px;
  font-weight: bold;
}

select.modal-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='white' viewBox='0 0 24 24' width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 32px;
}

.input-subtask{
  margin-left: 0.3rem;
}

.modal-input,
.modal-textarea,
select {
  width: 100%;
  padding: 8px 12px;
  background-color: #1f1f29;
  border: 1px solid #444;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
}

.modal-textarea {
  resize: none;
  height: 80px;
  max-height: 80px;
}

.modal-input::placeholder,
.modal-textarea::placeholder {
  color: var(--color-card-text);
  opacity: 1;
}

.modal-input[type="date"] {
  color-scheme: dark; 
  color: var(--color-card-text); 
  padding-right: 10px;
  position: relative;
}

.modal-input[type="date"]::-webkit-calendar-picker-indicator {
  background-image: url("data:image/svg+xml,%3Csvg fill='%23646cff' xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right -5px center;
  background-size: 24px;
  opacity: 1;
  cursor: pointer;
  color: transparent;
}

.subtarefa-linha {
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 4px;
}

.subtarefas-wrapper {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  scroll-behavior: smooth;
}

.subtarefas-wrapper::-webkit-scrollbar {
  width: 6px;
}

.subtarefas-wrapper::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 4px;
}

.subtarefas-wrapper::-webkit-scrollbar-track {
  background-color: transparent;
}

.remover-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-card-text);
}

.remover-btn:hover {
  color: var(--color-primary);
}

.subtarefa-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  color: var(--color-primary);
  background: var(--color-text);
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px 12px;
}

.subtarefa-btn:hover {
  color: var(--color-text);
  background: var(--color-secondary);
}

.criar-btn {
  margin-top: 25px;
  margin-bottom: 10px;
  width: 100%;
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  padding: 9px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.criar-btn:hover {
  background-color: var(--color-secondary);
}

.fechar-modal {
  background: none;
  border: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: color 0.2s ease;
  margin-left: 2rem;
}

.fechar-modal:hover {
  color: var(--color-secondary);
}

/* === RESPONSIVIDADE === */

@media (max-width: var(--breakpoint-desktop)) {
  .modal-container {
    max-width: 500px;
  }
}

@media (max-width: var(--breakpoint-notebook)) {
  .modal-container {
    max-width: 480px;
  }
}

@media (max-width: var(--breakpoint-tablet)) {
  .modal-container {
    max-width: 90%;
    padding: 20px;
  }
}

@media (max-width: var(--breakpoint-smartphone)) {
  .modal-container {
    max-width: 95%;
    padding: 16px;
    border-radius: 10px;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal-input,
  .modal-textarea,
  select {
    font-size: 13px;
  }
}
</style>
