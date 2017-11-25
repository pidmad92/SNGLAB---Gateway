import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Resolucrd } from './resolucrd.model';
import { ResolucrdService } from './resolucrd.service';

@Injectable()
export class ResolucrdPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private resolucrdService: ResolucrdService

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
                this.resolucrdService.find(id).subscribe((resolucrd) => {
                    if (resolucrd.dFecresosd) {
                        resolucrd.dFecresosd = {
                            year: resolucrd.dFecresosd.getFullYear(),
                            month: resolucrd.dFecresosd.getMonth() + 1,
                            day: resolucrd.dFecresosd.getDate()
                        };
                    }
                    if (resolucrd.dFecconcil) {
                        resolucrd.dFecconcil = {
                            year: resolucrd.dFecconcil.getFullYear(),
                            month: resolucrd.dFecconcil.getMonth() + 1,
                            day: resolucrd.dFecconcil.getDate()
                        };
                    }
                    if (resolucrd.dFechanoti) {
                        resolucrd.dFechanoti = {
                            year: resolucrd.dFechanoti.getFullYear(),
                            month: resolucrd.dFechanoti.getMonth() + 1,
                            day: resolucrd.dFechanoti.getDate()
                        };
                    }
                    resolucrd.tFecreg = this.datePipe
                        .transform(resolucrd.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    resolucrd.tFecupd = this.datePipe
                        .transform(resolucrd.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.resolucrdModalRef(component, resolucrd);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resolucrdModalRef(component, new Resolucrd());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resolucrdModalRef(component: Component, resolucrd: Resolucrd): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resolucrd = resolucrd;
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
