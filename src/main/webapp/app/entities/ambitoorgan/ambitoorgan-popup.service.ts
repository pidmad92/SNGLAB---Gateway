import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Ambitoorgan } from './ambitoorgan.model';
import { AmbitoorganService } from './ambitoorgan.service';

@Injectable()
export class AmbitoorganPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ambitoorganService: AmbitoorganService

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
                this.ambitoorganService.find(id).subscribe((ambitoorgan) => {
                    ambitoorgan.tFecreg = this.datePipe
                        .transform(ambitoorgan.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    ambitoorgan.tFecupd = this.datePipe
                        .transform(ambitoorgan.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ambitoorganModalRef(component, ambitoorgan);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ambitoorganModalRef(component, new Ambitoorgan());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ambitoorganModalRef(component: Component, ambitoorgan: Ambitoorgan): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ambitoorgan = ambitoorgan;
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
