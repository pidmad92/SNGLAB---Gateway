import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Trabajador } from './trabajador.model';
import { TrabajadorService } from './trabajador.service';

@Injectable()
export class TrabajadorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private trabajadorService: TrabajadorService

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
                this.trabajadorService.find(id).subscribe((trabajador) => {
                    trabajador.tFecreg = this.datePipe
                        .transform(trabajador.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    trabajador.tFecupd = this.datePipe
                        .transform(trabajador.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.trabajadorModalRef(component, trabajador);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.trabajadorModalRef(component, new Trabajador());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    trabajadorModalRef(component: Component, trabajador: Trabajador): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.trabajador = trabajador;
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
