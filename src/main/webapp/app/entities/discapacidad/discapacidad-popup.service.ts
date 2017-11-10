import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Discapacidad } from './discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';

@Injectable()
export class DiscapacidadPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private discapacidadService: DiscapacidadService

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
                this.discapacidadService.find(id).subscribe((discapacidad) => {
                    discapacidad.dFechareg = this.datePipe
                        .transform(discapacidad.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    discapacidad.dFechaupd = this.datePipe
                        .transform(discapacidad.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.discapacidadModalRef(component, discapacidad);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.discapacidadModalRef(component, new Discapacidad());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    discapacidadModalRef(component: Component, discapacidad: Discapacidad): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.discapacidad = discapacidad;
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
