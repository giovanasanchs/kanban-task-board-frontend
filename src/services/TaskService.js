import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

const TaskService = {
  async getAll() {
    const response = await api.get("/tasks");
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

    return api.post("/tasks", payload);
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
      const response = await api.put(`/tasks/${id}`, payload);
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
    const response = await api.put(`/tasks/${taskId}/subtasks/${subtaskId}`,
      { completed }
    );
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
};

export default TaskService;
