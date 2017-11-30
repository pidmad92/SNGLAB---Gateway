import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal } from '../../../shared/index';
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
    ) { }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    load(nCodfperf) {
        this.solicfromService.find(nCodfperf).subscribe((solicForm) => {
            this.solicForm = solicForm;
            const nCodsolic = solicForm.nCodsolic;
            // tslint:disable-next-line:no-shadowed-variable
            const nCodfperf = solicForm.nCodfperf;
            this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
                this.solicitud = solicitud;
            });
            this.formperfilService.find(nCodfperf).subscribe((formPerfil) => {
                this.formPerfil = formPerfil;
            });
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
    }

    private onError(error) {
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
