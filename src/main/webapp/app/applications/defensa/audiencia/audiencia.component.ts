import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-audiencia',
    templateUrl: './audiencia.component.html'
})
export class AudienciaComponent implements OnInit {

    expedientes: any;
    id = '14';

    ngOnInit() {
        this.expedientes = [
            {item: '1', codexpediente : '0000002169-10', fecha: '10/03/2010', conciliador: 'SLIZARRAGA',
                ruc: '20505158343', empleador: 'CONFECCIONES INCA COTTON S.A.C', nrodoc: '56897245', nomdoc: '' },
            {item: '2', codexpediente : '0000001699-06', fecha: '11/05/2006', conciliador: 'ACASSANA',
                ruc: '20251850993', empleador: 'GRUPO INTERNACIONAL SERVICE S.A.C.', nrodoc: '56897458', nomdoc: '' },
            {item: '3', codexpediente : '0000001698-07', fecha: '15/06/2007', conciliador: 'SLIZARRAGA',
                ruc: '20504257381', empleador: 'SYSTEM DATABASE S.A.', nrodoc: '56897845', nomdoc: '' }
        ]
    }
}
