import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Subregilabo } from './subregilabo.model';
import { SubregilaboService } from './subregilabo.service';

@Injectable()
export class SubregilaboPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private subregilaboService: SubregilaboService

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
                this.subregilaboService.find(id).subscribe((subregilabo) => {
                    subregilabo.dFechareg = this.datePipe
                        .transform(subregilabo.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    subregilabo.dFechaupd = this.datePipe
                        .transform(subregilabo.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.subregilaboModalRef(component, subregilabo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subregilaboModalRef(component, new Subregilabo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subregilaboModalRef(component: Component, subregilabo: Subregilabo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subregilabo = subregilabo;
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
