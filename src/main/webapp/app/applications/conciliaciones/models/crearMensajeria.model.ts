import { BaseEntity } from '../../../shared';

export class CrearMensajeria {
    constructor(
        public idAreaRemite?: any,
        public idUserDespacho?: any,
        public msgDestinatario?: MesgDestinario,
    ) {
    }
}

export class MesgDestinario {
    constructor(
        public item?: Item[]
    ) {}
}

export class Item {
    constructor(
        public administrado?: Administrado,
        public asunto?: any,
        public idClase?: any,
        public nivelSegu?: any,
        public noDocumento?: any,
        public numFolios?: any,
        public numeroExpediente?: any,
        public paraNombre?: any,
        public tipoDespacho?: any,
    ) {}
}

export class Administrado {
    constructor(
        public departamento?: string,
        public distrito?: string,
        public domicilio?: string,
        public nombreRemitente?: string,
        public numeroDocumentoIdent?: string,
        public pais?: string,
        public provincia?: string,
        public tipoAdministrado?: string,
        public tipoDocumentoIdent?: string,
    ) {}
}
