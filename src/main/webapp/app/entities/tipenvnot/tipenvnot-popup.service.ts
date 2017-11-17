import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipenvnot } from './tipenvnot.model';
import { TipenvnotService } from './tipenvnot.service';

@Injectable()
export class TipenvnotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipenvnotService: TipenvnotService

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
                this.tipenvnotService.find(id).subscribe((tipenvnot) => {
                    tipenvnot.dFechareg = this.datePipe
                        .transform(tipenvnot.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipenvnot.dFechaupd = this.datePipe
                        .transform(tipenvnot.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipenvnotModalRef(component, tipenvnot);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipenvnotModalRef(component, new Tipenvnot());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipenvnotModalRef(component: Component, tipenvnot: Tipenvnot): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipenvnot = tipenvnot;
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
