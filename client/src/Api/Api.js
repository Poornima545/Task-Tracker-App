import axios from "axios";

const api_url = 'http://localhost:5000/api';

export const register = async (user) => {
    return await axios.post(`${api_url}/register`, user);
};

export const login = (user) => {
    return axios.post(`${api_url}/login`, user);
};

export const fetchTasks = (token) => {
    return axios.get(`${api_url}/tasks`, {
        headers: {
            "Authorization": token
        }
    });
};

export const createTask = (task, token) => {
    return axios.post(`${api_url}/tasks`, task, {
        headers: {
            "Authorization": token
        }
    });
};

export const updateTask = (id, task, token) => {
    return axios.put(`${api_url}/tasks/${id}`, task, {
        headers: {
            'Authorization': token
        }
    });
};

export const deleteTask = (id, token) => {
    return axios.delete(`${api_url}/tasks/${id}`, {
        headers: {
            "Authorization": token
        }
    });
};

export const forgotPassword = (email) => {
    return axios.get(`${api_url}/forgot-password`, {
        params: { email }
    });
};
