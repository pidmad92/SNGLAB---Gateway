import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioHorariosPopupService } from './usuario-horarios-popup.service';
import { UsuarioHorario } from './../usuario-horario/usuario-horario.model';
import { UsuarioHorarioService } from './../usuario-horario/usuario-horario.service';
import { TipoUsuario, TipoUsuarioService } from '../tipo-usuario';
import { Principal, ResponseWrapper } from '../../shared';
declare var $: any;

@Component({
    selector: 'jhi-usuario-horarios-dialog',
    templateUrl: './usuario-horarios-dialog.component.html'
})
export class UsuarioHorariosDialogComponent implements OnInit {
    usuario: Usuario;
    tipousuarios: TipoUsuario[];
    isSaving: boolean;
    addHorary = false;

    routeSub: any;
    usuarioHorario: UsuarioHorario;
    usuarioHorarios: UsuarioHorario[];
    usuarios: Usuario[];
    idUsuario: number;
    private subscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private tipoUsuarioService: TipoUsuarioService,
        private eventManager: JhiEventManager,

        private usuarioHorarioService: UsuarioHorarioService,
        private route: ActivatedRoute
    ) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.find(this.idUsuario).subscribe((usuario) => {
                this.usuario = usuario;
        });
        /*this.tipoUsuarioService.query().subscribe((res: ResponseWrapper) => { this.tipousuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));*/
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
    clearBarAddHorary() {
        this.addHorary = !this.addHorary;
    }

    loadById(usuarioHorario) {
        this.usuarioHorario = usuarioHorario;
        this.addHorary = true;
    }

    save() {
        this.isSaving = true;
        this.usuarioHorario.datHoraInicio = this.usuarioHorario.datHoraInicio.replace(':', '');
        this.usuarioHorario.datHoraFin = this.usuarioHorario.datHoraFin.replace(':', '');
        this.usuarioHorario.usuario = this.usuario;
        if (this.usuarioHorario.id !== undefined) {
            this.addHorary = false;
            this.subscribeToSaveResponseUpdate(
                this.usuarioHorarioService.updateFromUser(this.usuarioHorario));
        } else {
            this.addHorary = false;
            this.subscribeToSaveResponse(
                this.usuarioHorarioService.createFromUser(this.usuarioHorario));
        }
    }
    changeBarAddHorary() {
        this.usuarioHorario = new UsuarioHorario();
        this.addHorary = !this.addHorary;
    }

    private subscribeToSaveResponse(result: Observable<ResponseWrapper>) {
        result.subscribe((res: ResponseWrapper) =>
            this.onSaveSuccessHorario(res), (res: Response) => this.onSaveError(res));
    }
    private subscribeToSaveResponseUpdate(result: Observable<ResponseWrapper>) {
        result.subscribe((res: ResponseWrapper) =>
            this.onSaveSuccessHorarioUpdate(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccessHorario(result: ResponseWrapper) {
        // this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.usuarioHorarios.push(this.usuarioHorario);
        this.isSaving = false;
        this.clear();
    }
    private onSaveSuccessHorarioUpdate(result: ResponseWrapper) {
        // this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveSuccess(result: UsuarioHorario) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    trackTipoUsuarioById(index: number, item: TipoUsuario) {
        return item.id;
    }
    diaSemana(dia: number) {
        let nombreDia: String;
        switch (dia) {
            case 1: { nombreDia = 'Lunes'; break; }
            case 2: { nombreDia = 'Martes'; break; }
            case 3: { nombreDia = 'Miercoles'; break; }
            case 4: { nombreDia = 'Jueves'; break; }
            case 5: { nombreDia = 'Viernes'; break; }
            case 6: { nombreDia = 'Sabado'; break; }
            case 7: { nombreDia = 'Domingo'; break; }
        }
        return nombreDia;
    }
}

@Component({
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioHorariosPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioHorariosPopupService: UsuarioHorariosPopupService,
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioHorariosPopupService
                    .open(UsuarioHorariosDialogComponent as Component, params['id']);
            } else {
                this.usuarioHorariosPopupService
                    .open(UsuarioHorariosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
