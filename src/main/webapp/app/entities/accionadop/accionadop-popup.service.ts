import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Accionadop } from './accionadop.model';
import { AccionadopService } from './accionadop.service';

@Injectable()
export class AccionadopPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accionadopService: AccionadopService

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
                this.accionadopService.find(id).subscribe((accionadop) => {
                    accionadop.tFecreg = this.datePipe
                        .transform(accionadop.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    accionadop.tFecupd = this.datePipe
                        .transform(accionadop.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.accionadopModalRef(component, accionadop);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accionadopModalRef(component, new Accionadop());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accionadopModalRef(component: Component, accionadop: Accionadop): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accionadop = accionadop;
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
