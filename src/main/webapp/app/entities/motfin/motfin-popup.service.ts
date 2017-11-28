import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motfin } from './motfin.model';
import { MotfinService } from './motfin.service';

@Injectable()
export class MotfinPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motfinService: MotfinService

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
                this.motfinService.find(id).subscribe((motfin) => {
                    motfin.tFecreg = this.datePipe
                        .transform(motfin.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    motfin.tFecupd = this.datePipe
                        .transform(motfin.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motfinModalRef(component, motfin);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motfinModalRef(component, new Motfin());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motfinModalRef(component: Component, motfin: Motfin): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motfin = motfin;
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
