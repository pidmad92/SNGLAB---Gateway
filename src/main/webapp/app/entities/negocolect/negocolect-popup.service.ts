import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Negocolect } from './negocolect.model';
import { NegocolectService } from './negocolect.service';

@Injectable()
export class NegocolectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private negocolectService: NegocolectService

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
                this.negocolectService.find(id).subscribe((negocolect) => {
                    negocolect.tFecvigde = this.datePipe
                        .transform(negocolect.tFecvigde, 'yyyy-MM-ddTHH:mm:ss');
                    negocolect.tFecvigha = this.datePipe
                        .transform(negocolect.tFecvigha, 'yyyy-MM-ddTHH:mm:ss');
                    negocolect.tFecreg = this.datePipe
                        .transform(negocolect.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    negocolect.tFecupd = this.datePipe
                        .transform(negocolect.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.negocolectModalRef(component, negocolect);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.negocolectModalRef(component, new Negocolect());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    negocolectModalRef(component: Component, negocolect: Negocolect): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.negocolect = negocolect;
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
