import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Atencion } from './atencion.model';
import { AtencionService } from './atencion.service';

@Injectable()
export class AtencionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atencionService: AtencionService

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
                this.atencionService.find(id).subscribe((atencion) => {
                    atencion.tFecreg = this.datePipe
                        .transform(atencion.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    atencion.tFecupd = this.datePipe
                        .transform(atencion.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atencionModalRef(component, atencion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atencionModalRef(component, new Atencion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atencionModalRef(component: Component, atencion: Atencion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atencion = atencion;
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
