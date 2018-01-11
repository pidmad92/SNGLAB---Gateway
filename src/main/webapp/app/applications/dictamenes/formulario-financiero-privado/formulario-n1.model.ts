import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioN1 implements BaseEntity {
    constructor(
        public id?: number,
        public listaTotalIngresos?: Tabla,
        public listaEmpresaProduccion?: Tabla[],
        public listaEmpresaServicios?: Tabla[],
        public listaGastosOperativos1?: Tabla[],
        public listaGastosOperativos2?: Tabla[],
        public listaParticipacion?: Tabla[],
        public listaImpuestoRenta?: Tabla[],
        // SubTotales y Totales
        public totalCostos?: Tabla,
        public totalServicios?: Tabla,
        public utilidadBrutaCostos?: Tabla,
        public totalGastos?: Tabla,
        public utilidadOperativa?: Tabla,
        public utilidadAntParti?: Tabla,
        public utilidadAntImp?: Tabla,
        public utilidadEjercicio?: Tabla,
    ) { }
}
