import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage } from 'ng2-webstorage';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Participa } from '../../../entities/participa/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Direccion } from '../../../entities/direccion/index';
import { Negocolect } from '../../../entities/negocolect/index';
import { RespinformaService, Respinforma } from '../../../entities/respinforma/index';
import { Resulnegoc } from '../../../entities/resulnegoc/index';

@Component({
    selector: 'jhi-formulario-perfil5',
    templateUrl: './formulario-perfil5.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil5Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

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
    @SessionStorage('resultadoNegociaciones')
    resultadoNegociaciones: Resulnegoc[];
    @SessionStorage('responInfoFinanciera')
    responInfoFinanciera: Respinforma;
    @SessionStorage('responeInfoLaboral')
    responeInfoLaboral: Respinforma;

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
        private respinformaService: RespinformaService,
    ) { }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        this.respinformaService.obtenerResponsableInformacion(nCodfperf, 'F').subscribe((responInfoFinanciera) =>
             this.responInfoFinanciera = responInfoFinanciera,
        );
        this.respinformaService.obtenerResponsableInformacion(nCodfperf, 'L').subscribe((responeInfoLaboral) =>
            this.responeInfoLaboral = responeInfoLaboral,
        );
        if (this.responInfoFinanciera === null) {
            this.responInfoFinanciera = new Respinforma;
        }
        if (this.responeInfoLaboral === null) {
            this.responeInfoLaboral = new Respinforma;
        }
    }

    ngOnInit() {
        this.loadAll();
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
    }

    private onError(error) {
        console.log('error: ' + error);
        this.jhiAlertService.error(error.message, null, null);
    }

    irPerfil6() {
        this.router.navigate(['./dictamenes/formulario-perfil6']);
    }

    irPerfil5() {
        this.router.navigate(['./dictamenes/formulario-perfil5']);
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
        this.router.navigate(['./dictamenes/formulario-perfil/' + this.solicForm.nCodfperf]);
    }
}