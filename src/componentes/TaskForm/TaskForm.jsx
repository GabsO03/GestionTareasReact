import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
	e.preventDefault();
	if (taskText.trim()) {
  	onAddTask(taskText);
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