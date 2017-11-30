import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pasepj } from './pasepj.model';
import { PasepjService } from './pasepj.service';

@Injectable()
export class PasepjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pasepjService: PasepjService

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
                this.pasepjService.find(id).subscribe((pasepj) => {
                    if (pasepj.dFecpas) {
                        pasepj.dFecpas = {
                            year: pasepj.dFecpas.getFullYear(),
                            month: pasepj.dFecpas.getMonth() + 1,
                            day: pasepj.dFecpas.getDate()
                        };
                    }
                    if (pasepj.dFecrecep) {
                        pasepj.dFecrecep = {
                            year: pasepj.dFecrecep.getFullYear(),
                            month: pasepj.dFecrecep.getMonth() + 1,
                            day: pasepj.dFecrecep.getDate()
                        };
                    }
                    if (pasepj.dFecmod) {
                        pasepj.dFecmod = {
                            year: pasepj.dFecmod.getFullYear(),
                            month: pasepj.dFecmod.getMonth() + 1,
                            day: pasepj.dFecmod.getDate()
                        };
                    }
                    if (pasepj.dFecdes) {
                        pasepj.dFecdes = {
                            year: pasepj.dFecdes.getFullYear(),
                            month: pasepj.dFecdes.getMonth() + 1,
                            day: pasepj.dFecdes.getDate()
                        };
                    }
                    if (pasepj.dFeccon) {
                        pasepj.dFeccon = {
                            year: pasepj.dFeccon.getFullYear(),
                            month: pasepj.dFeccon.getMonth() + 1,
                            day: pasepj.dFeccon.getDate()
                        };
                    }
                    pasepj.tFecreg = this.datePipe
                        .transform(pasepj.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    pasepj.tFecupd = this.datePipe
                        .transform(pasepj.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.pasepjModalRef(component, pasepj);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pasepjModalRef(component, new Pasepj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pasepjModalRef(component: Component, pasepj: Pasepj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pasepj = pasepj;
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
