import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ES } from './../../../applications.constant';

import { FormsModule } from '@angular/forms';

import { ResponseWrapper } from '../../../../shared';
import { DatePipe } from '@angular/common';
import { ComboModel } from '../../../general/combobox.model';
import { DatosPaseService } from './datos-pase.service';
import { Pasegl } from './../';

@Component({
    selector: 'jhi-datos-pase',
    templateUrl: './datos-pase.component.html'
})
export class DatosPaseComponent implements OnInit {

    tipoBusqueda = '1';
    rangeDates: Date[];
    es: any;
    pasesDoc: Object;
    pasegls: Pasegl[];

    tipodocs: ComboModel[];
    selectedTipodoc: ComboModel;
    vNumdoc: string;
    block: boolean;
    currentSearch: string;

    @Output() outgoingData = new EventEmitter<boolean>();

    onRowSelect(event) {
        console.log('ABC');
        this.outgoingData.emit(true);
    }

    onRowUnselect(event) {
        console.log('ABCDF');
        this.outgoingData.emit(false);
    }

    constructor(
        private datePipe: DatePipe,
        private datosPaseService: DatosPaseService
    ) {}

    ngOnInit() {
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
        this.loadAll();
    }

    loadAll() {
        this.block = true;
        this.datosPaseService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.currentSearch = '';
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
        );
    }

    buscarPase() {
        let queryString = '';
        if (this.tipoBusqueda === '1') {
            queryString = '/pase/param?tip_doc=' + this.selectedTipodoc.value + '&nro_doc=' + this.vNumdoc;
        } else {
            const fec_ini = this.datePipe.transform(this.rangeDates[0], 'dd-MM-yyyy');
            const fec_fin = this.datePipe.transform(this.rangeDates[1], 'dd-MM-yyyy');
            queryString = '/pase/param?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
        }
        this.datosPaseService.consultaPaseGL(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.pasegls = res.json;
                this.currentSearch = '';
                console.log(res.json);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
