import React, { useEffect, useState } from "react";
import { getTasks, updateTask, createTask } from "../services/task";
import { logout } from "../services/auth";
import "../styles/Dashboard.css";


const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks.filter((c) => !c.completed));
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

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== id)
            );
        } catch (err) {
            setError("Erro ao completar a tarefa.");
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.title || !newTask.description) {
            setError("Título e descrição são obrigatórios.");
            return;
        }

        try {
            const createdTask = await createTask(newTask);
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setNewTask({ title: "", description: "" });
        } catch (err) {
            setError("Erro ao criar tarefa.");
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Bem-vindo ao Dashboard</h2>
                <button className="btn logout-btn" onClick={handleLogout}>
                    Logoff
                </button>
            </header>

            {error && <p className="error-message">{error}</p>}

            <section className="task-section">
                <h3>Tarefas Incompletas</h3>
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <button
                                className="btn complete-btn"
                                onClick={() => handleCompleteTask(task.id)}
                            >
                                Marcar como Completa
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="new-task-section">
                <h3>Criar Nova Tarefa</h3>
                <div className="new-task-form">
                    <input
                        type="text"
                        placeholder="Título"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                    />
                    <textarea
                        placeholder="Descrição"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                    <button className="btn create-btn" onClick={handleCreateTask}>
                        Criar Tarefa
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
