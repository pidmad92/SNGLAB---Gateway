import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Solicform, SolicformService } from '../../../entities/solicform/';

@Component({
    selector: 'jhi-control-informacion',
    templateUrl: './control-informacion.component.html',
    styleUrls: ['control-informacion.scss']
})

export class ControlInformacionComponent implements OnInit, OnDestroy {
    solicitud: Solicitud;
    solicFormsObligatorio: Solicitud[];
    solicFormsOpcional: Solicitud[];
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    constructor(
        private solicitudService: SolicitudService,
        private formperfilService: SolicformService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodsolic']);
        });
    }

    ngOnInit() {
        this.loadAll();
        // this.solicitudService.obtenerlistaFormulariosObligatorios();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    load(nCodsolic) {
        this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
            this.solicitud = solicitud;
            this.formperfilService.obtenerlistaFormulariosObligatorios(1, this.solicitud.nCodsolic).subscribe(
                (res: ResponseWrapper) => { console.log(res.json); this.solicFormsObligatorio = res.json; },
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.formperfilService.obtenerlistaFormulariosObligatorios(0, this.solicitud.nCodsolic).subscribe(
                (res: ResponseWrapper) => { console.log(res.json); this.solicFormsOpcional = res.json; },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() { }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    listarSolicitudes() {
        this.router.navigate(['./dictamenes/listado-solicitudes'])
    }
}
