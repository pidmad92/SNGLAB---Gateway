import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Srubro } from './srubro.model';
import { SrubroService } from './srubro.service';

@Injectable()
export class SrubroPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private srubroService: SrubroService

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
                this.srubroService.find(id).subscribe((srubro) => {
                    srubro.tFecreg = this.datePipe
                        .transform(srubro.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    srubro.tFecupd = this.datePipe
                        .transform(srubro.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.srubroModalRef(component, srubro);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.srubroModalRef(component, new Srubro());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    srubroModalRef(component: Component, srubro: Srubro): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.srubro = srubro;
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
