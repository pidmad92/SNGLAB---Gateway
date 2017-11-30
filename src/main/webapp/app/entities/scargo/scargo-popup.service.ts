import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scargo } from './scargo.model';
import { ScargoService } from './scargo.service';

@Injectable()
export class ScargoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scargoService: ScargoService

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
                this.scargoService.find(id).subscribe((scargo) => {
                    scargo.tFecreg = this.datePipe
                        .transform(scargo.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    scargo.tFecupd = this.datePipe
                        .transform(scargo.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.scargoModalRef(component, scargo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scargoModalRef(component, new Scargo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scargoModalRef(component: Component, scargo: Scargo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scargo = scargo;
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
