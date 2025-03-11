import { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

function TaskList({ filter = null}) {

  //Cogemos las variables que nos da el taksprovider
  const { tasks, editTask, deleteTask, toggleTask } = useContext(TaskContext);
  //Y para el filtrado rellenamos las tareas en otra variable que luego vamos a filtrar según si hay filtro y cual
  let filteredTasks = tasks; //Lo copiamos en lugar de usar la misma porque no quería que el original se quede sin las otras tareas

  if (filter) {
    const actualFilter = filter === 'true' ? true : false; //operador ternario para parsear a boolean el filtro
    filteredTasks = tasks.filter((task) => task.completed === actualFilter); //Filtramos la copia
  }

  //En esta función edita la tarea
  const editButton = async (index, text) => {//Le pasa ek index para saber cual editar y el nuevo texto
    
    //El swal fire viene de la paágina de sweet alert, que son componentes para mostrar alertas bonitas
    //Lo usamos para que recoja el valor para editar
    const { value: newContent } = await Swal.fire({ //Cogemos el valor que nos devuelve que será el nuevo texto de la tarea
      title: "Edita la tarea",
      input: "text",
      inputLabel: "Contenido de la tarea",
      inputValue: text
    });
    if (newContent) { //Si hay algo lo edita, esto para que no se quede la tarea vacía
      editTask(index, newContent)
    }
  }


  return (
    <ul>
      {filteredTasks.map((task, index) => ( //Como aquí ya lo filtramos, no necesitamos hacer compobración más que para el estilo
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