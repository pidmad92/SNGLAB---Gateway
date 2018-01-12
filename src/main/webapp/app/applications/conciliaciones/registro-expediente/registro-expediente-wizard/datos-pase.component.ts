import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ES } from './../../../applications.constant';

import { FormsModule } from '@angular/forms';

import { ResponseWrapper } from '../../../../shared';
import { DatePipe } from '@angular/common';
import { ComboModel } from '../../../general/combobox.model';
import { DatosWizardService } from './datos-wizard.service';
import { Pasegl, RegistroExpedienteService } from './../';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-datos-pase',
    templateUrl: './datos-pase.component.html',
    providers: [MessageService]
})
export class DatosPaseComponent implements OnInit {

    tipoBusqueda = '1';
    rangeDates: Date[];
    es: any;
    pasesDoc: Object;
    pasegls: Pasegl[];

    pasegl: Pasegl;

    tipodocs: ComboModel[];
    selectedTipodoc: ComboModel;
    vNumdoc: string;
    block: boolean;
    currentSearch: string;

    mensajes: Message[] = [];

    onRowSelect(event) {
        // console.log(event.data);
        this.data.cambiarPase(event.data);
    }
    onRowUnselect(event) {
        this.data.cambiarPase(new Pasegl());
    }

    constructor(
        private datePipe: DatePipe,
        private datosPaseService: DatosWizardService,
        private data: RegistroExpedienteWizardService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.data.paseSeleccionado.subscribe((pasegl) => this.pasegl = pasegl);
        this.es = ES;
        // this.pases = [
        //     {codPase : '895624233', fechaPase: '02/02/2017', rucEmp: '2334343333', razonSocial: 'Ministerio de Trabajo',
        //      nroTra: '23341289', nomTra: 'Pedro Peña Salazar', ofDer: 'Liquidaciones'},
        // {codPase : '454545541', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3432233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
        // {codPase : '454545542', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3433233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
        // {codPase : '454545543', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3423233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
        // {codPase : '454545544', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3423233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
        // {codPase : '454545545', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3433233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'}
        // ]
        this.cargarTipoDocumentos();
    }

    cargarTipoDocumentos() {
        this.block = true;
        this.datosPaseService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.currentSearch = '';
                this.block = false;
                console.log('OK');
            },
            (res: ResponseWrapper) => { this.onError('Hubo un problema de conexión por favor actualice su navegador'); this.block = false; }
        );
    }

    buscarPase() {
        let queryString = '';
        if (this.tipoBusqueda === '1') {
            if (this.selectedTipodoc === undefined) {
                this.mensajes = [];
                this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha selecionado el tipo de documento'});
                return;
            }
            if (this.vNumdoc === undefined || this.vNumdoc === null) {
                this.mensajes = [];
                this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado el número de documento'});
                return;
            }
            queryString = '/pase/param?tip_doc=' + this.selectedTipodoc.value + '&nro_doc=' + this.vNumdoc;
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
            queryString = '/pase/param?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
        }
        this.block = true;
        this.datosPaseService.consultaPaseGL(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.pasegls = res.json;
                this.currentSearch = '';
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
