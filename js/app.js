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
    limpiarMovimientosHTML()
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


const limpiarMovimientosHTML = () => {

    for (const mov of movimientos)
    {
        if(mov.tipo == 'ingreso'){
            const elementoIngreso = document.getElementById("elemento_ing");
            if(elementoIngreso != null){
                elementoIngreso.innerHTML = "";
                elementoIngreso.remove();
            }

        }
        else{
            const elementoEgreso = document.getElementById("elemento_egre");
            if(elementoEgreso != null){
                elementoEgreso.innerHTML = "";
                elementoEgreso.remove();
            }
        }
    }
}

const cargarMovimientosHTML = () => {

    const listaIngresos = document.getElementById("lista-ingresos");
    const listaEgresos = document.getElementById("lista_egresos");
    
    for (const mov of movimientos)
    {
        if(mov.tipo == 'ingreso'){
            const elementoIngreso = document.createElement("div");
            elementoIngreso.id="elemento_ing";
            elementoIngreso.classList.add("elemento", "limpiarEstilos");
            elementoIngreso.innerHTML = `
            <div id="ingreso_desc" class="elemento_descripcion">${mov.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div id="ingreso_valor" class="elemento_valor">${formatoMoneda(mov.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `;

            listaIngresos.appendChild(elementoIngreso);
        }
        else{
            const porcEgreso = (mov.valor / totalEgreso);
            const elementoEgreso = document.createElement("div");
            elementoEgreso.id="elemento_egre";
            elementoEgreso.classList.add("elemento", "limpiarEstilos");
            elementoEgreso.innerHTML = `
            <div id="ingreso_desc" class="elemento_descripcion">${mov.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div id="ingreso_valor" class="elemento_valor">${formatoMoneda(mov.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcEgreso)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
            `;

            listaEgresos.appendChild(elementoEgreso);
        }
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
}

$("#txtValor").val() ? 0 : $("#txtValor").addClass('invalid');

$("#txtValor").keypress(()=>{
    $("#txtValor").removeClass('invalid');
});

function limpiarCampos()
{
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtValor").value = 0;
    document.getElementById('tipo_mov').value = "ingreso";
}

//esta función para cargar los datos al momento de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarApp();
});

const botonCabecero = document.getElementById('btn_cabecero');
botonCabecero.addEventListener('click', registrarMovimiento);