import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable()
export class UsuarioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usuarioService: UsuarioService

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
                this.usuarioService.find(id).subscribe((usuario) => {
                    usuario.datFechaLog = this.datePipe
                        .transform(usuario.datFechaLog, 'yyyy-MM-ddTHH:mm:ss');
                    if (usuario.datFecTermino) {
                        usuario.datFecTermino = {
                            year: usuario.datFecTermino.getFullYear(),
                            month: usuario.datFecTermino.getMonth() + 1,
                            day: usuario.datFecTermino.getDate()
                        };
                    }
                    this.ngbModalRef = this.usuarioModalRef(component, usuario);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usuarioModalRef(component, new Usuario());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuarioModalRef(component: Component, usuario: Usuario): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuario = usuario;
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
