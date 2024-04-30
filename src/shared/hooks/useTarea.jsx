import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarTarea as agregarTareaService } from "../../services";
import toast from "react-hot-toast";

export const useTarea = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const agregarTarea = async (nombreTarea, descripcionTarea, fechaCreacion, fechaFinalizacion, empleadoAsignado) => {
        setIsLoading(true);

        const response = await agregarTareaService({
            nombreTarea,
            descripcionTarea,
            fechaCreacion,
            fechaFinalizacion,
            empleadoAsignado
        });
        
        setIsLoading(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al agregar la tarea'
            )
        }

        toast.success('Tarea agregada correctamente');
        navigate('/');
    }

    return {
        agregarTarea,
        isLoading
    }
}