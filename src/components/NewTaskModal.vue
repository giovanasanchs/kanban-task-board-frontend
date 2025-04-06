<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <h2 class="modal-title">Adicionar Nova Tarefa</h2>

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
        <button @click="removerSubtarefa(index)" class="remover-btn">✕</button>
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

      <button class="fechar-modal" @click="$emit('close')">✕</button>

      <!-- Botão de criar -->
      <button @click="criarTarefa" class="criar-btn">Criar Tarefa</button>
    </div>
  </div>
</template>

<script setup>
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

  // Aqui você pode emitir um evento ou integrar com seu store
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
  background-color: #2d2d3a;
  color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.modal-label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 12px;
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

.remover-btn {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 18px;
  cursor: pointer;
}

.remover-btn:hover {
  color: #ff4c4c;
}

.subtarefa-btn {
  margin-top: 10px;
  font-size: 14px;
  color: #9b7cff;
  background: none;
  border: none;
  cursor: pointer;
}

.subtarefa-btn:hover {
  text-decoration: underline;
}

.criar-btn {
  margin-top: 20px;
  width: 100%;
  background-color: #7a5df0;
  color: #fff;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.criar-btn:hover {
  background-color: #644ee0;
}
.fechar-modal {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
