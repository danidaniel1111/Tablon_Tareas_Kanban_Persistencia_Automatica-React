import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { MostrarListas } from "./MostrarListas";
import "./index.css";
function App() {
  //Estado que comprueba si hay contenido previo, si no se inicializa en array vacio
  const [lista_tareas, SetLista] = useState(() => {
    const lista_guardada = window.localStorage.getItem("lista_guardada");
    return lista_guardada ? JSON.parse(lista_guardada) : [];
  });
  //Estado para value de textarea
  const [contenido_tarea, setTarea] = useState("");
  //Estado para el id que va a cambiar
  const [id_cambio, setCambio] = useState(0);
  //Use effect para guardar cada cambio en la lista en memoria
  useEffect(() => {
    window.localStorage.setItem("lista_guardada", JSON.stringify(lista_tareas));
  }, [lista_tareas]);
  //Función que crea un objeto con el contenido de textarea, un id "unico" y lo guarda en la lista
  const añadir_lista = (event) => {
    const id_tarea = Math.trunc(event.timeStamp);
    SetLista([
      ...lista_tareas,
      {
        id: id_tarea,
        texto: contenido_tarea,
        completada: false,
      },
    ]);
  };
  //Borrar tarea en la lista dependiendo del id
  const borrado_tarea = (id_a_borrar) => {
    SetLista(lista_tareas.filter((tarea) => tarea.id !== id_a_borrar));
  };

  //Funcion para cambiar el estado de la Tarea
  const cambiar_estado = (id_a_cambiar) => {
    const nueva_lista = lista_tareas.map((tarea) => {
      if (tarea.id === id_a_cambiar) {
        return { ...tarea, completada: !tarea.completada };
      }
      return tarea;
    });
    SetLista(nueva_lista);
  };
  return (
    <>
      <div className="contenedor_formulario">
        <label>Introduzca una tarea</label>
        <textarea
          rows="4"
          cols="50"
          onChange={(e) => setTarea(e.target.value)}
        ></textarea>
        <button onClick={() => añadir_lista(event)}>Añadir Tarea</button>
        <button
          onClick={() => {
            window.localStorage.removeItem("lista_guardada");
          }}
        >
          Borrar Tareas Guardadas
        </button>
      </div>
      <div className="contenedor_lista">
        {lista_tareas.length == 0 ? (
          <h1>No hay contenido aun en la lista</h1>
        ) : (
          <MostrarListas
            lista_filtrar={lista_tareas}
            accion_borrado={borrado_tarea}
            accion_estado={cambiar_estado}
            setter_cambio={setCambio}
          ></MostrarListas>
        )}
      </div>
    </>
  );
}

export default App;
