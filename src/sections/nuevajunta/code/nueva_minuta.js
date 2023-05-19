// Variables
const formulario = document.querySelector("#agregarTarea");
const insertarAlertaDiv = document.querySelector("#insertarAlerta");
const listaTareas = document.querySelector("#tareasAsignadas");
let tareas = [];


// Eventos
EventListeners();

function EventListeners(){
    document.addEventListener('submit', agregarTarea);
    
}


// CLases
class tareasAsignadas{
    constructor(fecha, asignado, status, tareaCampo){
        this.fecha = fecha;
        this.asignado = asignado;
        this.status = status;
        this.tareaCampo = tareaCampo;
        this.tareas = [];
    };

    eliminarTarea(id){
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id );
        console.log(this.tareas)
    }

    
}

class UI{
    imprimirAlerta(mensaje, tipo){

        // Se crea el Div que mostrará la alerta
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('divMensaje');

        // Validamos el tipo de alerta
        if(tipo ==='error' ){
            divMensaje.classList.add('alertaError');
        }
   

        //Extraemos el mensaje
        divMensaje.textContent = mensaje;

        // Inyectamos el mensaje
        insertarAlertaDiv.appendChild(divMensaje);

        // Mostrar alerta por un rango de tiempo
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }

    agregarTareaListado(tareas){
        this.limparHTML();
        // Una vez ya mostremos los gastos al arreglo, iteramos sobre gastos
        tareas.forEach(tarea=>{
            const {fechaCompromisoCampo, asignarCampo, statusCampo, tareaCampo, id} = tarea;

            //Crear DIV
            const divContenedor = document.createElement('DIV')
            divContenedor.classList.add('titulosDiv');

            // Agregamos un ID al arreglo
            divContenedor.dataset.id = id;
            console.log(divContenedor)
            
            // Crear un LI
            const nuevaTareaAsignada = document.createElement('LI');

            const fechaCompromisoCampoParrafo = document.createElement('P');
            fechaCompromisoCampoParrafo.innerHTML =`<span class= "titulos">Fecha Comprmiso:</span> ${fechaCompromisoCampo}  `;

            const asignarCampoParrafo = document.createElement('P');
            asignarCampoParrafo.innerHTML =`<span class= "titulos">Asignado a:</span> ${asignarCampo}  `;

            const statusCampoParrafo = document.createElement('P');
            statusCampoParrafo.innerHTML =`<span class= "titulos">Estatus:</span> ${statusCampo}  `;

            const tareaCampoParrafo = document.createElement('P');
            tareaCampoParrafo.innerHTML =`<span class= "titulos">Tarea:</span> ${tareaCampo}  `;

            // contenedor de botones
            const botonesDiv = document.createElement('div');
            botonesDiv.classList.add('botonesDiv');

            // Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btnEliminar');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"></path></svg>';
            btnEliminar.onclick = () => eliminarTarea(id);



            // Boton para editar esta cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btnEditar');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg>';

            
            // Agregar los parrafos al divCitas
            divContenedor.appendChild(fechaCompromisoCampoParrafo);
            divContenedor.appendChild(asignarCampoParrafo);
            divContenedor.appendChild(statusCampoParrafo);
            divContenedor.appendChild(tareaCampoParrafo);
            botonesDiv.appendChild(btnEliminar);
            botonesDiv.appendChild(btnEditar);
            divContenedor.appendChild(botonesDiv);

            // Inyectar las citas al HTML
            listaTareas.appendChild(divContenedor);
  

        })

    }

    limparHTML() {
        while(listaTareas.firstChild){
            listaTareas.removeChild(listaTareas.firstChild);
        }
    }






     

}

// Instancias
const ui = new UI();
const administrarTareas = new tareasAsignadas();
let nuevaTarea;




// funciones
    function agregarTarea(e){
        e.preventDefault();
        //Mandamos llamar esos campos del formulario
        const fechaCompromisoCampo = document.querySelector('#fechaCompromiso').value;
        const asignarCampo = document.querySelector('#asignadoId').value
        const statusCampo = document.querySelector('#statusId').value
        const tareaCampo = document.querySelector('#tarea').value.trim();


        // Validamos el formulario
        if( fechaCompromisoCampo === ''|| asignarCampo === ''|| statusCampo === ''|| tareaCampo === ''){
            ui.imprimirAlerta(`Todos los campos son obligatorios`, 'error');
            return;

        }

        // Generar un Objeto con el gasto que el usuario va agregando
        const tarea = {fechaCompromisoCampo, asignarCampo, statusCampo, tareaCampo, id:Date.now()};


        // Añade el objeto de gasto al arreglo
        tareas = [...tareas, tarea];
        console.log(tareas)

        formulario.reset();

        // Llama a la función para agregar la tarea al listado en el HTML
        ui.agregarTareaListado(tareas);
    }

    function eliminarTarea(id){
        ui.eliminarTarea(id);

    }
