export class Persona {

        constructor(
                public DNI?: string,
                public apellidoPaterno?: string,
                public apellidoMaterno?: string,
                public nombres?: string,
                public fechaNacimiento?: string,
                public genero?: string,
                public estadoCivil?: string,
                public codigo?: string,
                public coddep?: string,
                public codpro?: string,
                public coddist?: string,
                public direccion?: string,
        ) { }
}
