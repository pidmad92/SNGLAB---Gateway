import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';

@Injectable()
export class ModalBusquedaTrabajadorService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,

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
                /*this.conciliaService.find(id).subscribe((concilia) => {
                    // concilia.tFecreg = this.datePipe
                        // .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                        if (concilia.dFecconci) {
                            concilia.dFecconci = {
                                year: concilia.dFecconci.getFullYear(),
                                month: concilia.dFecconci.getMonth() + 1,
                                day: concilia.dFecconci.getDate()
                            };
                        }
                        concilia.tFecreg = this.datePipe
                            .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                        concilia.tFecupd = this.datePipe
                            .transform(concilia.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                });*/
                this.ngbModalRef = this.modalBusquedaModalRef(component, null);
                resolve(this.ngbModalRef);

            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.modalBusquedaModalRef(component, null);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    modalBusquedaModalRef(component: Component, abogado: any): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.abogado = abogado;
        modalRef.result.then((result) => {
            this.router.navigate(['liquidaciones/registro-atencion/trabajador'], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['liquidaciones/registro-atencion/trabajador'], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
