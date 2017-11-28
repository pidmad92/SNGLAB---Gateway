import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Calperiodo } from './calperiodo.model';
import { CalperiodoService } from './calperiodo.service';

@Injectable()
export class CalperiodoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calperiodoService: CalperiodoService

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
                this.calperiodoService.find(id).subscribe((calperiodo) => {
                    if (calperiodo.tFecini) {
                        calperiodo.tFecini = {
                            year: calperiodo.tFecini.getFullYear(),
                            month: calperiodo.tFecini.getMonth() + 1,
                            day: calperiodo.tFecini.getDate()
                        };
                    }
                    if (calperiodo.tFecfin) {
                        calperiodo.tFecfin = {
                            year: calperiodo.tFecfin.getFullYear(),
                            month: calperiodo.tFecfin.getMonth() + 1,
                            day: calperiodo.tFecfin.getDate()
                        };
                    }
                    calperiodo.tFecreg = this.datePipe
                        .transform(calperiodo.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    calperiodo.tFecupd = this.datePipe
                        .transform(calperiodo.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calperiodoModalRef(component, calperiodo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calperiodoModalRef(component, new Calperiodo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calperiodoModalRef(component: Component, calperiodo: Calperiodo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calperiodo = calperiodo;
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
