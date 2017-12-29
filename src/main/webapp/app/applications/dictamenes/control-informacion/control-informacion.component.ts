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
import { Formperfil } from '../../../entities/formperfil/index';
import { ComboModel } from '../../general/combobox.model';
import { Formulario } from '../formulario-perfil/formulario.model';
import { FormGroup } from '@angular/forms';

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

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitudLS: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

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
    formulario: Formulario[];

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
    @LocalStorage('regimenLaboral')
    selectedRegimen: ComboModel[];

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
        this.limpiarLocalStorage();
        this.loadAll();
        // this.solicitudService.obtenerlistaFormulariosObligatorios();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    load(nCodsolic) {
        this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
            this.solicitud = solicitud;
            this.solicitudLS = solicitud;
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
        this.solicitudLS = null;
        this.solicForm = null;
        this.formPerfil = null;
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
        this.formulario = null;
        this.selectedRegimen = null;
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
        } else if (obj.vTipoform === 'F1' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-n1/' + obj.nCodffina])
        } else if (obj.vTipoform === 'F1A' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-anexo1a/' + obj.nCodffina])
        } else if (obj.vTipoform === 'F1B' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-anexo1b/' + obj.nCodffina])
        } else if (obj.vTipoform === 'F1C' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-anexo1c/' + obj.nCodffina])
        } else if (obj.vTipoform === 'F1D' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-anexo1d/' + obj.nCodffina])
        } else if (obj.vTipoform === 'F2' && obj.nCodffina != null && (obj.vFlgest === 'P' || obj.vFlgest === 'O')) {
            this.router.navigate(['../../dictamenes/formulario-financiero-n2/' + obj.nCodffina])
        } else {
            this.router.navigate(['./dictamenes/control-informacion/' + obj.nCodsolic])
        }
    }

    subirArchivo(obj: Solicform) {}
}
