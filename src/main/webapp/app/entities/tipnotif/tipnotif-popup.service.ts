import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipnotif } from './tipnotif.model';
import { TipnotifService } from './tipnotif.service';

@Injectable()
export class TipnotifPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipnotifService: TipnotifService

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
                this.tipnotifService.find(id).subscribe((tipnotif) => {
                    tipnotif.dFechareg = this.datePipe
                        .transform(tipnotif.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipnotif.dFechaupd = this.datePipe
                        .transform(tipnotif.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipnotifModalRef(component, tipnotif);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipnotifModalRef(component, new Tipnotif());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipnotifModalRef(component: Component, tipnotif: Tipnotif): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipnotif = tipnotif;
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
