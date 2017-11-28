import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motidenun } from './motidenun.model';
import { MotidenunService } from './motidenun.service';

@Injectable()
export class MotidenunPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motidenunService: MotidenunService

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
                this.motidenunService.find(id).subscribe((motidenun) => {
                    motidenun.tFecreg = this.datePipe
                        .transform(motidenun.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    motidenun.tFecupd = this.datePipe
                        .transform(motidenun.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motidenunModalRef(component, motidenun);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motidenunModalRef(component, new Motidenun());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motidenunModalRef(component: Component, motidenun: Motidenun): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motidenun = motidenun;
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
