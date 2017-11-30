import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Calificacio } from './calificacio.model';
import { CalificacioService } from './calificacio.service';

@Injectable()
export class CalificacioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calificacioService: CalificacioService

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
                this.calificacioService.find(id).subscribe((calificacio) => {
                    calificacio.tFecreg = this.datePipe
                        .transform(calificacio.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    calificacio.tFecupd = this.datePipe
                        .transform(calificacio.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calificacioModalRef(component, calificacio);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calificacioModalRef(component, new Calificacio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calificacioModalRef(component: Component, calificacio: Calificacio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calificacio = calificacio;
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
