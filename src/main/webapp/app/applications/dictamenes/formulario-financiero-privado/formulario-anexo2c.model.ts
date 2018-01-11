import { BaseEntity } from '../../../shared/index';
import { Tabla } from './tabla.model';

export class FormularioAnexo2C implements BaseEntity {
    constructor(
        public id?: number,
        public listaACCuentasCobrarComerciales?: Tabla[],
        public listaACCuentasCobrarComercialesRelacionadas?: Tabla[],
        public listaACCuentasCobrarDiversas?: Tabla[],
        public listaACOtrasCuentas?: Tabla[],
        public listaANCOtrasCuentas?: Tabla[],
        public listaPCCuentasPagarComerciales?: Tabla[],
        public listaPCCuentasPagarComercialesRelacionadas?: Tabla[],
        public listaPCObligacionesFinancieras?: Tabla[],
        public listaPCProvisiones?: Tabla[],
        public listaPCOtrasCuentas?: Tabla[],
        public listaPNCObligacionesFinancieras?: Tabla[],
        public listaPNCProvisiones?: Tabla[],
        public listaPNCOtrasCuentas?: Tabla[],
        public listaPResultadosNoRealizados?: Tabla[],
        // Totales
        public totalACCuentasCobrarComerciales?: Tabla,
        public totalACCuentasCobrarComercialesRelacionadas?: Tabla,
        public totalACCuentasCobrarDiversas?: Tabla,
        public totalACOtrasCuentas?: Tabla,
        public totalANCOtrasCuentas?: Tabla,
        public totalPCCuentasPagarComerciales?: Tabla,
        public totalPCCuentasPagarComercialesRelacionadas?: Tabla,
        public totalPCObligacionesFinancieras?: Tabla,
        public totalPCProvisiones?: Tabla,
        public totalPCOtrasCuentas?: Tabla,
        public totalPNCObligacionesFinancieras?: Tabla,
        public totalPNCProvisiones?: Tabla,
        public totalPNCOtrasCuentas?: Tabla,
        public totalPResultadosNoRealizados?: Tabla
    ) { }
}
