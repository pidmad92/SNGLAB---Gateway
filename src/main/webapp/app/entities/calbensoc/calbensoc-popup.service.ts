import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Calbensoc } from './calbensoc.model';
import { CalbensocService } from './calbensoc.service';

@Injectable()
export class CalbensocPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calbensocService: CalbensocService

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
                this.calbensocService.find(id).subscribe((calbensoc) => {
                    calbensoc.tFecreg = this.datePipe
                        .transform(calbensoc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    calbensoc.tFecupd = this.datePipe
                        .transform(calbensoc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calbensocModalRef(component, calbensoc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calbensocModalRef(component, new Calbensoc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calbensocModalRef(component: Component, calbensoc: Calbensoc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calbensoc = calbensoc;
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
