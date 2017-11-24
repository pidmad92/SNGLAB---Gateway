import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit {

    direcciones: any;
    displayDialog: boolean;
    newCar: boolean;
    departamentos: SelectItem[];

    constructor() {
        this.departamentos = [
            {label: 'Seleccione el Dpto.', value: null},
            {label: 'Lima', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}}
        ];
    }

    ngOnInit() {
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaral', direccion: 'Apple S.A.C.'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
    }
    showDialogToAdd() {
        this.newCar = true;
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newCar = false;
        this.displayDialog = true;
    }
    save() {
        this.displayDialog = false;
    }
    delete() {
        this.displayDialog = false;
    }
}
