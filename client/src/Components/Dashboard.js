import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../Api/Api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function Dashboard({ token, onLogout }) {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const res = await fetchTasks(token);
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAddTask = async (task) => {
        await createTask(task, token);
        loadTasks();
    };

    const handleToggleTask = async (task) => {
        const newStatus = task.status === "complted" ? "active" : "completed"
        await updateTask(task.id, { ...task, status: newStatus }, token);
        loadTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id, token);
        loadTasks();
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={onLogout}>Logout</button>
            <TaskForm onAddTask={handleAddTask} />
            <ul>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleTask={() => handleToggleTask(task)}
                        onDeleteTask={() => handleDeleteTask(task.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
