import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Denunte } from './denunte.model';
import { DenunteService } from './denunte.service';

@Injectable()
export class DenuntePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private denunteService: DenunteService

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
                this.denunteService.find(id).subscribe((denunte) => {
                    denunte.tFecreg = this.datePipe
                        .transform(denunte.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    denunte.tFecupd = this.datePipe
                        .transform(denunte.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.denunteModalRef(component, denunte);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.denunteModalRef(component, new Denunte());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    denunteModalRef(component: Component, denunte: Denunte): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.denunte = denunte;
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
