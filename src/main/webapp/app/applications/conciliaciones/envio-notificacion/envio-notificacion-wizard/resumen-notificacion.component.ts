import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Observable, Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ResponseWrapper } from '../../../../shared';
import { DatosWizardService } from './datos-wizard.service';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard.service';
import { Direcnotif } from '../../models/direcnotif.model';

@Component({
    selector: 'jhi-resumen-notificacion',
    templateUrl: './resumen-notificacion.component.html',
})
export class ResumenNotificacionComponent implements OnInit {

    private subscription: Subscription;
    private eventSubscriber: Subscription;
    audiencia: any;
    notificaciones: any;
    response: any;
    directNotificas: Direcnotif[];
    idNotifica = [];

    block: boolean;
    mensajes: Message[] = [];

    constructor(
        private eventManager: JhiEventManager,
        private router: Router,
        private datosWizardService: DatosWizardService,
        private envioNotificacionService: EnvioNotificacionWizardService
    ) {}

    ngOnInit() {

        this.subscription = this.envioNotificacionService.notificacionSeleccionado.subscribe((response: any) => {
            this.response = response;
            if ( Object.keys(this.response).length === 0) {
                console.log('IF');
                this.response = JSON.parse(sessionStorage.getItem('response'));
                this.idNotifica = this.response;
                console.log(this.response)
                this.idNotifica.forEach((id) => {
                    console.log('FOREACH');
                    this.datosWizardService.buscarDireccionesNotifica(id).subscribe(
                        (res: ResponseWrapper) => {
                            this.directNotificas = res.json;
                            console.log(res.json);
                            console.log('DIRECCIONES');
                            console.log(this.directNotificas);
                            this.block = false;
                        },
                        (res: ResponseWrapper) => { this.onError(res.json); }
                    );
                });
                // this.router.navigate(['/conciliaciones/expediente/envio-notificacion' , { outlets: { wizard: ['seleccion-expediente'] } }]);
            } else {
                sessionStorage.setItem('response', JSON.stringify(response));
                this.idNotifica = response;
                this.idNotifica.forEach((id) => {
                    console.log('FOREACH');
                    this.datosWizardService.buscarDireccionesNotifica(id).subscribe(
                        (res: ResponseWrapper) => {
                            this.directNotificas = res.json;
                            console.log('DIRECCIONES');
                            console.log(this.directNotificas);
                            this.block = false;
                        },
                        (res: ResponseWrapper) => { this.onError(res.json); }
                    );
                });
                console.log('OK');
            }
            console.log('RESPONSE2');
            console.log(JSON.stringify(this.response));
        });
        this.notificaciones = [
            {item : '1', henvio: '4321011', fecha: '18/11/2017', hora: '11:20:00', conciliador: 'JAvelador', resultado: 'Audiencia', tresultado: '' }
        ]
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
