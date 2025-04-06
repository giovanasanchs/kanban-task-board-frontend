<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2 class="modal-title">{{ task.title }}</h2>
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: Object,
});
defineEmits(["close"]);

const completedSubtasks = computed(() => {
  if (!props.task?.subtasks) return 0;
  return props.task.subtasks.filter((s) => s.done).length;
});
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

.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
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
</style>
