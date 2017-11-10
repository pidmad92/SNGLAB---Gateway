import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipatencion } from './tipatencion.model';
import { TipatencionService } from './tipatencion.service';

@Injectable()
export class TipatencionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipatencionService: TipatencionService

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
                this.tipatencionService.find(id).subscribe((tipatencion) => {
                    tipatencion.dFechareg = this.datePipe
                        .transform(tipatencion.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipatencion.dFechaupd = this.datePipe
                        .transform(tipatencion.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipatencionModalRef(component, tipatencion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipatencionModalRef(component, new Tipatencion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipatencionModalRef(component: Component, tipatencion: Tipatencion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipatencion = tipatencion;
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
