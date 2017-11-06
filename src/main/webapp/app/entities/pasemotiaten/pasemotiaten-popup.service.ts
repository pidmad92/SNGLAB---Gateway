import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pasemotiaten } from './pasemotiaten.model';
import { PasemotiatenService } from './pasemotiaten.service';

@Injectable()
export class PasemotiatenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pasemotiatenService: PasemotiatenService

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
                this.pasemotiatenService.find(id).subscribe((pasemotiaten) => {
                    pasemotiaten.dFechareg = this.datePipe
                        .transform(pasemotiaten.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    pasemotiaten.dFechaupd = this.datePipe
                        .transform(pasemotiaten.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.pasemotiatenModalRef(component, pasemotiaten);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pasemotiatenModalRef(component, new Pasemotiaten());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pasemotiatenModalRef(component: Component, pasemotiaten: Pasemotiaten): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pasemotiaten = pasemotiaten;
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
