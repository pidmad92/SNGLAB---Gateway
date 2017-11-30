import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipdiligenc } from './tipdiligenc.model';
import { TipdiligencService } from './tipdiligenc.service';

@Injectable()
export class TipdiligencPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipdiligencService: TipdiligencService

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
                this.tipdiligencService.find(id).subscribe((tipdiligenc) => {
                    tipdiligenc.tFecreg = this.datePipe
                        .transform(tipdiligenc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipdiligenc.tFecupd = this.datePipe
                        .transform(tipdiligenc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipdiligencModalRef(component, tipdiligenc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipdiligencModalRef(component, new Tipdiligenc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipdiligencModalRef(component: Component, tipdiligenc: Tipdiligenc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipdiligenc = tipdiligenc;
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
