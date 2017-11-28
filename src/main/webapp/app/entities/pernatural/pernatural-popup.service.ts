import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pernatural } from './pernatural.model';
import { PernaturalService } from './pernatural.service';

@Injectable()
export class PernaturalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pernaturalService: PernaturalService

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
                this.pernaturalService.find(id).subscribe((pernatural) => {
                    if (pernatural.dFecnac) {
                        pernatural.dFecnac = {
                            year: pernatural.dFecnac.getFullYear(),
                            month: pernatural.dFecnac.getMonth() + 1,
                            day: pernatural.dFecnac.getDate()
                        };
                    }
                    pernatural.tFecreg = this.datePipe
                        .transform(pernatural.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    pernatural.tFecupd = this.datePipe
                        .transform(pernatural.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.pernaturalModalRef(component, pernatural);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pernaturalModalRef(component, new Pernatural());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pernaturalModalRef(component: Component, pernatural: Pernatural): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pernatural = pernatural;
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
