import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:3000/almtesoro/v1",
    timeout: 5000
});

export const agregarTarea = async (data) => {
    try {
        return await api.post('/task/create', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const obtenerTareas = async () => {
    try {
        return await api.get('/task')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const eliminarTarea = async (id) => {
    try {
        return await api.delete(`/task/delete/${id}`)
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

