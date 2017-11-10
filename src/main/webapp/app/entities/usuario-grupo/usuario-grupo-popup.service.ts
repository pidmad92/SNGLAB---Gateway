import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UsuarioGrupo } from './usuario-grupo.model';
import { UsuarioGrupoService } from './usuario-grupo.service';

@Injectable()
export class UsuarioGrupoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usuarioGrupoService: UsuarioGrupoService

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
                this.usuarioGrupoService.find(id).subscribe((usuarioGrupo) => {
                    usuarioGrupo.datFechaLog = this.datePipe
                        .transform(usuarioGrupo.datFechaLog, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.usuarioGrupoModalRef(component, usuarioGrupo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usuarioGrupoModalRef(component, new UsuarioGrupo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuarioGrupoModalRef(component: Component, usuarioGrupo: UsuarioGrupo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuarioGrupo = usuarioGrupo;
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
