import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../services/task";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (err) {
                setError("Erro ao carregar tarefas.");
            }
        };

        loadTasks();
    }, []);

    const handleCompleteTask = async (id) => {
        try {
            const updatedTask = tasks.find((task) => task.id === id);
            updatedTask.completed = true;

            await updateTask(id, updatedTask);

            // Atualiza a lista de tarefas localmente
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== id)
            );
        } catch (err) {
            setError("Erro ao completar a tarefa.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Tarefas Incompletas</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button
                            className="btn"
                            onClick={() => handleCompleteTask(task.id)}
                        >
                            Marcar como Completa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
