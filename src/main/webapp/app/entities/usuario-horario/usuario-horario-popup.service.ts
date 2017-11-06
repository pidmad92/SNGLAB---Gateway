import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UsuarioHorario } from './usuario-horario.model';
import { UsuarioHorarioService } from './usuario-horario.service';

@Injectable()
export class UsuarioHorarioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private usuarioHorarioService: UsuarioHorarioService

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
                this.usuarioHorarioService.find(id).subscribe((usuarioHorario) => {
                    if (usuarioHorario.datHoraInicio) {
                        usuarioHorario.datHoraInicio = {
                            year: usuarioHorario.datHoraInicio.getFullYear(),
                            month: usuarioHorario.datHoraInicio.getMonth() + 1,
                            day: usuarioHorario.datHoraInicio.getDate()
                        };
                    }
                    if (usuarioHorario.datHoraFin) {
                        usuarioHorario.datHoraFin = {
                            year: usuarioHorario.datHoraFin.getFullYear(),
                            month: usuarioHorario.datHoraFin.getMonth() + 1,
                            day: usuarioHorario.datHoraFin.getDate()
                        };
                    }
                    usuarioHorario.datFechaLog = this.datePipe
                        .transform(usuarioHorario.datFechaLog, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.usuarioHorarioModalRef(component, usuarioHorario);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usuarioHorarioModalRef(component, new UsuarioHorario());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuarioHorarioModalRef(component: Component, usuarioHorario: UsuarioHorario): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuarioHorario = usuarioHorario;
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
