import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper } from '../../shared';
import { UsuarioGrupo } from './../usuario-grupo/usuario-grupo.model';
import { UsuarioGrupoService } from './../usuario-grupo/usuario-grupo.service';
import { GrupoService } from '../grupo/grupo.service';

@Injectable()
export class UsuarioGruposPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usuarioService: UsuarioService,
        private grupoService: GrupoService,
        private usuarioGrupoService: UsuarioGrupoService,
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
                this.grupoService.findByGrupo(id).subscribe((grupo) => {
                    this.ngbModalRef = this.usuarioModalRef(component, grupo, id);
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

    usuarioModalRef(component: Component, grupo: ResponseWrapper, id: String): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'sm', backdrop: 'static'});
        modalRef.componentInstance.usuarioGrupos = grupo.json;
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
