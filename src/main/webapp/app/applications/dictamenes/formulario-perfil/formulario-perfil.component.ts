import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { SolicitudService, Solicitud } from '../../../entities/solicitud';
import { SolicformService, Solicform } from '../../../entities/solicform';
import { DireccionService, Direccion } from '../../../entities/direccion';
import { ActivatedRoute, Router } from '@angular/router';
import { Formperfil, FormperfilService } from '../../../entities/formperfil';
import { Actiecon, ActieconService } from '../../../entities/actiecon/index';
import { SessionStorage } from 'ng2-webstorage';

@Component({
    selector: 'jhi-formulario-perfil',
    templateUrl: './formulario-perfil.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfilComponent implements OnInit, OnDestroy {
    @SessionStorage('solicitud')
    solicitud: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;
    @SessionStorage('direcciones')
    direcciones: Direccion[];
    actiecon: Actiecon[];
    currentAccount: Account;
    eventSubscriber: Subscription;
    displayDireccion: boolean;
    direccionRegistro: Direccion;
    private subscription: Subscription;

    constructor(
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private direccionService: DireccionService,
        private actieconService: ActieconService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    ngOnInit() {
        this.displayDireccion = false;
        this.direccionRegistro = new Direccion;
        this.loadAll();
        // this.solicitudService.obtenerlistaFormulariosObligatorios();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() { }

    load(nCodfperf) {
        if (this.solicForm == null) {
            this.solicfromService.find(nCodfperf).subscribe((solicForm) => {
                this.solicForm = solicForm;
                const nCodsolic = solicForm.nCodsolic;

                if (this.solicitud == null) {
                    // tslint:disable-next-line:no-shadowed-variable
                    const nCodfperf = solicForm.nCodfperf;
                    this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
                        this.solicitud = solicitud;
                    });
                }
                if (this.formPerfil == null) {
                    this.formperfilService.find(nCodfperf).subscribe((formPerfil) => {
                        this.formPerfil = formPerfil;
                    });

                    this.direccionService.obtenerDireccion(nCodfperf).subscribe(
                        (res: ResponseWrapper) => this.direcciones = res.json,
                        (res: ResponseWrapper) => this.onError(res.json)
                    );
                }
                this.actieconService.query().subscribe(
                    (res: ResponseWrapper) => this.actiecon = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            });
        }
    }

    previousState() {
        window.history.back();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    showDialogDireccion() {
        this.displayDireccion = true;
    }
    guardarDireccion() {
        if (this.direcciones.lastIndexOf(this.direccionRegistro, 1) === -1) {
            this.direcciones.push(this.direccionRegistro);
        }
        this.direccionRegistro = new Direccion;
        this.displayDireccion = false;
    }
    cancelarDireccion() {
        this.direccionRegistro = new Direccion;
        this.displayDireccion = false;
    }

    editarDireccion(obj: Direccion) {
        this.direccionRegistro = obj;
        this.displayDireccion = true;
    }

    eliminarDireccion(obj: Direccion) {
        this.direcciones.splice(this.direcciones.indexOf(obj), 1);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }
}
