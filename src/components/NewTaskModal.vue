<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">Adicionar Nova Tarefa</h2>
        <button class="fechar-modal" @click="$emit('close')">
          <PhX :size="20" color="#fff" weight="bold" />
        </button>
      </div>

      <!-- Título -->
      <label class="modal-label">Título</label>
      <input
        v-model="titulo"
        type="text"
        placeholder="Ex: Pausa para café"
        class="modal-input"
      />

      <!-- Descrição -->
      <label class="modal-label">Descrição</label>
      <textarea
        v-model="descricao"
        placeholder="Ex: Uma pausa de 15 minutos ajuda a recarregar as energias"
        class="modal-textarea"
      />

      <!-- Data de vencimento -->
      <label class="modal-label">Data de Vencimento</label>
      <input v-model="dataVencimento" type="date" class="modal-input" />

      <!-- Subtarefas -->
      <label class="modal-label">Subtarefas</label>
      <div class="subtarefas-wrapper">
        <div
          v-for="(sub, index) in subtarefas"
          :key="index"
          class="subtarefa-linha"
        >
          <input
            v-model="sub.texto"
            type="text"
            placeholder="Ex: Fazer café"
            class="modal-input"
          />
          <button @click="removerSubtarefa(index)" class="remover-btn">
            <PhX :size="20" color="#fff" weight="bold" />
          </button>
        </div>
      </div>

      <button @click="adicionarSubtarefa" class="subtarefa-btn">
        + Adicionar Nova Subtarefa
      </button>

      <!-- Status -->
      <label class="modal-label">Status</label>
      <select v-model="status" class="modal-input">
        <option>Todo</option>
        <option>Em Progresso</option>
        <option>Concluído</option>
      </select>

      <!-- Botão de criar -->
      <button @click="criarTarefa" class="criar-btn">Criar Tarefa</button>
    </div>
  </div>
</template>

<script setup>
import {PhX} from '@phosphor-icons/vue'
import { ref } from "vue";

const titulo = ref("");
const descricao = ref("");
const dataVencimento = ref("");
const status = ref("Todo");
const subtarefas = ref([{ texto: "" }]);

const adicionarSubtarefa = () => {
  subtarefas.value.push({ texto: "" });
};

const removerSubtarefa = (index) => {
  subtarefas.value.splice(index, 1);
};

const criarTarefa = () => {
  const novaTarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
    dataVencimento: dataVencimento.value,
    status: status.value,
    subtarefas: subtarefas.value
      .map((sub) => sub.texto)
      .filter((t) => t.trim() !== ""),
  };
  console.log("Tarefa criada:", novaTarefa);
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
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 22px;
}

.modal-label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 12px;
  font-weight: bold;
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
  resize: vertical;
  min-height: 60px;
}

.subtarefa-linha {
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
}

.subtarefas-wrapper {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.remover-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
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
}

.fechar-modal:hover {
  color: var(--color-secondary);
}
</style>
