import { useEffect, useState } from 'react';

import './App.css';
import TaskForm from './componentes/TaskForm/TaskForm';
import TaskList from './componentes/TaskList/TaskList';
import TaskFilter from './componentes/TaskFilter/TaskFilter';

function App() {

	const [tasks, setTasks] = useState(() => {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : [];
	});
	
	const [filter, setFilter] = useState(() => {
		const storedFilter = localStorage.getItem('filter');
		return storedFilter ? storedFilter : '';
	});



	useEffect(() => { 
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	useEffect(() => { 
		localStorage.setItem('filter', filter);
	}, [filter]);



	const addFilter = (filter) => {
		setFilter(filter);
	}

	const addTask = (text) => {
		setTasks([...tasks, { text, completed: false }]);
	};

	const editTask = (index, text) => {
		setTasks(tasks.map((task, i) => i == index ? { text, completed: task.completed } : task ));
	};

	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};

	const toggleTask = (index) => {
		setTasks(tasks.map((task, i) =>
		i === index ? { ...task, completed: !task.completed } : task
		));
	};

  return (
	<div className="app">
		<h1>Gestión de Tareas - 2º DAW</h1>
		<TaskFilter  onAddFilter={addFilter} />
		<TaskForm filter={filter} onAddTask={addTask} />
		<TaskList
			tasks={tasks}
			onEditTask={editTask}
			onDeleteTask={deleteTask}
			onToggleTask={toggleTask}
			filter={filter}
		/>
	</div>
  );
}

export default App;