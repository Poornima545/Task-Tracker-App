function TaskItem({ task, onToggleTask, onDeleteTask }) {
    return (
        <li style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
            {task.title} - {task.description}
            <button onClick={onToggleTask}>
                {task.status === 'completed' ? 'Undo' : 'Complete'}
            </button>
            <button onClick={onDeleteTask}>Delete</button>
        </li>
    );
}

export default TaskItem;
