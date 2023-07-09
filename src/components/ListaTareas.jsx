import { ListGroup,Button } from "react-bootstrap";
import { borrarTarea } from "../helpers/queries";
import Swal from "sweetalert2";
const ListaTareas = ({tarea}) => {
  
  const borrar = (id) => {
    console.log(id);
    borrarTarea(id).then((respuesta)=>{
      if(respuesta.status===200){
        Swal.fire('Tarea Borrada',"La tarea seleccionada fue eliminada","success")
      }else{
        Swal.fire('Error al borrar tarea',"La tarea seleccionada no pudo ser eliminada","error")
      }
    })
  }
  return (
    <ListGroup>
      {
      tarea.map((item, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between">
          <p>{item.descripcionTarea}</p>
          <Button variant="danger" onClick={() => borrar(item._id)}>Borrar</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
