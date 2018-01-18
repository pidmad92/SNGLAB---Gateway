import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ES } from './../../../applications.constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ComboModel } from '../../../general/combobox.model';

import { DatosWizardService } from './datos-wizard.service';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard.service';
import { ResponseWrapper } from '../../../../shared';
@Component({
    selector: 'jhi-seleccion-expediente',
    templateUrl: './seleccion-expediente.component.html'
})
export class SeleccionExpedienteComponent implements OnInit {

    tipoDocumento: SelectItem[];
    tipoBusqueda = '1';
    es: any;
    selectedTDocumento = '1';
    expedientes: any;
    selecExpedientes: any;

    tipodocs: ComboModel[];
    rangeDates: Date[];
    nExpediente: string;
    selectedTipodoc: ComboModel;

    constructor(
        private datosWizardService: DatosWizardService,
        private datePipe: DatePipe,
        private envioNotificacionService: EnvioNotificacionWizardService
    ) {}

    cargarTipoDocumento() {
        this.datosWizardService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.es = ES;
        // this.cargarTipoDocumento();
        this.envioNotificacionService.expedienteSeleccionado.subscribe((exp) => {
            // console.log('EXP1: ' + JSON.stringify(exp, null, '\t'));
        });
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
            queryString = 'expedientes/notificacion/params?nro_exp=' + this.nExpediente;
        } else {
            const fec_ini = this.datePipe.transform(this.rangeDates[0], 'dd-MM-yyyy');
            const fec_fin = this.datePipe.transform(this.rangeDates[1], 'dd-MM-yyyy');
            queryString = 'expedientes/notificacion/params?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
        }
        this.datosWizardService.consultaExpediente(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.expedientes = res.json;
                // console.log('EXP' + JSON.stringify(this.expedientes));
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error: any) {}

}
