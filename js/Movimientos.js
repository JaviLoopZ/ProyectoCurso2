import { Dato } from './Datos.js';

export class Movimiento extends Dato
{
    static contador = 0;
    constructor(descripcion, valor, tipo)
    {
        super(descripcion, valor, tipo); // se utiliza la palabra super para invocar al constructor de la clase padre
        // this.descripcion = descripcion;
        // this.valor = valor;
        // this.tipo = tipo;
        // this.contador++;
        // this._id = this.contador;

        

    }

    get id()
    {
        return this._id;
    }

}

