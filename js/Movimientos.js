import { Dato } from './Datos.js';

export class Movimiento extends Dato
{
    static contador = 0;
    constructor(descripcion, valor, tipo)
    {
        super(descripcion, valor, tipo); // se utiliza la palabra super para invocar al constructor de la clase padre
        Movimiento.contador++;
        this._id = Movimiento.contador;
    }

    get id()
    {
        return this._id;
    }

}

