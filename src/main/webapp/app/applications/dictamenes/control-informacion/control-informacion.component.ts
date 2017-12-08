import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Solicform, SolicformService } from '../../../entities/solicform/';
import { LocalStorage } from 'ng2-webstorage';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Participa } from '../../../entities/participa/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Direccion } from '../../../entities/direccion/index';
import { Negocolect } from '../../../entities/negocolect/index';
import { Resulnegoc } from '../../../entities/resulnegoc/index';
import { Respinforma } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';

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

    // Listados de dato
    @LocalStorage('undNegocios')
    undNegocios: Undnegocio[];
    @LocalStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @LocalStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @LocalStorage('obras')
    obras: Hechoinver[];
    @LocalStorage('proyectos')
    proyectos: Hechoinver[];
    @LocalStorage('direcciones')
    direcciones: Direccion[];
    @LocalStorage('solicitante')
    solicitante: Negocolect;
    @LocalStorage('organizaciones')
    organizaciones: Negocolect[];
    @LocalStorage('resultadoNegociaciones')
    resultadoNegociaciones: Resulnegoc[];
    @LocalStorage('responInfoFinanciera')
    responInfoFinanciera: Respinforma;
    @LocalStorage('responeInfoLaboral')
    responeInfoLaboral: Respinforma;
    @LocalStorage('anexoLaboral')
    anexoLaboral: ModelAnexo[];

    @LocalStorage('inicioDir')
    inicioDir: boolean;
    @LocalStorage('inicioUnidad')
    inicioUnidad: boolean;
    @LocalStorage('inicioAccionaria')
    inicioAccionaria: boolean;
    @LocalStorage('inicioMercado')
    inicioMercado: boolean;
    @LocalStorage('inicioObra')
    inicioObra: boolean;
    @LocalStorage('inicioProyecto')
    inicioProyecto: boolean;
    @LocalStorage('inicioFinanciero')
    inicioFinanciero: boolean;
    @LocalStorage('inicioLaboral')
    inicioLaboral: boolean;
    @LocalStorage('inicioResultado')
    inicioResultado: boolean;
    @LocalStorage('inicioSolicitante')
    inicioSolicitante: boolean;
    @LocalStorage('inicioOrganizacion')
    inicioOrganizacion: boolean;

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
        /*console.log('localStorage.getItem(ng2-webstorage|solicitud): ' + localStorage.getItem('ng2-webstorage|solicitud'));
        for (let i = 0; i < localStorage.length; i++) {
            console.log('localStorage.key(' + i + '): ' + localStorage.key(i));
            console.log('localStorage.getItem(' + localStorage.key(i) + '): ' + localStorage.getItem(localStorage.key(i)));
        }*/
        this.limpiarLocalStorage();
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

    limpiarLocalStorage() {
        this.undNegocios = null;
        this.participacionesAccionarias = null;
        this.participacionesMercados = null;
        this.obras = null;
        this.proyectos = null;
        this.direcciones = null;
        this.solicitante = null;
        this.organizaciones = null;
        this.resultadoNegociaciones = null;
        this.responInfoFinanciera = null;
        this.responeInfoLaboral = null;
        this.anexoLaboral = null;
        // Inicios
        this.inicioDir = null;
        this.inicioAccionaria = null;
        this.inicioMercado = null;
        this.inicioObra = null;
        this.inicioProyecto = null;
        this.inicioUnidad = null;
        this.inicioFinanciero = null;
        this.inicioLaboral = null;
        this.inicioResultado = null;
        this.inicioSolicitante = null;
        this.inicioOrganizacion = null;
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
