# 📝 Tablón de Tareas Kanban con Persistencia Automática

Aplicación interactiva desarrollada en React para la gestión de tareas distribuidas en un flujo de trabajo visual paralelo de dos columnas ("Tareas Pendientes" y "Tareas Completadas"). El proyecto implementa control estricto de inmutabilidad, persistencia de datos local y gestión optimizada del ciclo de vida de los componentes.

---

## 🚀 Demostración Técnica y Buenas Prácticas

* **Lazy State (Inicialización Perezosa):** El estado inicial se calcula mediante una función callback en el `useState` que lee el `window.localStorage` en el primer milisegundo de vida de la aplicación. Si existen datos previos, los des-serializa con `JSON.parse()`; si no, arranca con un array vacío `[]`, optimizando la carga de memoria.
* **Cero Estados Duplicados:** Las columnas "Pendientes" y "Completadas" no guardan los datos en almacenes independientes. Ambas secciones se calculan en vivo en el cuerpo del componente mediante **constantes normales en el renderizado** utilizando el método `.filter()`, garantizando la velocidad del procesamiento gráfico.
* **Mutación Inmutable de Arrays Complejos:** Las operaciones de agregar, eliminar o alternar el estado de una tarea se realizan mediante métodos inmutables:
  * **Inserción:** Uso del *Spread Operator* (`[...]`) para expandir el estado anterior.
  * **Borrado:** Uso de `.filter()` para excluir el elemento seleccionado por ID.
  * **Modificación:** Uso de `.map()` combinado con la desestructuración de objetos para invertir el flag `completada` (`!tarea.completada`) de forma segura, respetando la estructura original.
* **Persistencia Automatizada (`useEffect`):** Un efecto secundario vigilante acoplado al estado de la lista se encarga de serializar los datos en formato JSON (`JSON.stringify`) y guardarlos de fondo en el disco duro del navegador cada vez que se detecta un cambio en las tareas.

---

## 🛠️ Tecnologías Utilizadas

* **React (v18+)** & Vite como empaquetador ágil.
* **JavaScript Moderno:** Operadores Spread/Rest, desestructuración nativa, timestamps únicos (`Date.now()`) y métodos de array avanzados.
* **Calidad de Código:** Estructuración modular en componentes externos e importación de estilos globales limpios de comentarios.

---

## 📋 Estructura del Estado Único

Toda la base de datos local de la aplicación se centraliza en una única colección de objetos estructurados:

```javascript
[
  { 
    id: 1717439362145,
    texto: "Estudiar la asincronía y los métodos HTTP", 
    completada: false 
  }
]
```
