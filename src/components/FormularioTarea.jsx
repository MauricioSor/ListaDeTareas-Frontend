import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { crearTarea } from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormularioTarea = ({tarea}) => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();

  const [tareas, setTareas] = useState([]);

  const guardar = (tareaNueva) => {
    crearTarea(tareaNueva).then((respuesta) => {
      if (respuesta.status == 200) {
        Swal.fire('Tarea Guardada', 'Guardado Exitoso', 'success')
        reset();
      } else {
        Swal.fire('Error al Guardar', `El producto no se guardó`, 'error');
      }
    });
  }
  const borrarTarea = (nombreTarea) => {
    let copiaTareas = tareas.filter((itemTarea) => itemTarea !== nombreTarea);
    setTareas(copiaTareas);
  }
  return (
    <>
      <Form onSubmit={handleSubmit(guardar)}>
      <Form.Text className="text-danger">
            {errors.tarea?.message}
          </Form.Text>
        <Form.Group className="mb-3 d-flex justify-content-center">
          <Form.Control
            type="text"
            placeholder="ingrese una tarea"
            {...register('tarea', {
              required: "Ingrese una tarea"
              , minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 1"
              },
              maxLength: {
                value: 16
                , message: "La cantidad máxima de caracteres es 20"
              }
            })}
          />
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </Form.Group>
      </Form>
      <ListaTareas tarea={tarea} borrarTarea={borrarTarea}></ListaTareas>
    </>
  );
};

export default FormularioTarea;
