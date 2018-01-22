import { ConsultaRecursoComponent } from './../../sindicatos/registro-recurso/consulta-recurso.component';

import { Component, OnInit } from '@angular/core';
import { ConsultaExpedienteService } from './consulta-expediente.service';
import { Message } from 'primeng/components/common/api';
import { ResponseWrapper } from '../../../shared';
import { Abogado } from './../models/abogado.model';
import { Resulconci } from './../models/resulconci.model';

@Component({
    selector: 'jhi-consulta-expediente',
    templateUrl: './consulta-expediente.component.html'
})
export class ConsultaExpedienteComponent implements OnInit {

    block: boolean;
    abogados: Abogado[];
    selectedAbogado: Abogado;
    resultadoConci: Resulconci[];
    selectedResulconci: Resulconci;
    ubicacion: any;
    selectedUbicacion: any;

    mensajes: Message[] = [];
    expedientes: any;
    id = '14';

    constructor(private consultaExpedienteService: ConsultaExpedienteService) {}

    cargarAbogados() {
        this.block = true;
        this.consultaExpedienteService.consultarAbogados().subscribe(
            (res: ResponseWrapper) => {
                this.abogados = res.json;
                console.log('ABOGADOS');
                console.log(this.abogados);
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false;  }
        );
    }
    cargarResultadosConci() {
        this.block = true;
        this.consultaExpedienteService.consultarResultadosConciliacion().subscribe(
            (res: ResponseWrapper) => {
                this.resultadoConci = res.json;
                console.log('RESULTADOSCONCI');
                console.log(this.resultadoConci);
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false;  }
        );
    }

    ngOnInit() {
        this.cargarAbogados();
        this.cargarResultadosConci();
        this.ubicacion = [
            {item: '1', descUbicacion : 'TODOS' },
            {item: '2', descUbicacion : 'ARCHIVO' },
            {item: '3', descUbicacion : 'EN CONCILIACION' },
            {item: '4', descUbicacion : 'DEVUELTOS' },
            {item: '5', descUbicacion : 'OBSERVADOS' }
        ];
        this.expedientes = [
            {item: '1', codexpediente : '0000002169-10', fecha: '10/03/2010', conciliador: 'SLIZARRAGA',
                ruc: '20505158343', empleador: 'CONFECCIONES INCA COTTON S.A.C', nrodoc: '56897245', nomdoc: '' },
            {item: '2', codexpediente : '0000001699-06', fecha: '11/05/2006', conciliador: 'ACASSANA',
                ruc: '20251850993', empleador: 'GRUPO INTERNACIONAL SERVICE S.A.C.', nrodoc: '56897458', nomdoc: '' },
            {item: '3', codexpediente : '0000001698-07', fecha: '15/06/2007', conciliador: 'SLIZARRAGA',
                ruc: '20504257381', empleador: 'SYSTEM DATABASE S.A.', nrodoc: '56897845', nomdoc: '' }
        ]
    }

    buscarExpedientes() {
        // let queryString = '';
        // if (this.selectedTipodoc === undefined) {
        //     this.mensajes = [];
        //     this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha selecionado el tipo de documento'});
        //     return;
        // }
        // if (this.vNumdoc === undefined || this.vNumdoc === null) {
        //     this.mensajes = [];
        //     this.mensajes.push({severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado el número de documento'});
        //     return;
        // }
        // queryString = '/pase/param?tip_doc=' + this.selectedTipodoc.value + '&nro_doc=' + this.vNumdoc;
        // this.block = true;
        // this.datosPaseService.consultaPaseGL(queryString).subscribe(
        //     (res: ResponseWrapper) => {
        //         this.pasegls = res.json;
        //         this.currentSearch = '';
        //         this.block = false;
        //     },
        //     (res: ResponseWrapper) => { this.onError('Error de conexión, por favor vuelva a intentarlo'); this.block = false; }
        // );
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
