import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule } from 'primeng/primeng';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Direccion } from '../../../entities/direccion/index';
import { SessionStorage } from 'ng2-webstorage';

@Component({
    selector: 'jhi-formulario-perfil2',
    templateUrl: './formulario-perfil2.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil2Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Flags de dialogs
    displayUnidad: boolean;
    displayPartiAccionaria: boolean;
    displayPartiMercado: boolean;
    displayObras: boolean;
    displayInvProy: boolean;

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

    // Objetos CUD
    undNegocio: Undnegocio;
    participacionAccionaria: Participa;
    participacionMercado: Participa;
    obra: Hechoinver;
    proyecto: Hechoinver;

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
        private undNegocioService: UndnegocioService,
        private participaService: ParticipaService,
        private hechoinverService: HechoinverService,
    ) { }

    ngOnInit() {
        this.loadAll();
        this.displayUnidad = false;
        this.displayPartiAccionaria = false;
        this.displayPartiMercado = false;
        this.displayObras = false;
        this.displayInvProy = false;
        this.undNegocio = new Undnegocio;
        this.participacionAccionaria = new Participa;
        this.participacionMercado = new Participa;
        this.obra = new Hechoinver;
        this.proyecto = new Hechoinver;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
    }

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {

            // Inicializacion de listados
            this.undNegocios = new Array<Undnegocio>();
            this.participacionesAccionarias = new Array<Participa>();
            this.participacionesMercados = new Array<Participa>();
            this.obras = new Array<Hechoinver>();
            this.proyectos = new Array<Hechoinver>();

            this.undNegocioService.obtenerUnidadNegocio(nCodfperf).subscribe(
                (res: ResponseWrapper) => this.undNegocios = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'A').subscribe(
                (res: ResponseWrapper) => this.participacionesAccionarias = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'M').subscribe(
                (res: ResponseWrapper) => this.participacionesMercados = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'H').subscribe(
                (res: ResponseWrapper) => this.obras = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
            this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'I').subscribe(
                (res: ResponseWrapper) => this.proyectos = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
    }

    // Unidad de Negocio
    showUnidad() {
        this.displayUnidad = true;
    }
    cancelarUnidad() {
        this.undNegocio = new Undnegocio;
        this.displayUnidad = false;
    }
    guardarUnidad() {
        if (this.undNegocios.lastIndexOf(this.undNegocio, 1) === -1) {
            this.undNegocios.push(this.undNegocio);
        }
        this.undNegocio = new Undnegocio;
        this.displayUnidad = false;
    }
    editarUnidad(obj: Undnegocio) {
        this.undNegocio = obj;
        this.displayUnidad = true;
    }
    eliminarUnidad(obj: Undnegocio) {
        this.undNegocios.splice(this.undNegocios.indexOf(obj), 1);
    }

    // Participacion Accionaria
    showPartiAccionaria() {
        this.displayPartiAccionaria = true;
    }
    cancelarPartiAccionaria() {
        this.participacionAccionaria = new Participa;
        this.displayPartiAccionaria = false;
    }
    guardarPartiAccionaria() {
        if (this.participacionesAccionarias.lastIndexOf(this.participacionAccionaria, 1) === -1) {
            this.participacionesAccionarias.push(this.participacionAccionaria);
        }
        this.participacionAccionaria = new Participa;
        this.displayPartiAccionaria = false;
    }
    editarPartiAccionaria(obj: Participa) {
        this.participacionAccionaria = obj;
        this.displayPartiAccionaria = true;
    }
    eliminarPartiAccionaria(obj: Participa) {
        this.participacionesAccionarias.splice(this.participacionesAccionarias.indexOf(obj), 1);
    }

    // Participacion de Mercado
    showPartiMercado() {
        this.displayPartiMercado = true;
    }
    cancelarPartiMercado() {
        this.participacionMercado = new Participa;
        this.displayPartiMercado = false;
    }
    guardarPartiMercado() {
        if (this.participacionesMercados.lastIndexOf(this.participacionMercado, 1) === -1) {
            this.participacionesMercados.push(this.participacionMercado);
        }
        this.participacionMercado = new Participa;
        this.displayPartiMercado = false;
    }
    editarPartiMercado(obj: Participa) {
        this.participacionMercado = obj;
        this.displayPartiMercado = true;
    }
    eliminarPartiMercado(obj: Participa) {
        this.participacionesMercados.splice(this.participacionesMercados.indexOf(obj), 1);
    }

    // Principales Obras
    showObras() {
        this.displayObras = true;
    }
    cancelarObras() {
        this.obra = new Hechoinver;
        this.displayObras = false;
    }
    guardarObras() {
        if (this.obras == null) {
            this.obras = new Array<Hechoinver>();
        }
        if (this.obras.lastIndexOf(this.obra, 1) === -1) {
            this.obras.push(this.obra);
        }
        this.obra = new Hechoinver;
        this.displayObras = false;
    }
    editarObras(obj: Hechoinver) {
        this.obra = obj;
        this.displayObras = true;
    }
    eliminarObras(obj: Hechoinver) {
        this.obras.splice(this.obras.indexOf(obj), 1);
    }

    // Inversiones y Proyectos
    showInvProy() {
        this.displayInvProy = true;
    }
    cancelarInvProy() {
        this.proyecto = new Hechoinver;
        this.displayInvProy = false;
    }
    guardarInvProy() {
        if (this.proyectos == null) {
            this.proyectos = new Array<Hechoinver>();
        }
        if (this.proyectos.lastIndexOf(this.proyecto, 1) === -1) {
            this.proyectos.push(this.proyecto);
        }
        this.proyecto = new Hechoinver;
        this.displayInvProy = false;
    }
    editarInvProy(obj: Hechoinver) {
        this.proyecto = obj;
        this.displayInvProy = true;
    }
    eliminarInvProy(obj: Hechoinver) {
        this.proyectos.splice(this.proyectos.indexOf(obj), 1);
    }

    // Router
    irPerfil3() {
        this.router.navigate(['./dictamenes/formulario-perfil3']);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

    irPerfil() {
        this.router.navigate(['./dictamenes/formulario-perfil/' + this.solicForm.nCodfperf]);
    }

    // Error
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
