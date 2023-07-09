import { ListGroup,Button } from "react-bootstrap";

const ListaTareas = ({tarea, borrarTarea}) => {
  return (
    <ListGroup>
      {
      tarea.map((item, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between">
          <p>{item.descripcionTarea}</p>
          <Button variant="danger" onClick={() => borrarTarea(item)}>Borrar</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
