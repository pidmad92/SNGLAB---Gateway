import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
    selector: 'jhi-seleccion-expediente',
    templateUrl: './seleccion-expediente.component.html'
})
export class SeleccionExpedienteComponent implements OnInit {

    tipoDocumento: SelectItem[];
    selectedTDocumento = '1';
    expedientes: any;

    ngOnInit() {
        this.tipoDocumento = [
            {label: 'RUC', value: '1'},
            {label: 'DNI', value: '2'},
        ];
        this.expedientes = [
            {codigo : '0051702034', fecha: '18/11/2017', docempleador: '20505506483', nomempleador: 'SOYUS S.A',
                doctrabajador: '42324523', nomtrabajador: 'Figueroa Castañeda Segundo' , ofderivacion: 'Consultas Laborales' },
            {codigo : '0051702035', fecha: '19/11/2017', docempleador: '20233455345', nomempleador: 'RAZOR S.A',
                doctrabajador: '44813423', nomtrabajador: 'Reyes Centurion Luis Alberto' , ofderivacion: 'Liquidaciones' }
        ]
    }

}
