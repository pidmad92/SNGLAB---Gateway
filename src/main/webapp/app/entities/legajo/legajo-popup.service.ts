import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Legajo } from './legajo.model';
import { LegajoService } from './legajo.service';

@Injectable()
export class LegajoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private legajoService: LegajoService

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
                this.legajoService.find(id).subscribe((legajo) => {
                    if (legajo.dFecconc) {
                        legajo.dFecconc = {
                            year: legajo.dFecconc.getFullYear(),
                            month: legajo.dFecconc.getMonth() + 1,
                            day: legajo.dFecconc.getDate()
                        };
                    }
                    if (legajo.dFecmod) {
                        legajo.dFecmod = {
                            year: legajo.dFecmod.getFullYear(),
                            month: legajo.dFecmod.getMonth() + 1,
                            day: legajo.dFecmod.getDate()
                        };
                    }
                    if (legajo.dFecexp) {
                        legajo.dFecexp = {
                            year: legajo.dFecexp.getFullYear(),
                            month: legajo.dFecexp.getMonth() + 1,
                            day: legajo.dFecexp.getDate()
                        };
                    }
                    if (legajo.dFecexpda) {
                        legajo.dFecexpda = {
                            year: legajo.dFecexpda.getFullYear(),
                            month: legajo.dFecexpda.getMonth() + 1,
                            day: legajo.dFecexpda.getDate()
                        };
                    }
                    legajo.tFecreg = this.datePipe
                        .transform(legajo.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    legajo.tFecupd = this.datePipe
                        .transform(legajo.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.legajoModalRef(component, legajo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.legajoModalRef(component, new Legajo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    legajoModalRef(component: Component, legajo: Legajo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.legajo = legajo;
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
