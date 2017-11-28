import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dirdenun } from './dirdenun.model';
import { DirdenunService } from './dirdenun.service';

@Injectable()
export class DirdenunPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dirdenunService: DirdenunService

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
                this.dirdenunService.find(id).subscribe((dirdenun) => {
                    dirdenun.tFecreg = this.datePipe
                        .transform(dirdenun.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    dirdenun.tFecupd = this.datePipe
                        .transform(dirdenun.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dirdenunModalRef(component, dirdenun);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dirdenunModalRef(component, new Dirdenun());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dirdenunModalRef(component: Component, dirdenun: Dirdenun): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dirdenun = dirdenun;
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
