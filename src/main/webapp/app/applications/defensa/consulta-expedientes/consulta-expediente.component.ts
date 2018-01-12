import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-consulta-expediente',
    templateUrl: './consulta-expediente.component.html'
})
export class ConsultaExpedienteComponent implements OnInit {

    expedientes: any;
    id = '14';
    estado_expediente: number;

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.VerExpedienteEmitidos();
        this.expedientes = [
            {item: '1', codexpediente : '0000002169-10', fecha: '10/03/2010', conciliador: 'SLIZARRAGA',
                ruc: '20505158343', empleador: 'CONFECCIONES INCA COTTON S.A.C', nrodoc: '56897245', nomdoc: '' },
            {item: '2', codexpediente : '0000001699-06', fecha: '11/05/2006', conciliador: 'ACASSANA',
                ruc: '20251850993', empleador: 'GRUPO INTERNACIONAL SERVICE S.A.C.', nrodoc: '56897458', nomdoc: '' },
            {item: '3', codexpediente : '0000001698-07', fecha: '15/06/2007', conciliador: 'SLIZARRAGA',
                ruc: '20504257381', empleador: 'SYSTEM DATABASE S.A.', nrodoc: '56897845', nomdoc: '' }
        ]
    }

    onTabChange(indextab) {
        console.log('Index Tab');
        console.log(indextab.index);
        if (indextab.index === 0) {
            this.VerExpedienteEmitidos();
        } else if (indextab.index === 1) {
            this.VerExpedienteParaMultar();
        } else if (indextab.index === 2) {
            this.VerExpedienteMultados();
        }
    }

    VerExpedienteEmitidos() {
        // this.router.navigate(['/defensa/expediente/consulta', { outlets: { emitidos: ['exp-emitidos'] } }]);
        this.estado_expediente = 0;
        this.router.navigate(['/defensa/expediente/consulta', 'exp-emitidos']);
    }

    VerExpedienteParaMultar() {
        this.estado_expediente = 1;
        // this.router.navigate(['/defensa/expediente/consulta']);
        // this.router.navigate(['/defensa/expediente/consulta', { outlets: { multados: ['exp-multados'] } }]);
        this.router.navigate(['/defensa/expediente/consulta', 'exp-paramultar']);
    }

    VerExpedienteMultados() {
        this.estado_expediente = 2;
        // this.router.navigate(['/defensa/expediente/consulta']);
        // this.router.navigate(['/defensa/expediente/consulta', { outlets: { multados: ['exp-multados'] } }]);
        this.router.navigate(['/defensa/expediente/consulta', 'exp-multados']);
    }
}
