import { Component, OnInit } from '@angular/core';
import { ES } from './../../../applications.constant';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
    selector: 'jhi-datos-expediente',
    templateUrl: './datos-expediente.component.html'
})
export class DatosExpedienteComponent implements OnInit {

    motivos: any;
    documentos: any;
    displayDialog: boolean;
    newCar: boolean;
    es: any;
    date1: Date;
    fechaAudiencia: Date;
    hora: SelectItem[];
    selectedHora: String;

    ngOnInit() {
        this.es = ES;
        this.motivos = [
            {codigoMotivos : '01', descripcion: 'Vacaciones Perdidas', observacion: '' },
            {codigoMotivos : '02', descripcion: 'Remuneraciones Insolutas', observacion: '' },
            {codigoMotivos : '03', descripcion: 'Gratificaciones Legales', observacion: 'De proceder via Judicial' },
        ]
        this.documentos = [
            {codigoDocumentos : '01', descripcion: 'Acta de Inspección', observacion: '' },
            {codigoDocumentos : '02', descripcion: 'Documentos Relacionados con el Conflicto', observacion: '' },
            {codigoDocumentos : '03', descripcion: 'Copia de L.E.L./DNI/Partida de Nacimiento', observacion: '' },
            {codigoDocumentos : '04', descripcion: 'Copia del Consolidado de Beneficios Sociales del MT', observacion: '' },
            {codigoDocumentos : '05', descripcion: 'Copia de Audiencia de Conciliación', observacion: '' },
        ]
        this.hora = [
            {label: '14:50:00', value: '1'},
            {label: '15:40:00', value: '2'},
            {label: '16:30:00', value: '3'},
            {label: '17:20:00', value: '4'},
        ];
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
