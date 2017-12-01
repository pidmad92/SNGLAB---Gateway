import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage } from 'ng2-webstorage';
import { Direccion } from '../../../entities/direccion/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Participa } from '../../../entities/participa/index';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';

@Component({
    selector: 'jhi-formulario-perfil3',
    templateUrl: './formulario-perfil3.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil3Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Flag de Modals
    displayOrganizacion: boolean;

    // Datos de Perfil
    @SessionStorage('solicitud')
    solicitud: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;

    // Listados de dato
    @SessionStorage('undNegocios')
    undNegocios: Undnegocio[];
    @SessionStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @SessionStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @SessionStorage('obras')
    obras: Hechoinver[];
    @SessionStorage('proyectos')
    proyectos: Hechoinver[];
    @SessionStorage('direcciones')
    direcciones: Direccion[];
    @SessionStorage('solicitante')
    solicitante: Negocolect;
    @SessionStorage('organizaciones')
    organizaciones: Negocolect[];

    // Organizacion
    organizacion: Negocolect;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,

        // Servicios
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private negocolectService: NegocolectService,
    ) { }

    // Organizaciones
    showOrganizacion() {
        this.displayOrganizacion = true;
    }
    cancelarOrganizacion() {
        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
    }
    guardarOrganizacion() {
        if (this.organizaciones.lastIndexOf(this.organizacion, 1) === -1) {
            this.organizaciones.push(this.organizacion);
        }
        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
    }
    editarOrganizacion(obj: Negocolect) {
        this.organizacion = obj;
        this.displayOrganizacion = true;
    }
    eliminarOrganizacion(obj: Negocolect) {
        this.organizaciones.splice(this.organizaciones.indexOf(obj), 1);
    }

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {

        this.negocolectService.obtenerNegociacionSolicitante(nCodfperf, 'S').subscribe((solicitante) =>
            this.solicitante = solicitante,
        );
        this.negocolectService.obtenerNegociacion(nCodfperf, 'O').subscribe(
            (res: ResponseWrapper) => this.organizaciones = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    irPerfil4() {
        this.router.navigate(['./dictamenes/formulario-perfil4']);
    }

    irPerfil3() {
        this.router.navigate(['./dictamenes/formulario-perfil3']);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

    irPerfil() {
        this.router.navigate(['./dictamenes/formulario-perfil/1/' + this.solicForm.nCodfperf]);
    }
}
