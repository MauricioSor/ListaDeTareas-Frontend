import { Container,Spinner } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormularioTarea from "./components/FormularioTarea";
import Footer from './common/Footer';
import { buscarTareas } from './helpers/queries'
import { useEffect, useState } from "react";

function App() {
  const [tarea, setTarea] = useState([]);
  const[spinner,setMostrarSpinner]= useState(true);

  const cargar = () => {
    buscarTareas().then((respuesta) => {
      setTarea(respuesta);
      console.log(respuesta);
      setMostrarSpinner(false);
    });
  }
  useEffect(() => {
    cargar();
  },[])
  return (
    <>
      <Container className="my-5 main">
        <h1 className="display-4 text-center text-light">Lista de tareas</h1>
        <hr />
        {
        spinner ?(
        <div className="d-flex justify-content-center">
        <Spinner variant="primary" animation="border"/>
        </div>):
        (<FormularioTarea tarea={tarea}></FormularioTarea>)}
      </Container>
      <Footer></Footer>
        
    </>
  );
}

export default App;
