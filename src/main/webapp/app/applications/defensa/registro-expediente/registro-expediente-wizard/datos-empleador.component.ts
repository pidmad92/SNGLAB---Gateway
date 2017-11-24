import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
    selector: 'jhi-datos-empleador',
    templateUrl: './datos-empleador.component.html'
})
export class DatosEmpleadorComponent implements OnInit {

    tipoDocumento: SelectItem[];
    departamentos: SelectItem[];
    displayDialog: boolean;
    newCar: boolean;
    selectedTDocumento = '1';
    direcciones: any;

    ngOnInit() {
        this.tipoDocumento = [
            {label: 'RUC', value: '1'},
            {label: 'DNI', value: '2'},
        ];
        this.departamentos = [
            {label: 'Seleccione el Dpto.', value: null},
            {label: 'Lima', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}}
        ];
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
