import { useState } from "react"
import DatePicker from "react-date-picker"
import { Input } from "../Input"
const inputs = [
    {
        field: "nombreTarea",
        label: "NombreTarea",
        validationMessage: "",
        type: "text"
    },
    {
        field: "descripcionTarea",
        label: "DescripcionTarea",
        validationMessage: "",
        type: "text"
    },
    {
        field: "empleadoAsignado",
        label: "EmpleadoAsignado",
        validationMessage: "",
        type: "text"
    }
]
export const FormAdd = ({ settings, saveSettings }) => {
    const [formState, setFormState] = useState({
        nombreTarea: {
            isValid: "",
            showError: false,
            value: ""
        },
        descripcionTarea: {
            isValid: "",
            showError: false,
            value: ""
        },
        empleadoAsignado: {
            isValid: "",
            showError: false,
            value: ""
        },

    })
const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
         ...prevState,
        [field]: {
        ...prevState[field],
        value,
        }
    }))
}
const handleInputValidationOnBlur = (value, field) =>{
    let isValid = false;
    switch (field) {
        case "nombreTarea":
            break;
        case "descripcionTarea":
            break;
        case "empleadoAsignado":
            break;
        default:
            break;
    }
    setFormState((prevState) =>({
        ...prevState,
        [field]:{
            ...prevState[field],
            isValid,
            showError: !isValid
        }
    }))
};
const handleFormSubmit = (event) =>{
    event.preventDefault()
    saveSettings({
        nombreTarea: formState.nombreTarea.value,
        descripcionTarea: formState.descripcionTarea.value,
        empleadoAsignado: formState.empleadoAsignado.value
    })

    console.log(formState)
}

const isSubmitButtonDisabled = !formState.nombreTarea.isValid ||
                               !formState.descripcionTarea.isValid ||
                               !formState.empleadoAsignado.isValid
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
                    textArea={input.textArea}
                />
            ))}
            <DatePicker/>
            <DatePicker/>
        </div>
        <div>   
            <a>Fecha Inicio</a>
            <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                Guardar
            </button>
            <a>Fecha Finalizacion</a>
            <button>
                Cancelar
            </button>
        </div>
    </form>
)
}
