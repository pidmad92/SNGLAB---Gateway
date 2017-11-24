import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-datos-audiencia',
    templateUrl: './datos-audiencia.component.html'
})
export class DatosAudienciaComponent implements OnInit {

    audiencia: any;

    ngOnInit() {

        this.audiencia = [
            {item : '1', fecha: '18/11/2017', hora: '11:20:00', conciliador: 'JAvelador', resultado: 'Audiencia', tresultado: '' }
        ]
    }

}
