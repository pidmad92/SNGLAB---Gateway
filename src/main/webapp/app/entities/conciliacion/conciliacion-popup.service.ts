import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Conciliacion } from './conciliacion.model';
import { ConciliacionService } from './conciliacion.service';

@Injectable()
export class ConciliacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private conciliacionService: ConciliacionService

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
                this.conciliacionService.find(id).subscribe((conciliacion) => {
                    conciliacion.dFecha = this.datePipe
                        .transform(conciliacion.dFecha, 'yyyy-MM-ddTHH:mm:ss');
                    conciliacion.dFechareg = this.datePipe
                        .transform(conciliacion.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    conciliacion.dFechaupd = this.datePipe
                        .transform(conciliacion.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.conciliacionModalRef(component, conciliacion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conciliacionModalRef(component, new Conciliacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conciliacionModalRef(component: Component, conciliacion: Conciliacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conciliacion = conciliacion;
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
