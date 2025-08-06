import React, { useEffect, useState, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../Api/Api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function Dashboard({ token, onLogout }) {
    const [tasks, setTasks] = useState([]);

    const loadTasks = useCallback(async () => {
        const res = await fetchTasks(token);
        setTasks(res.data);
    }, [token]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleAddTask = async (task) => {
        await createTask(task, token);
        loadTasks();
    };

    const handleToggleTask = async (task) => {
        const newStatus = task.status === "completed" ? "active" : "completed";
        await updateTask(task.id, { ...task, status: newStatus }, token);
        loadTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id, token);
        loadTasks();
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Dashboard</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="mb-4">
                        <TaskForm onAddTask={handleAddTask} />
                    </div>
                    <ul className="list-group mb-4">
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggleTask={() => handleToggleTask(task)}
                                onDeleteTask={() => handleDeleteTask(task.id)}
                            />
                        ))}
                    </ul>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
