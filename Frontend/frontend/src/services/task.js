import API_URL from "../config";
import { getToken } from "./auth"; 

export const getTasks = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar tarefas");
    }

    return response.json();
};



export const updateTask = async (id, updatedTask) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa.");
    }

    return response.json();
};
