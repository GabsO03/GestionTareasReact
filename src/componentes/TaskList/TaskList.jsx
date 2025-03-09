import { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

function TaskList({ filter = null}) {
  const { tasks, editTask, deleteTask, toggleTask } = useContext(TaskContext)
  let filteredTasks = tasks;

  if (filter) {
    const actualFilter = filter === 'true' ? true : false;
    filteredTasks = tasks.filter((task) => task.completed === actualFilter);
  }

  const editButton = async (index, text) => {
    const { value: newContent } = await Swal.fire({
      title: "Edita la tarea",
      input: "text",
      inputLabel: "Contenido de la tarea",
      inputValue: text
    });
    if (newContent) {
      editTask(index, newContent)
    }
  }


  return (
    <ul>
      {filteredTasks.map((task, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(index)}
          />
          <span style={{
            textDecoration: task.completed ? 'line-through' : 'none'
              }}>
            {task.text}
          </span>
          <button class="edit" onClick={() => editButton(index, task.text)}>
            Editar
          </button>
          <button onClick={() => deleteTask(index)}>
            Eliminar
          </button>
        </li>
        ))}
      </ul>
      );
}

export default TaskList;