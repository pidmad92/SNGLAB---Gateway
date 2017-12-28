import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'jhi-verificacion-expediente',
    templateUrl: './verificacion-expediente.component.html'
})
export class VerificacionExpedienteComponent implements OnInit {

    tipoNotificacion: SelectItem[];
    tipoEnvio: SelectItem[];
    selectedTNotificacion: String;
    selectedTEnvio: String;
    direcciones: any;
    direccionesEmp: any;

    ngOnInit() {

        this.tipoNotificacion = [
            {label: 'Conciliación', value: '1'},
            {label: 'Requerimiento', value: '2'},
            {label: 'Proveído de Archivo', value: '3'},
            {label: 'Vuelvase a Notificar', value: '4'},
        ];
        this.tipoEnvio = [
            {label: 'Urgente', value: '1'},
        ];
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
        this.direccionesEmp = [
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
    }

}
