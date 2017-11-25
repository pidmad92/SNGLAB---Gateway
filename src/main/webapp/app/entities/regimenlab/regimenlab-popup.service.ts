import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Regimenlab } from './regimenlab.model';
import { RegimenlabService } from './regimenlab.service';

@Injectable()
export class RegimenlabPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private regimenlabService: RegimenlabService

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
                this.regimenlabService.find(id).subscribe((regimenlab) => {
                    regimenlab.tFecreg = this.datePipe
                        .transform(regimenlab.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    regimenlab.tFecupd = this.datePipe
                        .transform(regimenlab.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.regimenlabModalRef(component, regimenlab);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.regimenlabModalRef(component, new Regimenlab());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    regimenlabModalRef(component: Component, regimenlab: Regimenlab): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.regimenlab = regimenlab;
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
