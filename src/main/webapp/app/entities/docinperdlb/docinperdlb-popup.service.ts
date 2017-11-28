import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docinperdlb } from './docinperdlb.model';
import { DocinperdlbService } from './docinperdlb.service';

@Injectable()
export class DocinperdlbPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docinperdlbService: DocinperdlbService

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
                this.docinperdlbService.find(id).subscribe((docinperdlb) => {
                    docinperdlb.tFecreg = this.datePipe
                        .transform(docinperdlb.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    docinperdlb.tFecupd = this.datePipe
                        .transform(docinperdlb.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docinperdlbModalRef(component, docinperdlb);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docinperdlbModalRef(component, new Docinperdlb());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docinperdlbModalRef(component: Component, docinperdlb: Docinperdlb): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docinperdlb = docinperdlb;
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
