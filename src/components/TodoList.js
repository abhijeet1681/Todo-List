import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // State for filtering tasks by All, Completed, or Pending

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), completed: false, isEditing: false }]);
      setInput('');
    }
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const toggleEditMode = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Filter tasks based on the search query and selected filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Enter a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Section Tabs */}
      <div className="filter-tabs">
        <button
          onClick={() => setFilter('All')}
          className={filter === 'All' ? 'tab active' : 'tab'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={filter === 'Completed' ? 'tab active' : 'tab'}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('Pending')}
          className={filter === 'Pending' ? 'tab active' : 'tab'}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
              className="checkbox"
            />
            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(index, e.target.value)}
                className="edit-input"
              />
            ) : (
              <span className="task-text">{task.text}</span>
            )}
            <button
              className="edit-button"
              onClick={() => toggleEditMode(index)}
            >
              {task.isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              className="delete-button"
              onClick={() => deleteTask(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
