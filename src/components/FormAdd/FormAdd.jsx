import { useState } from "react"
import { Input } from "../Input"
import { useTarea } from "../../shared/hooks"

const inputs = [
    {
        field: "nombreTarea",
        label: "Nombre de la tarea",
        validationMessage: "El nombre de la tarea es requerido",
        type: 'text',
    },
    {
        field: "descripcionTarea",
        label: "Descripcion de la tarea",
        validationMessage: "La descripcion de la tarea es requerida",
        type: 'text',
    },
    {
        field: "fechaCreacion",
        label: "Fecha de inicio de la tarea",
        validationMessage: "La fecha de inicio de la tarea es requerida",
        type: 'date',
    },
    {
        field: "fechaFinalizacion",
        label: "Fecha de finalizacion de la tarea",
        validationMessage: "La fecha de finalizacion de la tarea es requerida",
        type: 'date',
    },
    {
        field: "empleadoAsignado",
        label: "Persona asignada a la tarea",
        validationMessage: "La persona asignada a la tarea es requerida",
        type: 'text',
    }
]

export const FormAdd = () => {
    const {agregarTarea, isLoading} = useTarea();

    const [formState, setFormState] = useState({
        nombreTarea: {
            value: '',
            isValid: false,
            showError: false
        },
        descripcionTarea: {
            value: '',
            isValid: false,
            showError: false
        },
        fechaCreacion: {
            value: '',
            isValid: false,
            showError: false
        },
        fechaFinalizacion: {
            value: '',
            isValid: false,
            showError: false
        },
        empleadoAsignado: {
            value: '',
            isValid: false,
            showError: false
        }
    });
    
    const handleInputValueChange = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    }

    const handleInputValidationOnBlur = (field) => {
        let isValid = false;

        switch (field) {
            case 'nombreTarea':
                isValid = formState.nombreTarea.value.trim() !== '';
                break;
            case 'descripcionTarea':
                isValid = formState.descripcionTarea.value.trim() !== '';
                break;
            case 'fechaCreacion':
                isValid = formState.fechaCreacion.value.trim() !== '';
                break;
            case 'fechaFinalizacion':
                isValid = formState.fechaFinalizacion.value.trim() !== '';
                break;
            case 'empleadoAsignado':
                isValid = formState.empleadoAsignado.value.trim() !== '';
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
        }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const response = await agregarTarea(formState.nombreTarea.value,
                                            formState.descripcionTarea.value,
                                            formState.fechaCreacion.value,
                                            formState.fechaFinalizacion.value, 
                                            formState.empleadoAsignado.value)
    window.location.reload();
    }

    const isSubmitButtonDisabled = isLoading || !formState.nombreTarea.isValid ||
                                                !formState.descripcionTarea.isValid ||
                                                !formState.fechaCreacion.isValid ||
                                                !formState.fechaFinalizacion.isValid || 
                                                !formState.empleadoAsignado.isValid;

return (
    <form>
        <div>
            {inputs.map((input) =>(
                <Input
                    key={input.field}
                    field={input.field}
                    label={input.label}
                    value={formState[input.field].value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState[input.field].showError}
                    validationMessage={input.validationMessage}
                    type={input.type}
                />
            ))}
        </div>
        <div>   
            <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                Guardar Tarea
            </button>
            <button>
                Cancelar
            </button>
        </div>
    </form>
)
}
