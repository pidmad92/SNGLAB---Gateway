import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipproveid } from './tipproveid.model';
import { TipproveidService } from './tipproveid.service';

@Injectable()
export class TipproveidPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipproveidService: TipproveidService

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
                this.tipproveidService.find(id).subscribe((tipproveid) => {
                    tipproveid.tFecreg = this.datePipe
                        .transform(tipproveid.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipproveid.tFecupd = this.datePipe
                        .transform(tipproveid.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipproveidModalRef(component, tipproveid);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipproveidModalRef(component, new Tipproveid());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipproveidModalRef(component: Component, tipproveid: Tipproveid): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipproveid = tipproveid;
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
