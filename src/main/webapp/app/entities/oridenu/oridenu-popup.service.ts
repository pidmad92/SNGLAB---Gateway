import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Oridenu } from './oridenu.model';
import { OridenuService } from './oridenu.service';

@Injectable()
export class OridenuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private oridenuService: OridenuService

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
                this.oridenuService.find(id).subscribe((oridenu) => {
                    oridenu.tFecreg = this.datePipe
                        .transform(oridenu.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    oridenu.tFecupd = this.datePipe
                        .transform(oridenu.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.oridenuModalRef(component, oridenu);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.oridenuModalRef(component, new Oridenu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    oridenuModalRef(component: Component, oridenu: Oridenu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.oridenu = oridenu;
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
