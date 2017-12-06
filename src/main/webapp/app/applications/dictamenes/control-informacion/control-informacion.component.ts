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
    solicFormsObligatorio: Solicform[];
    solicFormsOpcional: Solicform[];
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
        console.log('sessionStorage.getItem(ng2-webstorage|solicitud): ' + sessionStorage.getItem('ng2-webstorage|solicitud'));
        for (let i = 0; i < sessionStorage.length; i++) {
            console.log('sessionStorage.key(' + i + '): ' + sessionStorage.key(i));
            console.log('sessionStorage.getItem(' + sessionStorage.key(i) + '): ' + sessionStorage.getItem(sessionStorage.key(i)));
        }
        this.limpiarSessionStorage();
    }

    load(nCodsolic) {
        this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
            this.solicitud = solicitud;
            this.formperfilService.obtenerlistaFormulariosObligatorios(1, this.solicitud.nCodsolic).subscribe(
                (res: ResponseWrapper) => this.solicFormsObligatorio = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.formperfilService.obtenerlistaFormulariosObligatorios(0, this.solicitud.nCodsolic).subscribe(
                (res: ResponseWrapper) => this.solicFormsOpcional = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
        });
    }

    limpiarSessionStorage() {
        sessionStorage.removeItem('ng2-webstorage|solicitud');
        sessionStorage.removeItem('ng2-webstorage|solicform');
        sessionStorage.removeItem('ng2-webstorage|formperfil');
        sessionStorage.removeItem('ng2-webstorage|undNegocios');
        sessionStorage.removeItem('ng2-webstorage|participacionesAccionarias');
        sessionStorage.removeItem('ng2-webstorage|participacionesMercado');
        sessionStorage.removeItem('ng2-webstorage|obras');
        sessionStorage.removeItem('ng2-webstorage|proyectos');
        sessionStorage.removeItem('ng2-webstorage|direcciones');
        sessionStorage.removeItem('ng2-webstorage|solicitante');
        sessionStorage.removeItem('ng2-webstorage|organizaciones');
        sessionStorage.removeItem('ng2-webstorage|resultadoNegociaciones');
        sessionStorage.removeItem('ng2-webstorage|responInfoFinanciera');
        sessionStorage.removeItem('ng2-webstorage|responeInfoLaboral');

        sessionStorage.removeItem('jhi-direcciones');
        sessionStorage.removeItem('jhi-formperfil');
        sessionStorage.removeItem('jhi-obras');
        sessionStorage.removeItem('jhi-organizaciones');
        sessionStorage.removeItem('jhi-participacionesaccionarias');
        sessionStorage.removeItem('jhi-participacionesmercado');
        sessionStorage.removeItem('jhi-proyectos');
        sessionStorage.removeItem('jhi-responeinfolaboral');
        sessionStorage.removeItem('jhi-responinfofinanciera');
        sessionStorage.removeItem('jhi-resultadonegociaciones');
        sessionStorage.removeItem('jhi-solicform');
        sessionStorage.removeItem('jhi-solicitante');
        sessionStorage.removeItem('jhi-solicitud');
        sessionStorage.removeItem('jhi-undnegocios');
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

    abrirFormulario(obj: Solicform) {
        if (obj.vTipoform === 'G' && obj.nCodfperf != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            // Formulario Perfil
            this.router.navigate(['../../dictamenes/formulario-perfil/' + obj.nCodfperf])
        }else {
            this.router.navigate(['./dictamenes/control-informacion/' + obj.nCodsolic])
        }
    }

    subirArchivo(obj: Solicform) {}
}
