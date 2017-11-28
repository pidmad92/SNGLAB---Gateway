import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Multaconci } from './multaconci.model';
import { MultaconciService } from './multaconci.service';

@Injectable()
export class MultaconciPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private multaconciService: MultaconciService

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
                this.multaconciService.find(id).subscribe((multaconci) => {
                    if (multaconci.dFecresosd) {
                        multaconci.dFecresosd = {
                            year: multaconci.dFecresosd.getFullYear(),
                            month: multaconci.dFecresosd.getMonth() + 1,
                            day: multaconci.dFecresosd.getDate()
                        };
                    }
                    multaconci.tFecreg = this.datePipe
                        .transform(multaconci.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    multaconci.tFecupd = this.datePipe
                        .transform(multaconci.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.multaconciModalRef(component, multaconci);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.multaconciModalRef(component, new Multaconci());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    multaconciModalRef(component: Component, multaconci: Multaconci): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.multaconci = multaconci;
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
