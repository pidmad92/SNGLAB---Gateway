import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ListadoSolicitudesService } from './listado-solicitudes.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { SessionStorage } from 'ng2-webstorage';
import { Solicform } from '../../../entities/solicform/index';
import { Formperfil } from '../../../entities/formperfil/index';
import { Direccion } from '../../../entities/direccion/index';

@Component({
    selector: 'jhi-listado-solicitudes',
    templateUrl: './listado-solicitudes.component.html',
    styleUrls: ['listado-solicitudes.scss']
})

export class ListadoSolicitudesComponent implements OnInit, OnDestroy {
    @SessionStorage('solicitud')
    solicitud2: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;
    @SessionStorage('direcciones')
    direcciones: Direccion[];
    solicituds: Solicitud[];
    solicitud: Solicitud;
    currentAccount: Account;
    eventSubscriber: Subscription;
    currentSearch: string;
    display = false;

    block: boolean;

    vCodigo: string;
    vNumRecibo1: string;
    vNumRecibo2: string;
    vNumRecibo3: string;
    vNumRecibo4: string;
    tFecPago: any;

    ruc: string;

    showDialog(obj: Solicitud) {
        this.display = true;
        this.solicitud = obj;
    }

    constructor(
        private solicitudService: SolicitudService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
    ) {}

    loadAll() {
        this.obtenerListaSolicitud();
    }

    ngOnInit() {
        this.block = false;
        this.ruc = '20100130204';
        this.loadAll();
        this.display = false;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
        // this.eventSubscriber.unsubscribe();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    obtenerListaSolicitud() {
        this.solicitudService.obtenerlistaSolicitudesPorRuc(this.ruc).subscribe(
            (res: ResponseWrapper) => this.solicituds = res.json,
            (res: ResponseWrapper) => this.onError(res.json),
        );
    }

    setColor() {
        let estadoSolicitud: string;
        estadoSolicitud = 'E';
        if (estadoSolicitud = 'P') {
            return '';
        }else if (estadoSolicitud = 'E') {
            return 'yellow';
        }else if (estadoSolicitud = 'O') {
            return 'red';
        }else {
            return 'green';
        }
    }

    verificarVoucher() {
        let verificar = true;
        if (this.vCodigo.length > 0) {
            verificar = false;
        }else if (this.vNumRecibo1.length > 0) {
            verificar = false;
        }else if (this.vNumRecibo2.length > 0) {
            verificar = false;
        }else if (this.vNumRecibo3.length > 0) {
            verificar = false;
        }else if (this.vNumRecibo4.length > 0) {
            verificar = false;
        }else if (this.tFecPago.length > 0) {
            verificar = false;
        }
    }

    enviarVoucher() {}

    verControlInformacion(obj: Solicitud) {
        this.router.navigate(['../../dictamenes/control-informacion/' + obj.nCodsolic])
    }
}
