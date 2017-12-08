import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { UsusolService, Ususol } from '../../../entities/ususol/index';

@Component({
    selector: 'jhi-registro-solicitudes',
    templateUrl: './registro-solicitudes.component.html',
    styleUrls: ['registro-solicitudes.scss']
})

export class RegistroSolicitudesComponent implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    display: boolean

    // Solicitudes
    listaSolicitudes: Solicitud[];

    // Usuario Solicitud
    ususolicitud: Ususol[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
        private solicitudService: SolicitudService,
        private ususolService: UsusolService,
    ) {}

    loadAll() {
        this.obtenerListaSolicitud()
    }

    ngOnInit() {
        this.loadAll();
        this.display = false;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {}

    obtenerListaSolicitud() {
        this.solicitudService.obtenerlistaSolicitudes().subscribe(
            (res: ResponseWrapper) => this.listaSolicitudes = res.json,
            (res: ResponseWrapper) => this.onError(res.json),
        );
        this.ususolService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ususolicitud = res.json;
                console.log(this.ususolicitud);
            },
            (res: ResponseWrapper) => this.onError(res.json),
        );

        this.ususolService.obtenerUsuarioPorTipo(1, 'CO').subscribe(
            (res: ResponseWrapper) => {console.log(res.json)},
            (res: ResponseWrapper) => this.onError(res.json),
        );
    }

    buscarSolicitudes() {}

    mostrarModalRegistro() {
        this.display = true;
    }

    guardarSolicitud() {
        this.display = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
