import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-resumen-notificacion',
    templateUrl: './resumen-notificacion.component.html'
})
export class ResumenNotificacionComponent implements OnInit {

    audiencia: any;
    notificaciones: any;

    ngOnInit() {

        this.notificaciones = [
            {item : '1', henvio: '4321011', fecha: '18/11/2017', hora: '11:20:00', conciliador: 'JAvelador', resultado: 'Audiencia', tresultado: '' }
        ]
    }
}
