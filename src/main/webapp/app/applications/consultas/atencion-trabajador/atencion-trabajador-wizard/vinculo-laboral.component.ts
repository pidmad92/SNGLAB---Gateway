import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';

@Component({
    selector: 'jhi-vinculo-laboral',
    templateUrl: './vinculo-laboral.component.html'
})
export class VinculoLaboralComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    documentosIngresos: any;
    selDocumentos: any;
    actividadSelec: string;

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {}

    ngOnInit() {
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (this.actividadSelec === '3') {
                    // this.atencionTrabajadorService
                } else {
                    // Cargar los motivos por el código de la oficina de consultas laborales '5'
                    // this.loadMotivOfic(5);
                    // Consultar de forma interna por los motivos seleccionados
                    this.registroAtencionWizard.motateSeleccionado.subscribe((motatesel) => {
                        console.log('MOTATESEL' + JSON.stringify(motatesel));
                        // this.motsels = motatesel;
                    });
                }
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onRowSelect(event) {
    }

    saveDoc(event) {

    }

    deleteDoc(event) {
    }

}
