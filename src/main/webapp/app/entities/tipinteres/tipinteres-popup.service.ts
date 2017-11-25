import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipinteres } from './tipinteres.model';
import { TipinteresService } from './tipinteres.service';

@Injectable()
export class TipinteresPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipinteresService: TipinteresService

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
                this.tipinteresService.find(id).subscribe((tipinteres) => {
                    tipinteres.tFecreg = this.datePipe
                        .transform(tipinteres.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipinteres.tFecupd = this.datePipe
                        .transform(tipinteres.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipinteresModalRef(component, tipinteres);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipinteresModalRef(component, new Tipinteres());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipinteresModalRef(component: Component, tipinteres: Tipinteres): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipinteres = tipinteres;
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
