import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Legajoasig } from './legajoasig.model';
import { LegajoasigService } from './legajoasig.service';

@Injectable()
export class LegajoasigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private legajoasigService: LegajoasigService

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
                this.legajoasigService.find(id).subscribe((legajoasig) => {
                    if (legajoasig.dFecasig) {
                        legajoasig.dFecasig = {
                            year: legajoasig.dFecasig.getFullYear(),
                            month: legajoasig.dFecasig.getMonth() + 1,
                            day: legajoasig.dFecasig.getDate()
                        };
                    }
                    legajoasig.tFecreg = this.datePipe
                        .transform(legajoasig.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    legajoasig.tFecupd = this.datePipe
                        .transform(legajoasig.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.legajoasigModalRef(component, legajoasig);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.legajoasigModalRef(component, new Legajoasig());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    legajoasigModalRef(component: Component, legajoasig: Legajoasig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.legajoasig = legajoasig;
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
