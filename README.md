This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Sobre este proyecto

### `Barra de navegacion`

Se puede cambiar entre grafica y pagina principal.

### `Pagina principal`

En la pagina principal se encuentra el historial de tareas completadas y las tareas pendientes.

Si se da clic en el boton Reset, se limpia el redux.

Si se da clic en el boton Random Tareas, se crean 50 en la tabla completadas.

Al dar clic en el boton Crear, se muestra el modal donde se puede crear la tarea.

Tareas pendientes se filtran de acuerdo al tiempo con el que se registran en la primer tabla.

Se puede ordenar por el id, nombre o el tiempo total.

En la tabla pendientes en la columna de opciones estan los iconos: inicia el tiempo de la tarea, se borra la informacion, se edita la tarea y se finaliza pasando a completada.

Si se le dio clic en el boton iniciar tiempo, la tarea pasa al inicio de la tabla y se muestran los iconos detener tiempo, reanudar tiempo, resetear tiempo y finalizar la tarea.

En la tabla historico en la columna opciones solo se muestra el icono de borrar de la lista la tarea seleccionada.

### `Pagina principal`

En caso de que no se tenga informacion en tabla historico, no se muestra la grafica.

Si hay datos, se genera la grafica.
