import React, { useState, useEffect } from 'react';

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const TaskItem = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { id: Date.now(), title: newTask, completed: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const TaskForm = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const TaskList = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Trabajo Final</h1>
      <h2>Asignar Tarea</h2>
      <div className="input-container">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
        <button onClick={TaskItem}>Asignar</button>
      </div>
      <h2>Lista de Tareas Asignadas</h2>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed-task' : ''}`}>
            <span>{task.title}</span>
            <button onClick={() => TaskForm(task.id)}>Eliminar</button>
            <button onClick={() => TaskList(task.id)}>{task.completed ? 'Desmarcar' : 'Completar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;