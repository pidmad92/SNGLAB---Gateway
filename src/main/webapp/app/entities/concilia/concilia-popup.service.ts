import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Concilia } from './concilia.model';
import { ConciliaService } from './concilia.service';

@Injectable()
export class ConciliaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private conciliaService: ConciliaService

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
                this.conciliaService.find(id).subscribe((concilia) => {
                    if (concilia.dFecConci) {
                        concilia.dFecConci = {
                            year: concilia.dFecConci.getFullYear(),
                            month: concilia.dFecConci.getMonth() + 1,
                            day: concilia.dFecConci.getDate()
                        };
                    }
                    concilia.tFecreg = this.datePipe
                        .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    concilia.tFecupd = this.datePipe
                        .transform(concilia.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.conciliaModalRef(component, concilia);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conciliaModalRef(component, new Concilia());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conciliaModalRef(component: Component, concilia: Concilia): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.concilia = concilia;
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