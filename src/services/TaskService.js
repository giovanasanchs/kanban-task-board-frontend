import axios from "axios";

// Substitua pela URL do seu backend local ou do deploy
const API_URL = "http://localhost:8080/api/tasks";

const TaskService = {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async create(task) {
    const payload = {
      title: task.titulo,
      description: task.descricao,
      dueDate: task.dataVencimento,
      status: task.status,
      subtasks: (task.subtarefas || []).map((titulo) => ({
        title: titulo,
        completed: false,
      })),
    };

    return axios.post(API_URL, payload);
  },

  async update(id, task) {
    try {
      const payload = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate + "T23:59:59",
        status: task.status,
        subtasks: (task.subtasks || []).map((sub) => ({
          title: sub.title,
          completed: sub.completed,
        })),
      };
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao atualizar tarefa:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async updateSubtaskStatus(taskId, subtaskId, completed) {
    const response = await axios.put(
      `${API_URL}/${taskId}/subtasks/${subtaskId}`,
      { completed }
    );
    return response.data;
  },

  async delete(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  async getById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
};

export default TaskService;
