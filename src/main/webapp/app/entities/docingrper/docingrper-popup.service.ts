import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docingrper } from './docingrper.model';
import { DocingrperService } from './docingrper.service';

@Injectable()
export class DocingrperPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docingrperService: DocingrperService

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
                this.docingrperService.find(id).subscribe((docingrper) => {
                    docingrper.tFecreg = this.datePipe
                        .transform(docingrper.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    docingrper.tFecupd = this.datePipe
                        .transform(docingrper.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docingrperModalRef(component, docingrper);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docingrperModalRef(component, new Docingrper());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docingrperModalRef(component: Component, docingrper: Docingrper): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docingrper = docingrper;
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
