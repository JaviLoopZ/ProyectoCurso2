tippy('ion-icon', {
    content: function (reference) {
        return reference.getAttribute('title');
    },
});

//funciones tipo flecha
const cargarCabecero = () =>{
    const presupuesto = totalIngresos() - totalEgresos();
    const porcentajeEgreso = totalIngresos() / totalEgresos();
}

const totalIngresos = () =>{
    let totalIngreso = 0;
    for (const ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

const totalEgresos = () =>{
    let totalEgreso = 0;
    for (const egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
