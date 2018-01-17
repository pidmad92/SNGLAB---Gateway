import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class Formulario1 implements BaseEntity {
    constructor(
        public id?: number,
        // Tablas
        public listaIngresosIntereses?: Tabla[],
        public listaGastosIntereses?: Tabla[],
        public listaProvisionesCredDirec?: Tabla[],
        public listaIngresosServFinan?: Tabla[],
        public listaGastosServFinan?: Tabla[],
        public listaResultadoOpeFinan?: Tabla[],
        public listaGastosAdministracion?: Tabla[],
        public listaDepresacionesAmortizaciones?: Tabla[],
        public listaValuacionActivosProvisiones?: Tabla[],
        public listaOtrosIngresos?: Tabla[],
        public listaOtrosGastos?: Tabla[],
        public listaImpuestoRenta?: Tabla[],
        // Totales
        public totalProvisionesCredDirec?: Tabla,
        public totalOtrosIngresos?: Tabla,
        public totalOtrosGastos?: Tabla,
        public totalMargenFinanBruto?: Tabla,
        public totalMargenFinanNetoDespProv?: Tabla,
        public totalMargenFinanNetoIngGastosServFinan?: Tabla,
        public totalMargenOperacional?: Tabla,
        public totalMargenOperacionalNeto?: Tabla,
        public totalResultadoOperacion?: Tabla,
        public totalOtrosIngresosOtrosGastos?: Tabla,
        public totalResultadoAntesImpRenta?: Tabla,
        public totalResultadoNetoEjercicio?: Tabla,
    ) { }
}
