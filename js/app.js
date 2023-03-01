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

const calcularMovimientos = () =>{

    totalIngreso =  totalEgreso = 0;
    for (const mov of movimientos) {
        if(mov.tipo == 'ingreso')
            totalIngreso += mov.valor;
        else
            totalEgreso += mov.valor;
    }
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
    });
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits: 2
        });
}


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

const eliminarMovimiento = (id) =>{
    //Aqui estoy utilizando una función de devolución de llamada para obtener el index
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

$("#txtValor").keypress(()=>{
    $("#txtValor").removeClass('invalid');
});


$("#txtDesc").keypress(()=>{
    $("#txtDesc").removeClass('invalid');
});

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

//esta función para limpiar los datos al momento de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarApp();
});

const botonCabecero = document.getElementById('btn_cabecero');
botonCabecero.addEventListener('click', registrarMovimiento);

// const btnEliminar = document.getElementById('btn-eliminar');
// btnEliminar.addEventListener('click', eliminarMovimiento(this.parentNode));