import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Federacion } from './federacion.model';
import { FederacionService } from './federacion.service';

@Injectable()
export class FederacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private federacionService: FederacionService

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
                this.federacionService.find(id).subscribe((federacion) => {
                    federacion.tFecafilia = this.datePipe
                        .transform(federacion.tFecafilia, 'yyyy-MM-ddTHH:mm:ss');
                    federacion.tFecreg = this.datePipe
                        .transform(federacion.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    federacion.tFecupd = this.datePipe
                        .transform(federacion.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.federacionModalRef(component, federacion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.federacionModalRef(component, new Federacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    federacionModalRef(component: Component, federacion: Federacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.federacion = federacion;
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
