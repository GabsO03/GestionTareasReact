import { useEffect, useState, useContext } from 'react';
import { TaskProvider } from './componentes/Context/TaskContext';
import { AuthContext } from './componentes/Context/AuthContext';

import './App.css';
import TaskForm from './componentes/TaskForm/TaskForm';
import TaskList from './componentes/TaskList/TaskList';
import TaskFilter from './componentes/TaskFilter/TaskFilter';
import Login from './componentes/Login/Login';

function App() {
	const { loggeado, logout } = useContext(AuthContext);//

	const [filter, setFilter] = useState(() => {
		const storedFilter = localStorage.getItem('filter');
		return storedFilter ? storedFilter : '';
	});

	useEffect(() => { 
		localStorage.setItem('filter', filter);
	}, [filter]);


	const addFilter = (filter) => {
		setFilter(filter);
	}

	//Envolvemos nuestra app con el taksprovider para poder usar sus variables
	return (
		<TaskProvider>
		<div className="app">
			<button onClick={logout} >Salir</button>
			<h1>Gestión de Tareas - 2º DAW</h1>
			{loggeado ? ( //Loggeado viene del main que es donde evuelvo todo para tener la variable y dependiendo de esta muestro una cosa u otra
			<>
				<TaskFilter onAddFilter={addFilter} />
				<TaskForm filter={filter} />
				<TaskList filter={filter} />
			</>
			) : (
				<Login />
			)}
		</div>
		</TaskProvider>
	);
}

export default App;