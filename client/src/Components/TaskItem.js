import React from 'react';

function TaskItem({ task, onToggleTask, onDeleteTask }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className={task.status === 'completed' ? 'text-decoration-line-through' : ''}>
                {task.title}
            </span>
            <div>
                <button
                    className="btn btn-sm btn-success me-2"  // 'me-2' adds right margin
                    onClick={onToggleTask}
                >
                    {task.status === 'completed' ? 'Undo' : 'Complete'}
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={onDeleteTask}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
