import { useState, useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

function TaskForm() {
  const [taskText, setTaskText] = useState(''); //Declaramos la variable que tendrá el valor del texto para la nueva tarea

  const { addTask } = useContext(TaskContext); //Cogemos la función para añadir tarea que declaramos previamente en el taskcontext
  //Solo cogemos el de añadir porque este solo es el form para añdir, los demás lo usamos en el listado

  const handleSubmit = (e) => {
	//Aquí prevenimos que se envíe el formulario
	e.preventDefault();

	//Le quitamos los espacios al texto para añadirlo a la tarea y luego limpiamos la variable
	if (taskText.trim()) {
		addTask(taskText);
		setTaskText('');
	}
  };

  return (
	<form onSubmit={handleSubmit}>
  	<input
    	type="text"
    	value={taskText}
    	onChange={(e) => setTaskText(e.target.value)}
    	placeholder="Nueva tarea..."
  	/>
  	<button type="submit">Añadir Tarea</button>
	</form>
  );
}

export default TaskForm;