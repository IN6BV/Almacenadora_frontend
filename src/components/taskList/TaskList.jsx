import React, { useState } from 'react';
import './taskList.css';
import { Input } from '../Input';

export const TaskList = ({ tareas, onDeleteTask }) => {
  const [taskIdToDelete, setTaskIdToDelete] = useState('');

  const handleDeleteClick = (taskId) => {
    setTaskIdToDelete(taskId);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(taskIdToDelete);
    setTaskIdToDelete('');
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete('');
  };

  return (
    <div className="container">
      <div className="tableContainer">
        <h2 className="caption">Tareas</h2>
        <div className="searchForm">
          <form>
            <Input
              field="empleadoAsignado"
              label="Tareas de un empleado"
              type="text"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
        <table className="crud-table">
          <thead>
            <tr className="crud-table__row">
              <th className="crud-table__header-cell">Titulo Tarea</th>
              <th className="crud-table__header-cell">Descripcion</th>
              <th className="crud-table__header-cell">Fecha Inicio</th>
              <th className="crud-table__header-cell">Fecha Final</th>
              <th className="crud-table__header-cell">Estado</th>
              <th className="crud-table__header-cell">Usuario Encargado</th>
              <th className="crud-table__header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea, index) => (
              <tr key={index} className="crud-table__row">
                <td className="crud-table__cell">{tarea.nombreTarea}</td>
                <td className="crud-table__cell">{tarea.descripcionTarea}</td>
                <td className="crud-table__cell">{tarea.fechaCreacion}</td>
                <td className="crud-table__cell">{tarea.fechaFinalizacion}</td>
                <td className="crud-table__cell">
                  <button>{tarea.estado}</button>
                </td>
                <td className="crud-table__cell">{tarea.empleadoAsignado}</td>
                <td className="crud-table__cell">
                  <button className='oa' onClick={() => handleDeleteClick(tarea._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {taskIdToDelete && (
          <div className="floating-dialog">
            <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
            <button onClick={handleConfirmDelete}>Sí</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};