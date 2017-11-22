import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper } from '../../shared';
import { UsuarioHorario } from './../usuario-horario/usuario-horario.model';
import { UsuarioHorarioService } from './../usuario-horario/usuario-horario.service';

@Injectable()
export class UsuarioHorariosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usuarioService: UsuarioService,

        private usuarioHorarioService: UsuarioHorarioService,
        dateUtils: JhiDateUtils
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.usuarioHorarioService.findById(id).subscribe((usuarioHorarios) => {
                    this.ngbModalRef = this.usuarioModalRef(component, usuarioHorarios, id);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    /*this.ngbModalRef = this.usuarioModalRef(component, new ResponseWrapper());*/
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuarioModalRef(component: Component, usuarioHorarios: ResponseWrapper, id: String): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuarioHorarios = usuarioHorarios.json;
        modalRef.componentInstance.idUsuario = id;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
