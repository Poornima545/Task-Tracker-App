import React from 'react'

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  return (
    <li>
      <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
        {task.title} - {task.description}
      </span>
      <button onClick={onToggleTask}>{task.status === 'completed' ? 'Undo' : 'Complete'}</button>
      <button onClick={onDeleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;