import axios from "axios";

// Update this baseURL with your backend API's base URL
const baseURL = "http://localhost:4001";

export const getTodos = async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

export const createTodo = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/todos`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
};

export const deleteTodo = async (todoId) => {
  try {
    await axios.delete(`${baseURL}/todos/${todoId}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
