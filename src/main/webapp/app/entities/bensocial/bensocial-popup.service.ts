import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Bensocial } from './bensocial.model';
import { BensocialService } from './bensocial.service';

@Injectable()
export class BensocialPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private bensocialService: BensocialService

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
                this.bensocialService.find(id).subscribe((bensocial) => {
                    bensocial.tFecreg = this.datePipe
                        .transform(bensocial.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    bensocial.tFecupd = this.datePipe
                        .transform(bensocial.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.bensocialModalRef(component, bensocial);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bensocialModalRef(component, new Bensocial());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bensocialModalRef(component: Component, bensocial: Bensocial): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bensocial = bensocial;
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
