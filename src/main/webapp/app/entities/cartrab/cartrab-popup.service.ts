import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Cartrab } from './cartrab.model';
import { CartrabService } from './cartrab.service';

@Injectable()
export class CartrabPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cartrabService: CartrabService

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
                this.cartrabService.find(id).subscribe((cartrab) => {
                    cartrab.tFecreg = this.datePipe
                        .transform(cartrab.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    cartrab.tFecupd = this.datePipe
                        .transform(cartrab.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.cartrabModalRef(component, cartrab);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cartrabModalRef(component, new Cartrab());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cartrabModalRef(component: Component, cartrab: Cartrab): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cartrab = cartrab;
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
