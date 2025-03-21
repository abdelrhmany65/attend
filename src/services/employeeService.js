import axios from "axios";

const API_BASE_URL = "http://192.168.1.9:3003";

// Fetch all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.users || response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// Fetch an employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

// Update an employee's data
export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Change password
export const changePassword = async (id, currentPassword, newPassword) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    const user = response.data;

    if (user.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    const updatedUser = { ...user, password: newPassword };
    const updateResponse = await axios.put(`${API_BASE_URL}/users/${id}`, updatedUser);

    return updateResponse.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
