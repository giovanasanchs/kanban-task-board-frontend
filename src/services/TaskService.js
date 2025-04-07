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
      subtasks: (task.subtarefas || []).map(titulo => ({
        title: titulo,
        completed: false
      }))
    };
  
    return axios.post(API_URL, payload);
  },

  async update(id, task) {
    const payload = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      subtasks: (task.subtasks || []).map((sub) => ({
        title: sub.title,
        completed: sub.completed,
      })),
    };
    const response = await axios.put(`${API_URL}/${id}`, payload);
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
