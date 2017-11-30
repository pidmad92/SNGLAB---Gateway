import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Falsoexp } from './falsoexp.model';
import { FalsoexpService } from './falsoexp.service';

@Injectable()
export class FalsoexpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private falsoexpService: FalsoexpService

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
                this.falsoexpService.find(id).subscribe((falsoexp) => {
                    falsoexp.tFecreg = this.datePipe
                        .transform(falsoexp.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    falsoexp.tFecupd = this.datePipe
                        .transform(falsoexp.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.falsoexpModalRef(component, falsoexp);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.falsoexpModalRef(component, new Falsoexp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    falsoexpModalRef(component: Component, falsoexp: Falsoexp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.falsoexp = falsoexp;
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
