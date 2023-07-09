import { Form, Button,Spinner } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { crearTarea, buscarTareas } from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormularioTarea = () => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();
  const [tarea, setTarea] = useState([]);
  const[spinner,setMostrarSpinner]= useState(true);
  
  const guardar = (tareaNueva) => {
    console.log(tareaNueva)
    crearTarea(tareaNueva).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire('Tarea Guardada', 'Guardado Exitoso', 'success')
        reset();
        window.localate
      } else {
        Swal.fire('Error al Guardar', `El producto no se guardó`, 'error');
      }
    });
  }

  const cargar = () => {
    buscarTareas().then((respuesta) => {
      setTarea(respuesta);
      setMostrarSpinner(false);
    });
  }
  useEffect(() => {
    cargar();
  },[])
  return (
    <>
      <Form onSubmit={handleSubmit(guardar)}>
      <Form.Text className="text-danger">
            {errors.descripcionTarea?.message}
          </Form.Text>
        <Form.Group className="mb-3 d-flex justify-content-center">
          <Form.Control
            type="text"
            placeholder="ingrese una tarea"
            {...register('descripcionTarea', {
              required: "Ingrese una tarea"
              , minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 1"
              },
              maxLength: {
                value: 100
                , message: "La cantidad máxima de caracteres es 20"
              }
            })}
          />
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </Form.Group>
      </Form>
      {
        spinner ?(
        <div className="d-flex justify-content-center">
        <Spinner variant="primary" animation="border"/>
        </div>):
      (<ListaTareas tarea={tarea}></ListaTareas>)
      }
    </>
  );
};

export default FormularioTarea;
