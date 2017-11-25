import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Accadoate } from './accadoate.model';
import { AccadoateService } from './accadoate.service';

@Injectable()
export class AccadoatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accadoateService: AccadoateService

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
                this.accadoateService.find(id).subscribe((accadoate) => {
                    accadoate.tFecreg = this.datePipe
                        .transform(accadoate.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    accadoate.tFecupd = this.datePipe
                        .transform(accadoate.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.accadoateModalRef(component, accadoate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accadoateModalRef(component, new Accadoate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accadoateModalRef(component: Component, accadoate: Accadoate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accadoate = accadoate;
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
