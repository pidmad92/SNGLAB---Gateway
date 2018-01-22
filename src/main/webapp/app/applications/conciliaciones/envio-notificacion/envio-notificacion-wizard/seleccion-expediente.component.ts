import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ES } from './../../../applications.constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ComboModel } from '../../../general/combobox.model';
import { JhiEventManager } from 'ng-jhipster';

import { Message } from 'primeng/primeng';

import { Concilia } from './../../models/concilia.model';
import { Trabajador } from './../../models/trabajador.model';
import { Expediente } from './../../models/expediente.model';
import { Datlab } from './../../models/datlab.model';
import { Empleador } from './../../models/empleador.model';

import { DatosWizardService } from './datos-wizard.service';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard.service';
import { ResponseWrapper } from '../../../../shared';
@Component({
    selector: 'jhi-seleccion-expediente',
    templateUrl: './seleccion-expediente.component.html'
})
export class SeleccionExpedienteComponent implements OnInit {

    tipoBusqueda = '1';
    es: any;
    expedientes: any;
    selecExpedientes: any;

    block: boolean;
    mensajes: Message[] = [];

    rangeDates: Date[];
    nExpediente: string;
    selectedTipodoc: ComboModel;

    constructor(
        private eventManager: JhiEventManager,
        private datosWizardService: DatosWizardService,
        private datePipe: DatePipe,
        private envioNotificacionService: EnvioNotificacionWizardService
    ) {}

    ngOnInit() {
        this.es = ES;
        this.envioNotificacionService.cambiarExpediente([]);
        this.envioNotificacionService.cambiarDatlab(new Datlab());
        this.envioNotificacionService.cambiarEmpleador(new Empleador());
        this.envioNotificacionService.cambiarTrabajador(new Trabajador());
        this.envioNotificacionService.cambiarConcilia(new Concilia());
    }

    agregarExpediente(fila) {
        this.envioNotificacionService.cambiarExpediente(this.selecExpedientes);
    }
    borrarExpediente(fila) {
        this.envioNotificacionService.cambiarExpediente(this.selecExpedientes);
    }

    buscarExpediente() {
        let queryString = '';
        if (this.tipoBusqueda === '1') {
            if (this.nExpediente === undefined || this.nExpediente === '' || this.nExpediente === null) {
                this.mensajes = [];
                this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado número del expediente'});
                return;
            }
            queryString = 'expedientes/notificacion/params?nro_exp=' + this.nExpediente;
        } else {
            if (this.rangeDates === undefined) {
                this.mensajes = [];
                this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se han ingresados las fechas'});
                return;
            }
            if (this.rangeDates[1] === null) {
                this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'Solo se ha ingresado una de las fecha, por favor seleccione otra'});
                return;
            }
            const fec_ini = this.datePipe.transform(this.rangeDates[0], 'dd-MM-yyyy');
            const fec_fin = this.datePipe.transform(this.rangeDates[1], 'dd-MM-yyyy');
            queryString = 'expedientes/notificacion/params?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
        }
        this.block = true;
        this.datosWizardService.consultaExpediente(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.expedientes = res.json;
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onError('Error de conexión, por favor vuelva a intentarlo'); this.block = false; }
        );
    }

    private onError(error: any) {
        this.mensajes = [];
        this.mensajes.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }

}
