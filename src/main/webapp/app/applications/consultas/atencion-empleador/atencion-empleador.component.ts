import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Empleador } from '../models/empleador.model';
import { Atencion } from '../models/atencion.model';
import { Tipdocident } from '../models/tipdocident.model';
import { ComboModel } from '../../general/combobox.model';
import { AtencionEmpleadorService } from './atencion-empleador.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { RegistroAtencionWizardService } from './atencion-empleador-wizard/registro-atencion-wizard.service';

@Component({
    selector: 'jhi-atencion-empleador',
    templateUrl: './atencion-empleador.component.html'
})
export class AtencionEmpleadorComponent implements OnInit, OnDestroy {
    empleador: Empleador[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    atenciones: Atencion[];
    selecAten: any;
    selectedSucesion: any;

    empleadorSelec: Object;
    empleadores: Empleador;

    tipoBusqueda = '1';
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    vNumdoc: string;
    vRazsocial: string;
    displayDialog: boolean;

    tippersona: string;

    constructor(
        private atencionEmpleadorService: AtencionEmpleadorService,
        private jhiAlertService: JhiAlertService,
        private languageService: JhiLanguageService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
        private registroAtencionWizardService: RegistroAtencionWizardService
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    onRowSelect(event) {
        console.log(event.data);
        this.atencionEmpleadorService.findAtencionsByEmpleador(event.data.id).subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.atenciones = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.displayDialog = true;
        // this.data.cambiarPase(event.data);
    }
    onRowUnselect(event) {
        this.displayDialog = false;
        // this.data.cambiarPase(new Pasegl());
    }

    loadAll() {
    //     if (this.currentSearch) {
    //         this.atencionEmpleadorService.search({
    //             query: this.currentSearch,
    //             }).subscribe(
    //                 (res: ResponseWrapper) => this.empleador = res.json,
    //                 (res: ResponseWrapper) => this.onError(res.json)
    //             );
    //         return;
    //    }

    this.atencionEmpleadorService.consultaTipoDocIdentidad().subscribe(
        (res: ResponseWrapper) => {
            this.tipodocs = res.json;
            this.currentSearch = '';
        },
    (res: ResponseWrapper) => { this.onError(res.json); }
    );

        // this.atencionEmpleadorService.query().subscribe(
        //     (res: ResponseWrapper) => {
        //         this.empleador = res.json;
        //         this.currentSearch = '';
        //     },
        //     (res: ResponseWrapper) => this.onError(res.json)
        // );
    }

    buscarEmpleador() {
        if (this.tipoBusqueda === '1') {
            console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdoc);
            if (this.selectedTipodoc.id === undefined || this.vNumdoc === undefined) {
                return;
            }
            if (this.selectedTipodoc.vDescorta === 'RUC') {
                this.tippersona = '1';
            } else {
                this.tippersona = '0';
            }

            this.atencionEmpleadorService.findConsultaEmpleadorsByDocIdent(Number(this.selectedTipodoc.id), this.vNumdoc, Number(this.tippersona)).subscribe(
                (res: ResponseWrapper)  => {
                    console.log(res.json);
                    this.empleadores = res.json;
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        } else {
            this.atencionEmpleadorService.findEmpleadorsByRazSocial(this.vRazsocial).subscribe(
                (res: ResponseWrapper) => {
                    this.empleadores = res.json;
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        }
    }

    cancelar() {
        this.displayDialog = false;
    }

    cargarRegistroAtencion(actividad: string) {
        // Validar si se envia una nueva atención una seleccionada
        const atencion: Atencion = (actividad === '1') ?  new Atencion() : this.selecAten.aten;
        // console.log('NuevoReg: ' + actividad);
        // console.log('Nuevo1' + JSON.stringify(atencion));
        this.registroAtencionWizardService.cambiarActividad(actividad);
        this.registroAtencionWizardService.cambiarAtencion(atencion);
        this.router.navigate(['/consultas/registro-atencion-empleador', { outlets: { wizard: ['datos-trabajador-representante'] } }]);
        // console.log('Nuevo2');
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Empleador) {
        return item.id;
    }
    registerChangeInAtencionEmpleador() {
        this.eventSubscriber = this.eventManager.subscribe('atencionEmpleadorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
