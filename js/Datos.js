export class Dato {

    constructor(descripcion, valor, tipo)
    {
        this._descripcion = descripcion;
        this._valor = valor;
        this.tipo = tipo;
    }

    get descripcion() {
        return this._descripcion;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get valor()
    {
        return this._valor;
    }

    set valor(valor)
    {
        this._valor = valor;
    }
}