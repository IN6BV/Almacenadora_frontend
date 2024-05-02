// @ts-ignore
import './dashboardPage.css'
import { TaskList } from '../../components/taskList/TaskList.jsx'
import { obtenerTareas, eliminarTarea } from '../../services/'
import { useEffect, useState } from 'react'

export const DashboardPage = () => {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const listTasks = async () => {
            try {
                const response = await obtenerTareas();
                console.log('Respuesta de obtenerTareas:', response.data.tasks);
                if (!response.error) {
                    setTareas(response.data.tasks || [])
                } else {
                    console.log('Error', response.data)
                }
            } catch (error) {
                console.log('Error', error)
            }
        };
        listTasks();
    },[]);
    const handleDeleteTask = async (taskId) => {
        try {
            const response = await eliminarTarea(taskId);
            if (!response.error) {
                // Filtrar las tareas para eliminar la tarea con el ID correspondiente
                const updatedTasks = tareas.filter(task => task._id !== taskId);
                setTareas(updatedTasks);
                console.log('Tarea eliminada correctamente');
            } else {
                console.log('Error', response.data);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <div>
            <TaskList tareas={tareas} onDeleteTask={handleDeleteTask} />
        </div>
    );
}