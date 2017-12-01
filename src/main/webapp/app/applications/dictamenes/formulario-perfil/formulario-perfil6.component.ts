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
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService, Anexlaboral } from '../../../entities/anexlaboral/index';
import { Resulnegoc } from '../../../entities/resulnegoc/index';
import { Respinforma } from '../../../entities/respinforma/index';

@Component({
    selector: 'jhi-formulario-perfil6',
    templateUrl: './formulario-perfil6.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil6Component implements OnInit, OnDestroy {
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
    @SessionStorage('anexoLaboral')
    anexoLaboral: ModelAnexo[];

    anios: Anexlaboral[];
    decretos: Anexlaboral[];
    descripciones: Anexlaboral[];

    cantidad: ModelAnexo[];

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
        private anexlaboralService: AnexlaboralService,
    ) { }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        this.anexlaboralService.obtenerAnios(nCodfperf).subscribe(
            (res: ResponseWrapper) => {
                 this.anios = <Anexlaboral[]>res.json;
                 this.anexlaboralService.obtenerDecretosPorTipoAnio(nCodfperf, 'D', this.anios[0].nAnioanex).subscribe(
                    (res1: ResponseWrapper) => {
                         this.decretos = <Anexlaboral[]>res1.json;
                    },
                    (res1: ResponseWrapper) => this.onError(res1.json)
                 );
                 this.anexlaboralService.obtenerDescripcionPorTipoAnio(nCodfperf, 'D', this.anios[0].nAnioanex).subscribe(
                    (res2: ResponseWrapper) => {
                            this.descripciones = <Anexlaboral[]>res2.json;
                    },
                    (res2: ResponseWrapper) => this.onError(res2.json)
                );
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
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
