import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pasegl } from './pasegl.model';
import { PaseglService } from './pasegl.service';

@Injectable()
export class PaseglPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private paseglService: PaseglService

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
                this.paseglService.find(id).subscribe((pasegl) => {
                    pasegl.tFecreg = this.datePipe
                        .transform(pasegl.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    pasegl.tFecupd = this.datePipe
                        .transform(pasegl.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.paseglModalRef(component, pasegl);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.paseglModalRef(component, new Pasegl());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paseglModalRef(component: Component, pasegl: Pasegl): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pasegl = pasegl;
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
