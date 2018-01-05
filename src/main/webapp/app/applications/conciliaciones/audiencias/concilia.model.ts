import { BaseEntity } from './../../../shared';

export class Concilia implements BaseEntity {
    constructor(
        public id?: number,
        public dFecconci?: any,
        public nFlgaudres?: boolean,
        public nFlgreprog?: boolean,
        public nUsuareg?: number,
        public tFecreg?: any,
        public nFlgactivo?: boolean,
        public nSedereg?: number,
        public nUsuaupd?: number,
        public tFecupd?: any,
        public nSedeupd?: number,
        public fullnametrab?: string,
        public nrodoctrab ?: string,
        public fullnameemp?: string,
        public nrodocemp ?: string,
        public fechahoraconci?: String,
        public fechaconci?: String,
        public horaconci?: String,
        public expediente?: BaseEntity,
        public abogado?: BaseEntity,
        public horacon?: BaseEntity,
        public resulconci?: BaseEntity,
    ) {
        this.nFlgaudres = false;
        this.nFlgreprog = false;
        this.nFlgactivo = false;
    }
}
