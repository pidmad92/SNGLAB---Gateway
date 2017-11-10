import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Perjuridire } from './perjuridire.model';
import { PerjuridireService } from './perjuridire.service';

@Injectable()
export class PerjuridirePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private perjuridireService: PerjuridireService

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
                this.perjuridireService.find(id).subscribe((perjuridire) => {
                    perjuridire.dFechareg = this.datePipe
                        .transform(perjuridire.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    perjuridire.dFechaupd = this.datePipe
                        .transform(perjuridire.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.perjuridireModalRef(component, perjuridire);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.perjuridireModalRef(component, new Perjuridire());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    perjuridireModalRef(component: Component, perjuridire: Perjuridire): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.perjuridire = perjuridire;
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
