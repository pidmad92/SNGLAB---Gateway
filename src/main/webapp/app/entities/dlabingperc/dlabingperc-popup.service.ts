import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dlabingperc } from './dlabingperc.model';
import { DlabingpercService } from './dlabingperc.service';

@Injectable()
export class DlabingpercPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dlabingpercService: DlabingpercService

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
                this.dlabingpercService.find(id).subscribe((dlabingperc) => {
                    dlabingperc.dFechareg = this.datePipe
                        .transform(dlabingperc.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    dlabingperc.dFechaupd = this.datePipe
                        .transform(dlabingperc.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dlabingpercModalRef(component, dlabingperc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dlabingpercModalRef(component, new Dlabingperc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dlabingpercModalRef(component: Component, dlabingperc: Dlabingperc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dlabingperc = dlabingperc;
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
