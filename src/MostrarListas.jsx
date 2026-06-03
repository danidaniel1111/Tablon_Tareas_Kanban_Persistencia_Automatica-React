import { useState, useEffect } from "react";
export function MostrarListas({
  lista_filtrar,
  accion_borrado,
  accion_estado,
  setter_cambio,
}) {
  //La lista guardada en el estado, las funciones de borrar y modificar, y el setter del id para que ambas funciones funcionen
  //Recorrer la lista , con un filtro previo, para mostrar las que estan completadas true o false
  return (
    <>
      <div className="lista_completada_false">
        <h3>Lista de No completadas</h3>
        {lista_filtrar
          .filter((tarea_filtro) => tarea_filtro.completada === false)
          .map((tarea) => {
            return (
              <div className="ficha_tarea">
                <p key={tarea.id} data-id={tarea.id}>
                  Tarea: {tarea.texto}
                </p>
                <button onClick={() => accion_borrado(tarea.id)}>📝</button>

                <button
                  onClick={() => {
                    setter_cambio(tarea.id);
                    accion_estado(tarea.id);
                  }}
                >
                  {!tarea.completada ? "✔️" : "❌"}
                </button>
              </div>
            );
          })}
      </div>
      <div className="lista_completada_true">
        <h3>Lista de No completadas</h3>
        {lista_filtrar
          .filter((tarea_filtro) => tarea_filtro.completada === true)
          .map((tarea) => {
            return (
              <div className="ficha_tarea">
                <p key={tarea.id} data-id={tarea.id}>
                  Tarea: {tarea.texto}
                </p>
                <button onClick={() => accion_borrado(tarea.id)}>📝</button>

                <button
                  onClick={() => {
                    setter_cambio(tarea.id);
                    accion_estado(tarea.id);
                  }}
                >
                  {!tarea.completada ? "✔️" : "❌"}
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
