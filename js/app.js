import { Movimiento } from './Movimientos.js'


var movimientos = new Array();

let totalIngreso = 0;
let totalEgreso = 0;

const cargarCabecero = () =>{
    const presupuesto = totalIngreso - totalEgreso;
    var porcentajeEgreso = 0;
    if(totalEgreso > 0 & totalIngreso > 0){
        porcentajeEgreso = totalEgreso / totalIngreso;
    }
    cargarMovimientosHTML();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngreso);
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgreso);

    limpiarCampos();

}

//Va aumentando el total de ingreso y egreso 
const calcularMovimientos = () =>{

    totalIngreso =  totalEgreso = 0;
    for (const mov of movimientos) {
        if(mov.tipo == 'ingreso')
            totalIngreso += mov.valor;
        else
            totalEgreso += mov.valor;
    }
}

//Función para convertir el formato de la moneda 
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
    });
}

//Función para convertir el valor a porcentaje 
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits: 2
        });
}

//Funcion para ir agregando los elementos html de los ingresos o egresos
const cargarMovimientosHTML = () => {

    const listaIngresos = document.getElementById("lista-ingresos");
    const listaEgresos = document.getElementById("lista_egresos");

    listaIngresos.innerHTML = "";
    listaEgresos.innerHTML = "";
    
    for (const mov of movimientos)
    {
        if(mov.tipo == 'ingreso'){
            const elementoIngreso = document.createElement("div");
            elementoIngreso.id="elemento_mov_" + mov.id;
            elementoIngreso.classList.add("elemento", "limpiarEstilos");
            elementoIngreso.innerHTML = `
            <div id="ingreso_desc" class="elemento_descripcion">${mov.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div id="ingreso_valor" class="elemento_valor">${formatoMoneda(mov.valor)}</div>
                <div class="elemento_eliminar">
                    <button id="btn-eliminar" class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `;
            const botonEliminar = elementoIngreso.querySelector("#btn-eliminar");
            botonEliminar.addEventListener("click", function() {
                eliminarMovimiento(mov.id);
            });

            listaIngresos.appendChild(elementoIngreso);
        }
        else{
            const porcEgreso = (mov.valor / totalEgreso);
            const elementoEgreso = document.createElement("div");
            elementoEgreso.id="elemento_mov_" + mov.id;
            elementoEgreso.classList.add("elemento", "limpiarEstilos");
            elementoEgreso.innerHTML = `
            <div id="ingreso_desc" class="elemento_descripcion">${mov.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div id="ingreso_valor" class="elemento_valor">${formatoMoneda(mov.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcEgreso)}</div>
                <div class="elemento_eliminar">
                    <button id="btn-eliminar" class="elemento_eliminar--btn" >
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `;

            const botonEliminar = elementoEgreso.querySelector("#btn-eliminar");
            botonEliminar.addEventListener("click", function() {
                eliminarMovimiento(mov.id);
            });

            listaEgresos.appendChild(elementoEgreso);
        }
    }
}

//Función para eliminar el movimiento seleccionado por medio del id del registro.
//También elimina el contenido html del elemento
const eliminarMovimiento = (id) =>{
    //Para el findIndex se utiliza una función de devolución de llamada
    const indiceMovimiento = movimientos.findIndex(function(mov) {
        return mov.id === id;
    });

    if (indiceMovimiento >= 0) {
        movimientos.splice(indiceMovimiento, 1);
        const movimientoDiv = document.getElementById("elemento_mov_" + id);
        movimientoDiv.remove();
        calcularMovimientos();
        cargarCabecero();
    }
}
function cargarApp()
{
    document.getElementById('txtDesc').value = "";
    document.getElementById('tipo_mov').value = "ingreso";
    document.getElementById("txtValor").value = 0;
}

//Agrega el movimiento a la lista de movimientos ya sea Ingreso o Egreso
function registrarMovimiento()
{
    let  desc = document.getElementById("txtDesc").value;
    let val = parseInt(document.getElementById("txtValor").value, 10);
    let tipo = document.getElementById('tipo_mov').value;


    if(val > 0 && desc != ""){
        let m = new Movimiento(desc,val,tipo);
        movimientos.push(m);
        calcularMovimientos();
        cargarCabecero();
    }
    else
    {
        CargarClaseInvalid();
    }
}

// $("#txtValor").keypress(()=>{
//     $("#txtValor").removeClass('invalid');
// });


// $("#txtDesc").keypress(()=>{
//     $("#txtDesc").removeClass('invalid');
// });

//Le agrega la clase invalid a la descripción y valor si al querer agregar movimiento estos se van en blanco
function CargarClaseInvalid()
{
    const monto = document.getElementById("txtValor");
    const desc = document.getElementById("txtDesc");
    if(monto != null)
    {
        if(monto.value <= 0)
            monto.classList.add("agregar_valor", "invalid");
    }

    if(desc != null)
    {
        if(desc.value == "")
            desc.classList.add("agregar_descripcion", "invalid");
    }
}

function limpiarCampos()
{
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtValor").value = 0;
    document.getElementById('tipo_mov').value = "ingreso";
}

//función para limpiar los datos al momento de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarApp();
});

const botonAgregar = document.getElementById('btn_agregar');
const container = document.getElementById("add_container");
const txtDescrip = document.getElementById('txtDesc');
const txtVal = document.getElementById('txtValor');
botonAgregar.addEventListener('click', function(){

    const lblError = document.getElementById("errorMsg");
    if(lblError != null)
    {
        lblError.remove();
    }
    if(txtDescrip.value == "" || txtVal.value == 0){
        const msgError = document.createElement("div");
        msgError.innerHTML = `
            <label id="errorMsg" style="color: red; display: block;">Favor de completar los campos</label>
        `;
        container.appendChild(msgError);
        CargarClaseInvalid();

    }
    else{
            registrarMovimiento();
    }
});

const textDescripcion = document.getElementById('txtDesc');
textDescripcion.addEventListener('input', function() {

    var valor = textDescripcion.value;
    //Si la longitud del texto supera los 30 caracteres, se utiliza slice para cortar el valor
    // Y se asinga nuevamente el valor al textbox
    if (textDescripcion.value.length > 30) {
        textDescripcion.value = textDescripcion.value.slice(0, 30);
    }

    var valido = 1;
    //Se utiliza expresión regular para verificar si se presionó una letra
    const regex = /^[a-zA-ZñÑ\s]+$/;
    if(!regex.test(valor))
    {
        valido = 0;
    }
    
    if(valido == 0)
    {
        //De nuevo se utiliza slice para volver a asignarle el valor al textbox pero omitiendo el caracter inválido
        textDescripcion.value = textDescripcion.value.slice(0, textDescripcion.value.length - 1);
    }
});

//Utilizo el evento focus para quitar la clase invalid 
textDescripcion.addEventListener("focus", function() {
    const lblError = document.getElementById("errorMsg");
    if(lblError != null)
    {
        lblError.remove();
    }
    textDescripcion.classList.remove("invalid");
});

const txtValor = document.getElementById("txtValor");
txtValor.addEventListener("focus", function() {
    const lblError = document.getElementById("errorMsg");
    if(lblError != null)
    {
        lblError.remove();
    }
    txtValor.classList.remove("invalid");
});
//---------------------------------------------------

//Utilizo el evento keypress para evitar que usen la barra espaciadora en el campo de Valor
txtValor.addEventListener("keypress", function(event) {
    if (isNaN(event.key) || event.code === "Space") {
        event.preventDefault();
    }
});

