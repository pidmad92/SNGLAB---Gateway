import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Datlab } from './datlab.model';
import { DatlabService } from './datlab.service';

@Injectable()
export class DatlabPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private datlabService: DatlabService

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
                this.datlabService.find(id).subscribe((datlab) => {
                    if (datlab.dFecvincul) {
                        datlab.dFecvincul = {
                            year: datlab.dFecvincul.getFullYear(),
                            month: datlab.dFecvincul.getMonth() + 1,
                            day: datlab.dFecvincul.getDate()
                        };
                    }
                    if (datlab.dFeccese) {
                        datlab.dFeccese = {
                            year: datlab.dFeccese.getFullYear(),
                            month: datlab.dFeccese.getMonth() + 1,
                            day: datlab.dFeccese.getDate()
                        };
                    }
                    if (datlab.dFecfincon) {
                        datlab.dFecfincon = {
                            year: datlab.dFecfincon.getFullYear(),
                            month: datlab.dFecfincon.getMonth() + 1,
                            day: datlab.dFecfincon.getDate()
                        };
                    }
                    datlab.tFecreg = this.datePipe
                        .transform(datlab.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    datlab.tFecupd = this.datePipe
                        .transform(datlab.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.datlabModalRef(component, datlab);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.datlabModalRef(component, new Datlab());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    datlabModalRef(component: Component, datlab: Datlab): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.datlab = datlab;
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
