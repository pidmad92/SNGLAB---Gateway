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
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-formulario-perfil4',
    templateUrl: './formulario-perfil4.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil4Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;

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

    displayResultado: boolean;
    resultadoRegistro: Resulnegoc;

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
    private resulNegocService: ResulnegocService,
    ) { }

    showResultado() {
        this.displayResultado = true;
    }
    cancelarResultado() {
        this.resultadoRegistro = new Undnegocio;
        this.displayResultado = false;
    }
    guardarResultado() {
        if (this.resultadoNegociaciones.lastIndexOf(this.resultadoRegistro, 1) === -1) {
            this.resultadoNegociaciones.push(this.resultadoRegistro);
        }
        this.resultadoRegistro = new Undnegocio;
        this.displayResultado = false;
    }
    editarResultado(obj: Resulnegoc) {
        this.resultadoRegistro = obj;
        this.displayResultado = true;
    }
    eliminarResultado(obj: Resulnegoc) {
        this.resultadoNegociaciones.splice(this.resultadoNegociaciones.indexOf(obj), 1);
    }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        this.resulNegocService.obtenerResultadoNegociaciones(nCodfperf).subscribe(
            (res: ResponseWrapper) => this.resultadoNegociaciones = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.displayResultado = false;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
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

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
