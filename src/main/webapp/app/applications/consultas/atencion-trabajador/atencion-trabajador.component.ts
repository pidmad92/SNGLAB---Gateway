import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { Trabajador } from './trabajador.model';
import { Tipdocident } from './tipdocident.model';
import { ComboModel } from '../../general/combobox.model';
import { AtencionTrabajadorService } from './atencion-trabajador.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { RegistroAtencionWizardService } from './atencion-trabajador-wizard/registro-atencion-wizard.service';

@Component({
    selector: 'jhi-atencion-trabajador',
    templateUrl: './atencion-trabajador.component.html'
})
export class AtencionTrabajadorComponent implements OnInit, OnDestroy {
    trabajador: Trabajador[];
    atenciones: Atencion[];
    selecAten: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    selectedSucesion: any;

    trabajadorSelec: Object;
    trabajadores: Trabajador;

    tipoBusqueda = '1';
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    vNumdoc: string;
    vNombre: string;
    vApaterno: string;
    vAmaterno: string;
    displayDialog: boolean;

    constructor(
        private atencionTrabajadorService: AtencionTrabajadorService,
        private jhiAlertService: JhiAlertService,
        private languageService: JhiLanguageService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private principal: Principal,
        private registroAtencionWizardService: RegistroAtencionWizardService
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    onRowSelect(event) {
        console.log(event.data);
        this.atencionTrabajadorService.findAtencionsByTrabajador(event.data.id).subscribe(
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
    //         this.atencionTrabajadorService.search({
    //             query: this.currentSearch,
    //             }).subscribe(
    //                 (res: ResponseWrapper) => this.trabajador = res.json,
    //                 (res: ResponseWrapper) => this.onError(res.json)
    //             );
    //         return;
    //    }
       this.atencionTrabajadorService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.currentSearch = '';
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
        // this.atencionTrabajadorService.query().subscribe(
        //     (res: ResponseWrapper) => {
        //         this.trabajador = res.json;
        //         this.currentSearch = '';
        //     },
        //     (res: ResponseWrapper) => this.onError(res.json)
        // );
    }

    buscarTrabajador() {
        if (this.tipoBusqueda === '1') {
            console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdoc);
            if (this.selectedTipodoc.id === undefined || this.vNumdoc === undefined) {
                return;
            }
            this.atencionTrabajadorService.findTrabajadorsByDocIdent(Number(this.selectedTipodoc.id), this.vNumdoc ).subscribe(
                (res: ResponseWrapper)  => {
                    console.log(res.json);
                    this.trabajadores = res.json;
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        } else {
            this.atencionTrabajadorService.findTrabajadorsByName(this.vNombre, this.vApaterno, this.vAmaterno ).subscribe(
                (res: ResponseWrapper) => {
                    this.trabajadores = res.json;
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
        console.log('NuevoReg: ' + actividad);
        console.log('Nuevo1' + JSON.stringify(atencion));
        this.registroAtencionWizardService.cambiarActividad(actividad);
        this.registroAtencionWizardService.cambiarAtencion(atencion);
        this.router.navigate(['/consultas/registro-atencion-trabajador', { outlets: { wizard: ['datos-trabajador'] } }]);
        console.log('Nuevo2');
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
        this.registerChangeInAtencionTrabajador();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Trabajador) {
        return item.id;
    }
    registerChangeInAtencionTrabajador() {
        this.eventSubscriber = this.eventManager.subscribe('atencionTrabajadorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
