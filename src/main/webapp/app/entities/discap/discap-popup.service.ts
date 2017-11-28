import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Discap } from './discap.model';
import { DiscapService } from './discap.service';

@Injectable()
export class DiscapPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private discapService: DiscapService

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
                this.discapService.find(id).subscribe((discap) => {
                    discap.tFecreg = this.datePipe
                        .transform(discap.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    discap.tFecupd = this.datePipe
                        .transform(discap.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.discapModalRef(component, discap);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.discapModalRef(component, new Discap());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    discapModalRef(component: Component, discap: Discap): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.discap = discap;
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
