import React, { useState, useEffect } from 'react';
import './taskList.css';
import { Input } from '../Input';
import { actualizarEstadoTarea, buscarEmpleado } from '../../services/api';

export const TaskList = ({ tareas, onDeleteTask }) => {
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [formState, setFormState] = useState({
    empleadoAsignado: {
      value: '',
      isValid: false,
      showError: false
    }
  });
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [tareasOriginales, setTareasOriginales] = useState([]);
  const [mostrarTablaBusqueda, setMostrarTablaBusqueda] = useState(false);
  const [mostrarBotonRecargar, setMostrarBotonRecargar] = useState(false);
  const [mostrarMensajeNoElementos, setMostrarMensajeNoElementos] = useState(false);

  useEffect(() => {
    setTareasFiltradas(tareas);
    setTareasOriginales(tareas);
  }, [tareas]);

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

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'empleadoAsignado':
        isValid = value.trim() !== '';
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('Buscando empleado:', formState.empleadoAsignado.value);
    try {
      const response = await buscarEmpleado(formState.empleadoAsignado.value);
      console.log('Respuesta de buscarEmpleado:', response);
      if (!response.error) {
        setTareasOriginales(response.data.tasks);
        setTareasFiltradas(response.data.tasks);
        setMostrarTablaBusqueda(true);
        setMostrarBotonRecargar(true);
        setMostrarMensajeNoElementos(response.data.tasks.length === 0);
      } else {
        console.error('Error al buscar empleado:', response.error);
      }
    } catch (error) {
      console.error('Error al buscar empleado:', error);
    }
  };

  const handleRecargar = () => {
    window.location.reload(); 
  };

  const handleEstadoTarea = async (taskId, estadoActual) => {
    try {
      const nuevasTareas = tareasOriginales.map(tarea => {
        if (tarea._id === taskId) {
          return {
            ...tarea,
            estado: !estadoActual
          };
        }
        return tarea;
      });

      setTareasFiltradas(nuevasTareas);

      await actualizarEstadoTarea(taskId, !estadoActual);

    } catch (error) {
      console.error('Error al cambiar estado de la tarea:', error);
    }
  };

  return (
    <div className="container">
      <div className="tableContainer">
        <h2 className="caption">Tareas</h2>
        <div className="searchForm">
          <form onSubmit={handleSearch}>
            <Input
              field="empleadoAsignado"
              label="Usuario encargado a buscar:"
              type="text"
              value={formState.empleadoAsignado.value}
              onChangeHandler={handleInputValueChange}
              onBlurHandler={handleInputValidationOnBlur}
            />
            <button type="submit" className='oa'>Buscar</button>
            {mostrarBotonRecargar && (
              <button onClick={handleRecargar}>Regresar</button>
            )}
          </form>
        </div>
        {!mostrarTablaBusqueda && (
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
              {tareasFiltradas.map((tarea, index) => (
                <tr key={index} className="crud-table__row">
                  <td className="crud-table__cell">{tarea.nombreTarea}</td>
                  <td className="crud-table__cell">{tarea.descripcionTarea}</td>
                  <td className="crud-table__cell">{new Date(tarea.fechaCreacion).toLocaleDateString()}</td>
                  <td className="crud-table__cell">{new Date(tarea.fechaFinalizacion).toLocaleDateString()}</td>
                  <td className="crud-table__cell">
                    <button onClick={() => handleEstadoTarea(tarea._id, tarea.estado)}>
                      {tarea.estado ? 'Completada' : 'Incompleta'}
                    </button>
                  </td>
                  <td className="crud-table__cell">{tarea.empleadoAsignado}</td>
                  <td className="crud-table__cell">
                    <button className='oa' onClick={() => handleDeleteClick(tarea._id)}>Eliminar</button>
                    <button className='oa' >Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {taskIdToDelete && (
          <div className="floating-dialog">
            <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
            <button onClick={handleConfirmDelete}>Sí</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        )}
        {mostrarTablaBusqueda && (
          <div className="searchResultTable">
            <h3>Resultados de la búsqueda</h3>
            <table className="search-result-table">
              <thead>
                <tr className="crud-table">
                  <th className="crud-table__header-cell">Título de la Tarea</th>
                  <th className="crud-table__header-cell">Descripción</th>
                  <th className="crud-table__header-cell">Fecha de Inicio</th>
                  <th className="crud-table__header-cell">Fecha de Finalización</th>
                  <th className="crud-table__header-cell">Estado</th>
                  <th className="crud-table__header-cell">Usuario Encargado</th>
                </tr>
              </thead>
              <tbody>
                {mostrarMensajeNoElementos ? (
                  <tr>
                    <td colSpan="6">No se encontraron elementos.</td>
                  </tr>
                ) : (
                  tareasFiltradas.map((tarea, index) => (
                    <tr key={index} className="crud-table__row">
                      <td className="crud-table__cell">{tarea.nombreTarea}</td>
                      <td className="crud-table__cell">{tarea.descripcionTarea}</td>
                      <td className="crud-table__cell">{new Date(tarea.fechaCreacion).toLocaleDateString()}</td>
                      <td className="crud-table__cell">{new Date(tarea.fechaFinalizacion).toLocaleDateString()}</td>
                      <td className="crud-table__cell">
                        <button onClick={() => handleEstadoTarea(tarea._id, tarea.estado)}>
                          {tarea.estado ? 'Completada' : 'Incompleta'}
                        </button>
                      </td>
                      <td className="crud-table__cell">{tarea.empleadoAsignado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
