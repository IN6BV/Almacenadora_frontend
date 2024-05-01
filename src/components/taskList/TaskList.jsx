import React, { useState } from 'react';
import './taskList.css';
import { Input } from '../Input';

export const TaskList = () => {
  const [formState, setFormState] = useState({
    empleadoAsignado: {
      value: '',
      isValid: false,
      showError: false,
    },
    deleteConfirmation: {
      isOpen: false,
      taskId: null,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'empleadoAsignado':
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };
  let tareas = [
    {
      id: 1,
      title: 'Ejemplo UwU',
      descripcion: 'Descripcion de tarea',
      fechaInicio: '2024-04-30',
      fechaFinal: '2024-05-10',
      usuarioEncargado: 'Usuario 1',
    },
  ];

  const handleDelete = (id) => {
    setFormState((prevState) => ({
      ...prevState,
      deleteConfirmation: {
        isOpen: true,
        taskId: id,
      },
    }));
  };

  const handleCloseModal = () => {
    setFormState((prevState) => ({
      ...prevState,
      deleteConfirmation: {
        isOpen: false,
        taskId: null,
      },
    }));
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
              value={formState.empleadoAsignado.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
        <table className="crud-table">
          <thead>
            <tr className="crud-table__row">
              <th className="crud-table__header-cell">Id</th>
              <th className="crud-table__header-cell">Titulo Tarea</th>
              <th className="crud-table__header-cell">Descripcion</th>
              <th className="crud-table__header-cell">Fecha Inicio</th>
              <th className="crud-table__header-cell">Fecha Final</th>
              <th className="crud-table__header-cell">Usuario Encargado</th>
              <th className="crud-table__header-cell">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="crud-table__row">
                <td className="crud-table__cell">{tarea.id}</td>
                <td className="crud-table__cell">{tarea.title}</td>
                <td className="crud-table__cell">{tarea.descripcion}</td>
                <td className="crud-table__cell">{tarea.fechaInicio}</td>
                <td className="crud-table__cell">{tarea.fechaFinal}</td>
                <td className="crud-table__cell">{tarea.usuarioEncargado}</td>
                <td className="crud-table__cell">
                  <button
                    className="crud-button crud-button--negative"
                    onClick={() => handleDelete(tarea.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formState.deleteConfirmation.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>¿Estás seguro de querer eliminar esta tarea?</p>
            <button
              className="crud-button crud-button--negative"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="crud-button crud-button--positive"
              onClick={handleCloseModal}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
