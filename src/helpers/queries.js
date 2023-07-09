const URL_TAREAS = import.meta.env.VITE_TAREAS

export const buscarTareas = async () => {
    try {
        const consulta = await fetch(URL_TAREAS);
        const respuesta = await consulta.json();
        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

export const crearTarea = async (tarea) => {
    try {
        const consulta = await fetch(URL_TAREAS,{
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(tarea)
        });
        return consulta;
    } catch (error) {
        console.log(error);
    }
}