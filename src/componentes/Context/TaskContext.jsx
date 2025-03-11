import { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    //Creo la variable task y su setter que será el array de las tareas
    const [tasks, setTasks] = useState([]);

    //Aquí recojo las tareas mediante un fetch comprobando antes que haya un usuario loggeado para no cargar innecesariamente
    useEffect(() => {
        if (localStorage.getItem('loggeado') === 'true') {
            fetch('/tareas.json')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                console.log(data);
            })
            .catch(error => console.error('No se pudo cargar las tareas ', error));
        }
    }, []); //La dependencia vacía para que se ejecute al inicio

    //Aquí guardo las tareas cada vez que haya un cambio
    useEffect(() => {
        fetch('/tareas.json', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks) //Las pasamos a json
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo guardar las tareas');
            }
            return response.json();
        })
        .catch(error => console.error('Error:', error));
    }, [tasks]);

    const addTask = (text) => { //Esto es para añadir una tarea
        setTasks([...tasks, { text, completed: false }]);
    };

    const editTask = (index, text) => { //Esto es para editar una tarea
        setTasks(tasks.map((task, i) => i == index ? { text, completed: task.completed } : task ));
    };

    const deleteTask = (index) => { //Esto es para eliminar una tarea
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTask = (index) => { //Aquí marcamos o desmarcamos una tarea dependiendo de su estado actual
        setTasks(tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        //Aquí les pasamos las funciones y variable mediante el provider
        //No pasamos el filtro ya que solo necesitamos el crud de las tareas
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTask }}>
        {children}
        </TaskContext.Provider>
    );
}
