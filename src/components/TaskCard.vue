<template>
  <div class="task-card">
    <h3 class="task-title">{{ task.title }}</h3>
    <p class="task-desc">{{ task.description }}</p>
    <p class="task-date">{{ new Date(task.dueDate + "T00:00:00").toLocaleDateString("pt-BR") }}</p>

    <div class="task-subtarefa" v-if="task.subtasks.length">
      {{ task.subtasks.filter((s) => s.completed).length }} de
      {{ task.subtasks.length }} subtarefas concluídas
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  }
});
console.log(props.task.subtasks)
</script>

<style scoped>
.task-card {
  background-color: var(--color-card);
  padding: 20px;
  border-radius: 8px;
  border-left: 5px solid var(--color-secondary);
  border-right: 1.5px solid var(--color-border);
  border-bottom: 1.5px solid var(--color-border);
  border-top: 1.5px solid var(--color-border);
  cursor: pointer;
}

.task-title {
  font-weight: bold;
  margin: 0 0 6px;
  color: var(--color-card-title);
}

.task-desc {
  font-size: 14px;
  color: var(--color-card-text);
}
.task-date{
  margin-top: 0.4rem;
  font-size: 14px;
  font-weight: bold;
  color: #df8643;
}
.task-subtarefa{
  margin-top: 1rem;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-card-text);
}
</style>
