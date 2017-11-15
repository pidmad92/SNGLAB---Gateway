import { Component, OnInit } from '@angular/core';
import { ES } from './../../../applications.constant';

@Component({
    selector: 'jhi-datos-pase',
    templateUrl: './datos-pase.component.html'
})
export class DatosPaseComponent implements OnInit {

    tipoBusqueda= 'nroDoc';
    rangeDates: Date[];
    cars: any;
    es: any;
    pasesDoc: Object;

    constructor() {}

    ngOnInit() {
        this.es = ES;
        this.cars = [
            {codPase : '895624233', fechaPase: '02/02/2017', rucEmp: '2334343333', razonSocial: 'Ministerio de Trabajo',
             nroTra: '23341289', nomTra: 'Pedro Peña Salazar', ofDer: 'Liquidaciones'},
            {codPase : '454545541', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3432233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
            {codPase : '454545542', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3433233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
            {codPase : '454545543', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3423233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
            {codPase : '454545544', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3423233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'},
            {codPase : '454545545', fechaPase: '03/02/2017', rucEmp: '2143423331', razonSocial: 'Apple S.A.C.', nroTra: '3433233', nomTra: 'Nombre aleaotorio', ofDer: 'Consultas'}
        ]
    }
}
